/** SignalField — the hero's living system.
 *  A 2D flow field of quiet ink lines. Cursor movement injects turbulence:
 *  nearby lines bend away and rust-colored signal particles ride the field.
 *  Strictly performance-conscious: rAF-gated, pauses off-screen, DPR-capped,
 *  disabled for reduced motion and coarse pointers.
 */

import { useEffect, useRef } from "react";
import { isFinePointer, prefersReducedMotion } from "../../lib/motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  rust: boolean;
}

const LINE_GAP = 26;
const MAX_DPR = 1.75;

export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (prefersReducedMotion()) return; // static gradient shows instead
    if (!isFinePointer()) return; // touch devices keep a clean hero

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let time = 0;

    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, speed: 0 };
    const particles: Particle[] = [];
    const MAX_PARTICLES = 70;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const fieldAngle = (x: number, y: number, t: number): number => {
      // Slow-breathing flow field: layered sine noise, no libraries.
      const s = 0.0016;
      return (
        Math.sin(x * s + t * 0.4) * 1.2 +
        Math.cos(y * s * 1.3 - t * 0.3) * 1.2 +
        Math.sin((x + y) * s * 0.7 + t * 0.2) * 0.8
      );
    };

    const spawn = (x: number, y: number, angle: number) => {
      if (particles.length >= MAX_PARTICLES) return;
      const rust = Math.random() < 0.3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * 1.6,
        vy: Math.sin(angle) * 1.6,
        life: 0,
        maxLife: 60 + Math.random() * 50,
        rust,
      });
    };

    const step = () => {
      if (!running) return;
      time += 0.016;

      // Pointer velocity (decays)
      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      pointer.speed = Math.min(1, Math.hypot(dx, dy) / 40) * 0.9 + pointer.speed * 0.1;
      pointer.px = pointer.x;
      pointer.py = pointer.y;

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      // Flow lines — sampled on a sparse grid, drawn as short segments
      const GAP = LINE_GAP;
      for (let gx = GAP / 2; gx < w; gx += GAP) {
        for (let gy = GAP / 2; gy < h; gy += GAP) {
          const base = fieldAngle(gx, gy, time);
          const pdx = gx - pointer.x;
          const pdy = gy - pointer.y;
          const dist = Math.hypot(pdx, pdy);
          const influence = Math.max(0, 1 - dist / 220) * (0.25 + pointer.speed * 1.4);
          const angle = base + influence * 1.5;

          const len = 9 + influence * 14;
          const x2 = gx + Math.cos(angle) * len;
          const y2 = gy + Math.sin(angle) * len;

          const alpha = 0.1 + influence * 0.5;
          ctx.strokeStyle =
            influence > 0.05
              ? `rgba(166, 84, 54, ${Math.min(0.75, alpha)})`
              : `rgba(42, 39, 36, ${alpha})`;

          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Sparks ride the disturbance
          if (influence > 0.4 && Math.random() < 0.06) spawn(gx, gy, angle);
        }
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const angle = fieldAngle(p.x, p.y, time);
        p.vx = p.vx * 0.96 + Math.cos(angle) * 0.35;
        p.vy = p.vy * 0.96 + Math.sin(angle) * 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const fade = 1 - p.life / p.maxLife;
        if (fade <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.rust
          ? `rgba(198, 107, 76, ${0.7 * fade})`
          : `rgba(42, 39, 36, ${0.45 * fade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.rust ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (pointer.px < -999) {
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Pause the loop when the hero is off-screen
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    raf = requestAnimationFrame(step);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Static fallback gradient — always painted underneath */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_30%,rgba(198,107,76,0.10),transparent_65%),radial-gradient(ellipse_50%_60%_at_20%_80%,rgba(125,140,109,0.10),transparent_60%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
