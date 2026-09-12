/* Targeted probes for specific collision suspects. */
const { spawn } = require("child_process");
const http = require("http");

const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const BASE = "http://localhost:4173";
const WIDTHS = [1440, 1024, 768, 390, 360];

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9778",
  "--user-data-dir=" + process.cwd() + "/.chrome-audit-profile2",
  "--no-first-run",
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
      req.on("error", () => (n <= 0 ? reject(new Error("no cdp")) : setTimeout(() => tryOnce(n - 1), 300)));
    };
    tryOnce(tries);
  });
}

(async () => {
  await waitPort(9778);
  const list = JSON.parse(await new Promise((res, rej) => {
    http.get("http://127.0.0.1:9778/json/list", (r) => {
      let d = "";
      r.on("data", (c) => (d += c));
      r.on("end", () => res(d));
    }).on("error", rej);
  }));
  const WebSocket = require("ws");
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.on("open", r));

  let id = 0;
  const pending = new Map();
  ws.on("message", (data) => {
    const m = JSON.parse(data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  const evalJS = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
    return r.result?.result?.value;
  };

  const out = [];
  for (const width of WIDTHS) {
    await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
    await send("Page.navigate", { url: BASE });
    await sleep(2200);
    await evalJS(`(async () => {
      // let hero entrance finish
      await new Promise(r=>setTimeout(r,1800));
    })()`);

    const r1 = await evalJS(`(() => {
      // A) canvas interception across a 5-point grid of the hero (avoid text nodes by checking topmost)
      const c = document.querySelector("canvas");
      const res = { width: ${width}, canvasHits: 0, points: [] };
      if (c) {
        const cr = c.getBoundingClientRect();
        for (const fx of [0.08, 0.35, 0.62, 0.85, 0.97]) {
          for (const fy of [0.08, 0.3, 0.55, 0.8, 0.95]) {
            const x = Math.min(cr.x + cr.width * fx, window.innerWidth - 2);
            const y = Math.min(cr.y + cr.height * fy, window.innerHeight - 2);
            const hit = document.elementFromPoint(x, y);
            const isCanvas = hit === c;
            if (isCanvas) res.canvasHits++;
            if (isCanvas || fx === 0.85 && fy === 0.08) res.points.push({ fx, fy, hit: hit ? hit.tagName + "." + String(hit.className).slice(0, 30) : "null" });
          }
        }
      }
      // B) hero bottom index row: buttons wrapping?
      const row = [...document.querySelectorAll("section#top .border-t button")];
      res.heroRow = row.map((b) => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        return { t: b.textContent.trim().slice(0, 12), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right) };
      });
      res.heroRowRight = row.length ? Math.round(Math.max(...row.map((b) => b.getBoundingClientRect().right))) : 0;
      // C) ghost numbers: bounding boxes vs article + viewport
      res.ghosts = [...document.querySelectorAll("article span.display[aria-hidden='true']")].map((n) => {
        const g = n.getBoundingClientRect();
        const a = n.closest("article").getBoundingClientRect();
        return { txt: n.textContent.trim(), l: Math.round(g.left), r: Math.round(g.right), artL: Math.round(a.left), artR: Math.round(a.right), overVp: g.right > window.innerWidth };
      });
      // D) does body have horizontal scroll potential?
      res.scrollW = document.documentElement.scrollWidth;
      res.vw = window.innerWidth;
      return res;
    })()`);

    // E) floating preview overflow: simulate hover on last secondary row at right edge
    const r2 = await evalJS(`(async () => {
      const rows = [...document.querySelectorAll("li a.group")];
      const last = rows[rows.length - 1];
      if (!last) return { skipped: true };
      last.scrollIntoView({ block: "center" });
      await new Promise((r) => setTimeout(r, 400));
      const rect = last.getBoundingClientRect();
      const section = last.closest("div.relative") || last.closest("section");
      const sr = section.getBoundingClientRect();
      // simulate the preview box: cursor near right edge, then apply the clamp formula
      const clientW = section.clientWidth;
      const rawX = clientW - 40;
      const clampedLeft = Math.max(8, Math.min(rawX + 24, clientW - 288 - 8));
      const boxRight = clampedLeft + 288;
      return { sectionW: Math.round(sr.width), clientW, clampedLeft: Math.round(clampedLeft), boxRight: Math.round(boxRight), escapes: boxRight > clientW + 1 };
    })()`);
    out.push({ ...r1, preview: r2 });
  }
  console.log(JSON.stringify(out, null, 1));
  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => { console.error("PROBE FAILED:", e.message); chrome.kill(); process.exit(1); });
