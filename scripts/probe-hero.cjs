/* Hero visibility diagnostic — reports computed styles of hero content. */
const { spawn } = require("child_process");
const http = require("http");

const CHROME = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const PORT = process.argv[3] || 9777;
const WIDTH = parseInt(process.argv[2] || "1440", 10);
const REDUCED = process.argv[4] === "reduced";

const chrome = spawn(CHROME, [
  "--headless=new",
  "--remote-debugging-port=" + PORT,
  "--user-data-dir=" + process.cwd() + "/.chrome-hero-profile",
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
  await waitPort(PORT);
  const list = JSON.parse(await new Promise((res, rej) => {
    http.get(`http://127.0.0.1:${PORT}/json/list`, (r) => {
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

  await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: WIDTH < 700 });
  if (REDUCED) {
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  }
  await send("Page.navigate", { url: "http://localhost:4173" });
  await sleep(3200); // entrance + fonts

  const report = await evalJS(`(() => {
    const pick = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        display: cs.display, visibility: cs.visibility, opacity: cs.opacity,
        transform: cs.transform, zIndex: cs.zIndex, position: cs.position,
        clipPath: cs.clipPath === "none" ? "none" : cs.clipPath.slice(0, 40),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      };
    };
    const h1 = document.querySelector("#top h1");
    const spans = [...document.querySelectorAll("#top .hero-line > span")];
    const fades = [...document.querySelectorAll("#top .hero-fade")].slice(0, 3);
    const out = { h1: h1 ? pick(h1) : null, lineSpans: spans.map(pick), fades: fades.map((f) => ({ opacity: getComputedStyle(f).opacity, transform: getComputedStyle(f).transform })) };
    if (h1) {
      const r = h1.getBoundingClientRect();
      const hit = document.elementFromPoint(r.x + r.width * 0.3, r.y + r.height * 0.5);
      out.topmostAtH1 = hit ? hit.tagName + "." + String(hit.className).slice(0, 40) : "null";
      out.h1IsTopmost = hit ? !!h1.contains(hit) : false;
    }
    // html classes for context
    out.htmlClass = document.documentElement.className;
    return out;
  })()`);

  console.log(JSON.stringify({ width: WIDTH, reduced: REDUCED, ...report }, null, 1));
  ws.close();
  chrome.kill();
  process.exit(0);
})().catch((e) => { console.error("PROBE FAILED:", e.message); chrome.kill(); process.exit(1); });
