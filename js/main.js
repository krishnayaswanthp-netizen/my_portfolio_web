/**
 * main.js - Application Entry Point
 */
import { initThemeToggle } from './modules/theme.js';
import { initNavToggle, initProjectFilters, initModal, initForm } from './modules/ui.js';
import { initPreloader, initTyping, initScrollReveal, initSmoothScroll, initLazyLoading } from './modules/animations.js';
import { initCursor } from './modules/cursor.js';
import { initHeroCanvas } from './modules/hero-canvas.js';
import { initTilt } from './modules/tilt.js';

document.addEventListener("DOMContentLoaded", () => {
    // Core UI
    initPreloader();
    initThemeToggle();
    initNavToggle();
    initSmoothScroll();

    // Interactive / Logic
    initProjectFilters();
    initModal();
    initForm();

    // Visual Effects
    initScrollReveal();
    initTyping();

    // New "Cool" Features
    initCursor();
    initHeroCanvas();
    initTilt();
    initLazyLoading();

    // Set year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
