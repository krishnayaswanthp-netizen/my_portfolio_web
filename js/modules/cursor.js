/**
 * cursor.js - Custom interactive cursor
 */
import { qs, qsa, isTouchDevice } from './utils.js';

export function initCursor() {
    if (isTouchDevice()) return; // Disable on touch devices

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Core cursor moves instantly
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Follower Loop (Smooth trail)
    function loop() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        follower.style.transform = `translate3d(${posX - 12}px, ${posY - 12}px, 0)`;
        requestAnimationFrame(loop);
    }
    loop();

    // Hover States
    const interactives = qsa("a, button, .project-card, input, textarea, .chip");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
            follower.classList.add("active");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
            follower.classList.remove("active");
        });
    });
}
