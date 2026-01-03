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

                // Trigger skill bars if visible
                if (entry.target.id === "skills" || entry.target.querySelector(".progress-bar")) {
                    animateSkillBars();
                }
                obs.unobserve(entry.target);
            }
        });
    }, 100), { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => obs.observe(el));
}

// --- Skill Bars ---
function animateSkillBars() {
    const bars = qsa(".progress-bar");
    bars.forEach(bar => {
        if (bar.dataset.animated) return;
        const target = Number(bar.getAttribute("data-target") || 0);

        bar.style.width = target + "%";
        bar.dataset.animated = "true";

        const parent = bar.closest(".skill");
        if (parent) {
            const valEl = parent.querySelector(".skill-value");
            if (valEl) countUp(valEl, 0, target, 1000);
        }
    });
}

function countUp(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
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
