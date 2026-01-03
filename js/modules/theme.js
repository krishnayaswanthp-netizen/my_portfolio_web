/**
 * theme.js - Dark/Light mode toggle
 */
import { qs, setAttr, on } from './utils.js';

export function initThemeToggle() {
    const button = qs("#theme-toggle");
    if (!button) return;

    const stored = localStorage.getItem("theme");
    let theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");

    // Apply initial theme
    document.documentElement.setAttribute("data-theme", theme);
    setAttr(button, "aria-pressed", theme === "dark");

    const toggleTheme = () => {
        theme = (document.documentElement.getAttribute("data-theme") === "dark") ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        setAttr(button, "aria-pressed", theme === "dark");

        // Animation class
        button.classList.add("toggled");
        setTimeout(() => {
            button.classList.remove("toggled");
        }, 300);
    };

    on(button, "click", toggleTheme);

    // Keyboard accessibility
    button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            button.click();
        }
    });
}
