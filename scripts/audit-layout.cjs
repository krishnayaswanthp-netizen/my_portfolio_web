/* Layout / stacking audit — drives headless Chrome over CDP, no extra deps.
 * Loads the built site at several widths, scrolls the full page, and reports:
 *  - horizontal overflow (document level)
 *  - decorative layers escaping their section
 *  - giant ghost numbers escaping / overflowing the article or viewport
 *  - sticky panel misbehavior
 *  - pointer interception of nav links, video toggles, tech buttons
 *  - canvas interception
 *  - mobile menu closed-state interception
 *  - broken images
 */
const { spawn } = require("child_process");
const http = require("http");

const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://localhost:4173";
const WIDTHS = process.argv[2] ? [parseInt(process.argv[2], 10)] : [1440, 1024, 768, 390, 360];

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9777",
  "--user-data-dir=" + process.cwd() + "/.chrome-audit-profile",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function waitPort(port, tries = 60) {
  return new Promise((resolve, reject) => {
    const tryOnce = (n) => {
      const req = http.get({ host: "127.0.0.1", port, path: "/json/version" }, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (n <= 0) reject(new Error("chrome CDP never came up"));
        else setTimeout(() => tryOnce(n - 1), 300);
      });
    };
    tryOnce(tries);
  });
}

(async () => {
  await waitPort(9777);
  const list = JSON.parse(await new Promise((res, rej) => {
    http.get("http://127.0.0.1:9777/json/list", (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => res(d));
    }).on("error", rej);
  }));
  const page = list.find((t) => t.type === "page");
  const WebSocket = require("ws");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.on("open", r));

  let id = 0;
  const pending = new Map();
  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending.set(mid, resolve);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  const evalJS = async (expr) => {
    const r = await send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.result?.exceptionDetails) {
      return { __error: (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text || "").slice(0, 400) };
    }
    return r.result?.result?.value;
  };

  const report = [];
  for (const width of WIDTHS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 700,
    });
    await send("Page.navigate", { url: BASE });
    await sleep(2500);

    // Scroll through the entire page so lazy states stabilize
    await evalJS(`(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y <= h; y += 400) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,12)); }
      window.scrollTo(0, 0);
      await new Promise(r=>setTimeout(r,700));
    })()`);

    // Probe video toggles in-view: scroll each into view first, then hit-test
    await evalJS(`(async () => {
      const toggles = [...document.querySelectorAll('[data-video-toggle]')];
      window.__toggleHits = [];
      for (let i = 0; i < toggles.length; i++) {
        const b = toggles[i];
        b.scrollIntoView({ block: 'center' });
        await new Promise(r=>setTimeout(r, 350));
        const r = b.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        window.__toggleHits.push({ i, ok: !!(hit && (b === hit || b.contains(hit))), hit: hit ? hit.tagName + '.' + String(hit.className).slice(0,40) : 'null' });
        // containment in plate
        const plate = b.closest('figure > div') || b.parentElement;
        const pr = plate ? plate.getBoundingClientRect() : null;
        window.__toggleHits[i].inPlate = pr ? (r.right <= pr.right + 2 && r.bottom <= pr.bottom + 2) : null;
      }
      window.scrollTo(0, 0);
      await new Promise(r=>setTimeout(r,400));
    })()`);
    const toggleHits = await evalJS(`window.__toggleHits || []`);
    if (Array.isArray(toggleHits)) {
      toggleHits.forEach((h) => {
        if (!h.ok) report.push({ width, issue: "intercept-toggle", ...h });
        else if (h.inPlate === false) report.push({ width, issue: "toggle-outside-plate", ...h });
      });
    }

    // Probe tech buttons in-view (sample first 8)
    await evalJS(`(async () => {
      const btns = [...document.querySelectorAll('#system button')].slice(0, 8);
      window.__techHits = [];
      for (let i = 0; i < btns.length; i++) {
        const b = btns[i];
        b.scrollIntoView({ block: 'center' });
        await new Promise(r=>setTimeout(r, 250));
        const r = b.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        window.__techHits.push({ i, ok: !!(hit && (b === hit || b.contains(hit))), label: b.textContent.trim().slice(0,20), hit: hit ? hit.tagName + '.' + String(hit.className).slice(0,40) : 'null' });
      }
      window.scrollTo(0, 0);
      await new Promise(r=>setTimeout(r,400));
    })()`);
    const techHits = await evalJS(`window.__techHits || []`);
    if (Array.isArray(techHits)) {
      techHits.forEach((h) => {
        if (!h.ok) report.push({ width, issue: "intercept-tech", ...h });
      });
    }

    const result = await evalJS(`(() => {
      const out = { width: ${width}, issues: [] };
      const add = (kind, detail) => out.issues.push({ kind, ...detail });
      const vw = document.documentElement.clientWidth;
      const rect = (el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
      };

      // 1. Document-level horizontal overflow
      const scrollW = document.documentElement.scrollWidth;
      if (scrollW > vw + 1) add("doc-overflow", { detail: "scrollWidth=" + scrollW + " vw=" + vw });

      // 2. Decorative layers escaping their section (marked with data-deco)
      document.querySelectorAll("main [data-deco], footer [data-deco]").forEach((d) => {
        const sec = d.closest("section, footer");
        if (!sec) return;
        const sr = sec.getBoundingClientRect();
        const dr = d.getBoundingClientRect();
        if (dr.width === 0 && dr.height === 0) return;
        if (dr.right > sr.right + 2 || dr.left < sr.left - 2) {
          add("deco-escape-x", { detail: (d.className||"").toString().slice(0,70), section: sec.id || "footer" });
        }
        const cs = getComputedStyle(d);
        if (cs.pointerEvents !== "none") {
          add("deco-pointer", { detail: (d.className||"").toString().slice(0,70) });
        }
      });

      // 3. Ghost numbers: stay inside article, inside viewport, non-interactive
      document.querySelectorAll("article span.display[aria-hidden='true']").forEach((n) => {
        const art = n.closest("article");
        const ar = n.getBoundingClientRect();
        if (ar.right > vw + 1) add("number-overflow", { detail: n.textContent.trim() + " right=" + Math.round(ar.right) });
        if (art) {
          const arr = art.getBoundingClientRect();
          if (ar.right > arr.right + 2) add("number-escape", { detail: n.textContent.trim() });
        }
      });

      // 4. Sticky aside behavior
      const sticky = document.querySelector("#system aside");
      if (sticky) {
        const cs = getComputedStyle(sticky);
        if (vw < 1024 && cs.position === "sticky") {
          add("sticky-on-mobile", { detail: "position sticky at vw=" + vw });
        }
        const sr = sticky.getBoundingClientRect();
        if (sr.width > vw + 1) add("sticky-too-wide", rect(sticky));
      }

      // 5. Nav link interception
      document.querySelectorAll("header nav button, header nav a").forEach((a) => {
        const r = a.getBoundingClientRect();
        if (r.width === 0) return;
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        if (!hit || !(a === hit || a.contains(hit) || hit.contains(a))) {
          add("intercept-nav", { detail: a.textContent.trim().slice(0, 24), hit: hit ? hit.tagName + "." + String(hit.className).slice(0, 40) : "null" });
        }
      });

      // 6. Video toggles are probed in-view above (results pushed between widths)

      // 7. Canvas must not intercept
      const canvas = document.querySelector("canvas");
      if (canvas) {
        const cr = canvas.getBoundingClientRect();
        if (cr.width > 0) {
          const hit = document.elementFromPoint(Math.min(cr.x + cr.width * 0.3, vw - 2), cr.y + cr.height * 0.3);
          if (hit === canvas) add("canvas-intercept", { detail: "canvas receives pointer" });
        }
      }

      // 8. Mobile menu closed state
      const menu = document.getElementById("mobile-menu");
      if (menu) {
        const cs = getComputedStyle(menu);
        const mr = menu.getBoundingClientRect();
        if (cs.opacity !== "1" && cs.pointerEvents !== "none") {
          add("menu-closed-intercept", { detail: "opacity=" + cs.opacity + " pointerEvents=" + cs.pointerEvents });
        }
        if (mr.width > vw + 1) add("menu-too-wide", rect(menu));
      }

      // 9. Email overflow
      const email = document.querySelector('a[href^="mailto:"]');
      if (email) {
        const er = email.getBoundingClientRect();
        if (er.right > vw + 1) add("email-overflow", rect(email));
      }

      // 10. Broken images
      document.querySelectorAll("img").forEach((img) => {
        if (img.complete && img.naturalWidth === 0) add("img-broken", { detail: img.src.split("/").pop() });
      });

      // 11. Long word overflow candidates: any element wider than viewport
      document.querySelectorAll("section *").forEach((el) => {
        if (el instanceof HTMLElement && el.dataset.deco !== undefined) return;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > vw + 6 && r.left >= 0 && r.width < vw * 1.6) {
          const cs = getComputedStyle(el);
          if (cs.position === "absolute" || cs.position === "fixed") return; // deco handled above
          add("element-overflow", { detail: el.tagName + "." + String(el.className).slice(0, 50), right: Math.round(r.right), vw });
        }
      });

      return out;
    })()`);

    report.push(result && !result.__error ? result : { width, error: result });
  }

  console.log(JSON.stringify(report, null, 1));
  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => {
  console.error("AUDIT FAILED:", e.message);
  chrome.kill();
  process.exit(1);
});
