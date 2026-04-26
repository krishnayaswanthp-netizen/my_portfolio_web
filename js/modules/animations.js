/**
 * animations.js - Scroll, Typing, and Loader animations
 */
import { qs, qsa, throttle, on, setAttr } from './utils.js';

// --- Preloader ---
export function initPreloader() {
    const preloader = qs("#preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("hidden");
            setTimeout(() => {
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 500);
        }, 500);
    });
}

// --- Typing Effect ---
export function initTyping() {
    const el = qs("#typing-text");
    if (!el) return;

    const phrases = ["Full Stack Developer", "Java Expert", "Python Developer", "UI/UX Designer", "AI/ML Explorer"];
    let idx = 0;
    let charIndex = 0;
    let deleting = false;
    const speed = 50;
    const delay = 1500;

    function tick() {
        const current = phrases[idx % phrases.length];

        if (!deleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex >= current.length) {
                deleting = true;
                setTimeout(tick, delay);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex <= 0) {
                deleting = false;
                idx++;
            }
        }
        setTimeout(() => requestAnimationFrame(tick), deleting ? speed / 2 : speed);
    }
    tick();
}

// --- Scroll & Reveal ---
export function initScrollReveal() {
    const reveals = qsa(".--reveal");
    if (!("IntersectionObserver" in window)) {
        reveals.forEach(r => r.classList.add("visible"));
        return;
    }

    const obs = new IntersectionObserver(throttle((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, 100), { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => obs.observe(el));
}

// --- Smooth Scroll (Internal Links) ---
export function initSmoothScroll() {
    const links = qsa('a[href^="#"]');
    links.forEach(link => {
        if (link.getAttribute("href") === "#") return;
        on(link, "click", (e) => {
            e.preventDefault();
            const target = qs(link.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // Close mobile menu if open
                const menu = qs("#primary-menu");
                const toggle = qs("#nav-toggle");
                if (menu && menu.classList.contains("open")) {
                    menu.classList.remove("open");
                    setAttr(toggle, "aria-expanded", false);
                }
            }
        });
    });
}

// --- Lazy Loading for Images ---
export function initLazyLoading() {
    const images = qsa("img.lazy");
    if (!images.length) return;

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(throttle((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add("loaded");
                    imageObserver.unobserve(image);
                }
            });
        }, 100), {
            rootMargin: "50px 0px"
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add("loaded");
        });
    }
}
