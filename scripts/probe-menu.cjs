/* Mobile menu interaction probe at 390px. */
const { spawn } = require("child_process");
const http = require("http");

const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=9779",
  "--user-data-dir=" + process.cwd() + "/.chrome-audit-profile3",
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
  await waitPort(9779);
  const list = JSON.parse(await new Promise((res, rej) => {
    http.get("http://127.0.0.1:9779/json/list", (r) => {
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

  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: "http://localhost:4173" });
  await sleep(2500);

  // 1. Closed-state baseline
  const closed = await evalJS(`(() => {
    const menu = document.getElementById("mobile-menu");
    const cs = getComputedStyle(menu);
    return { opacity: cs.opacity, pointerEvents: cs.pointerEvents, inert: menu.inert, width: Math.round(menu.getBoundingClientRect().width) };
  })()`);

  // 2. Open the menu
  await evalJS(`(async () => {
    const btn = document.querySelector('header button[aria-controls="mobile-menu"]');
    btn.click();
    await new Promise(r => setTimeout(r, 700));
  })()`);
  const open = await evalJS(`(() => {
    const menu = document.getElementById("mobile-menu");
    const cs = getComputedStyle(menu);
    const links = [...menu.querySelectorAll("nav button")];
    const linkHits = links.map((b) => {
      const r = b.getBoundingClientRect();
      const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
      return b.contains(hit);
    });
    return {
      opacity: cs.opacity,
      pointerEvents: cs.pointerEvents,
      inert: menu.inert,
      scrollLocked: document.documentElement.style.overflow === "hidden",
      linkCount: links.length,
      allLinksClickable: linkHits.every(Boolean),
      bodyScrollY: window.scrollY,
    };
  })()`);

  // 3. Click a menu link → should close and scroll to section
  await evalJS(`(async () => {
    const links = [...document.querySelectorAll('#mobile-menu nav button')];
    links[1].click(); // "System"
    await new Promise(r => setTimeout(r, 900));
  })()`);
  const afterNav = await evalJS(`(() => {
    const menu = document.getElementById("mobile-menu");
    const cs = getComputedStyle(menu);
    return {
      opacity: cs.opacity,
      scrollRestored: document.documentElement.style.overflow === "",
      scrollY: Math.round(window.scrollY),
      systemSectionTop: Math.round(document.getElementById("system").getBoundingClientRect().top),
      inert: menu.inert,
    };
  })()`);

  // 4. Open again, close with Escape
  await evalJS(`(async () => {
    document.querySelector('header button[aria-controls="mobile-menu"]').click();
    await new Promise(r => setTimeout(r, 600));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    await new Promise(r => setTimeout(r, 600));
  })()`);
  const afterEsc = await evalJS(`(() => {
    const menu = document.getElementById("mobile-menu");
    return {
      opacity: getComputedStyle(menu).opacity,
      scrollRestored: document.documentElement.style.overflow === "",
    };
  })()`);

  console.log(JSON.stringify({ closed, open, afterNav, afterEsc }, null, 1));
  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => { console.error("PROBE FAILED:", e.message); chrome.kill(); process.exit(1); });
