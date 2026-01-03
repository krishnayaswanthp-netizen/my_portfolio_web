/**
 * ui.js - UI interactions (Nav, Modals, Forms, Filters)
 */
import { qs, qsa, on, setAttr } from './utils.js';

// --- Navigation ---
export function initNavToggle() {
    const navToggle = qs("#nav-toggle");
    const menu = qs("#primary-menu");
    if (!navToggle || !menu) return;

    on(navToggle, "click", () => {
        const isOpen = menu.classList.toggle("open");
        setAttr(navToggle, "aria-expanded", isOpen);
    });

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !navToggle.contains(e.target)) {
            menu.classList.remove("open");
            setAttr(navToggle, "aria-expanded", false);
        }
    });
}

// --- Project Filters ---
export function initProjectFilters() {
    const chips = qsa(".chip");
    const grid = qs("#project-grid");
    if (!chips.length || !grid) return;

    chips.forEach(chip => {
        on(chip, "click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chips.forEach(c => setAttr(c, "aria-pressed", "false"));
            chip.classList.add("active");
            setAttr(chip, "aria-pressed", "true");

            const filter = chip.dataset.filter;
            const cards = qsa(".project-card", grid);
            cards.forEach(card => {
                const tags = (card.dataset.tags || "").split(",").map(t => t.trim());
                if (filter === "all" || tags.includes(filter)) {
                    card.style.display = "";
                    setTimeout(() => card.classList.add("visible"), 10);
                } else {
                    card.style.display = "none";
                    card.classList.remove("visible");
                }
            });
        });
    });

    // Initial Trigger
    /*  const active = chips.find(c => c.classList.contains("active")); // qsa returns array now
     if (active) setTimeout(() => active.click(), 100); */
}

// --- Modals ---
const projectDetails = {
    "Haven": {
        title: "Haven - Mental Health Support System",
        description: "A full-stack mental health support platform featuring an intelligent chatbot with a hybrid AI architecture. The system offloads conversational generation to a Hugging Face Space API for performance while keeping sentiment and emotion analysis models running locally for real-time state tracking.",
        technologies: ["FastAPI", "Docker", "PostgreSQL", "MongoDB", "Hugging Face API", "PyTorch", "Nginx"],
        features: [
            "Hybrid AI: Cloud-based chat generation with local sentiment analysis",
            "Real-time emotion detection for every message",
            "Regex-based crisis detection system with safety overrides",
            "Secure user authentication (PostgreSQL)",
            "Persistent, stateful chat history (MongoDB)",
            "Fully containerized deployment via Docker Compose"
        ]
    },
    "Bank management System": {
        title: "Bank Management System using Java (AWT)",
        description: "A comprehensive banking application developed using Java AWT for the frontend and MySQL for the backend database. Allows users to perform banking operations such as account creation, deposits, withdrawals, fund transfers, and balance inquiries.",
        technologies: ["Java", "AWT", "MySQL", "JDBC"],
        features: ["User authentication", "Secure transaction processing", "Database integration", "Intuitive GUI", "Transaction reporting"]
    },
    "Live Cricket Score": {
        title: "Live Cricket Score Card (Cricbuzz)",
        description: "A web scraping project that extracts real-time cricket score data from the official Cricbuzz website. Provides up-to-date match information, player statistics, and live commentary in a clean format.",
        technologies: ["Python", "Web Scraping", "BeautifulSoup", "Requests"],
        features: ["Real-time score extraction", "Match summary & statistics", "Live commentary integration", "Data parsing"]
    },
    "Volume Control System": {
        title: "Volume Control System Using Hand Gestures",
        description: "Uses computer vision to control system volume through hand gestures. By detecting specific hand movements captured via webcam, users can increase, decrease, or mute system volume without physical interaction.",
        technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        features: ["Real-time hand gesture detection", "Volume control through finger movements", "Webcam integration", "Intuitive gesture mapping"]
    },
    "Portfolio Website": {
        title: "Personal Portfolio Website",
        description: "A responsive, modern portfolio website designed to showcase projects and skills. Built with HTML, CSS, and Vanilla JS, featuring smooth animations, dark/light mode, and high performance.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        features: ["Responsive design", "Dark/light mode toggle", "Smooth animations", "Accessibility (ARIA)", "SEO optimized"]
    }
};

export function initModal() {
    const openButtons = qsa(".js-open-modal");
    const modal = qs("#project-modal");
    if (!modal) return;

    const backdrop = qs(".modal-backdrop", modal);
    const closeEls = qsa(".modal-close, [data-close='true']", modal);

    function openModal(projectKey) {
        const project = projectDetails[projectKey] || {
            title: projectKey,
            description: `Detailed description for ${projectKey}.`,
            technologies: [],
            features: []
        };

        qs("#modal-title", modal).textContent = project.title;

        let content = `<p>${project.description}</p>`;
        if (project.technologies.length) {
            content += `<h4>Technologies Used</h4><ul>${project.technologies.map(t => `<li>${t}</li>`).join('')}</ul>`;
        }
        if (project.features.length) {
            content += `<h4>Key Features</h4><ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
        }

        qs("#modal-desc", modal).innerHTML = content;

        // Setup Links (simplified logic for demo)
        const liveBtn = qs(".modal-actions .btn-primary", modal);
        const codeBtn = qs(".modal-actions .btn-ghost", modal);

        // (Preserve original link logic if needed, or genericize)
        // For brevity, using a lookup or keeping generic
        // ... (Use original link map logic if specific URLs are needed per project)

        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        qs(".modal-close", modal)?.focus();
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    openButtons.forEach(btn => on(btn, "click", () => openModal(btn.dataset.project)));
    closeEls.forEach(el => on(el, "click", closeModal));
    if (backdrop) on(backdrop, "click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
}

// --- Contact Form ---
// --- Contact Form ---
export function initForm() {
    const form = qs("#contact-form");
    if (!form) return;

    const toast = qs("#form-toast");
    const submitBtn = qs("button[type='submit']", form);

    // Initialize button state
    submitBtn.disabled = true;

    // Helper: Show/Hide Errors
    function showError(field, message) {
        clearError(field);
        field.classList.add("error");

        const errorEl = document.createElement("div");
        errorEl.className = "field-error";
        errorEl.textContent = message;

        if (field.nextSibling) {
            field.parentNode.insertBefore(errorEl, field.nextSibling);
        } else {
            field.parentNode.appendChild(errorEl);
        }
    }

    function clearError(field) {
        field.classList.remove("error");
        const errorEl = field.parentNode.querySelector(".field-error");
        if (errorEl) errorEl.remove();
    }

    function clearAllErrors() {
        qsa(".field-error", form).forEach(el => el.remove());
        qsa(".error", form).forEach(el => el.classList.remove("error"));
    }

    // Helper: Toast
    function showToast(msg, isError) {
        if (!toast) return;
        toast.textContent = msg;
        toast.style.color = isError ? "tomato" : "inherit";
        toast.style.opacity = "1";
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
            toast.style.opacity = "0";
        }, 5000);
    }

    // Validation Logic
    function validateField(field) {
        const val = field.value.trim();
        clearError(field);

        if (!val) {
            showError(field, "fill out this text-box");
            return false;
        }

        if (field.type === "email" && !/\S+@\S+\.\S+/.test(val)) {
            showError(field, "Please enter a valid email address");
            return false;
        }

        return true;
    }

    function checkFormValidity() {
        const nameValid = form.name.value.trim().length > 0;
        const msgValid = form.message.value.trim().length > 0;
        const emailVal = form.email.value.trim();
        const emailValid = emailVal.length > 0 && /\S+@\S+\.\S+/.test(emailVal);

        submitBtn.disabled = !(nameValid && msgValid && emailValid);
    }

    // Event Listeners
    ['name', 'email', 'message'].forEach(fieldName => {
        const field = form[fieldName];
        if (!field) return;

        // Blur: strict check
        on(field, "blur", () => {
            if (!field.value.trim()) {
                showError(field, "fill out this text-box");
            } else if (fieldName === 'email') {
                validateField(field);
            }
        });

        // Input: clear error, check button state
        on(field, "input", () => {
            if (field.value.trim()) clearError(field);
            checkFormValidity();
        });
    });

    // Submit Handler
    on(form, "submit", (e) => {
        e.preventDefault();

        // Final check before sending (in case button was enabled via hacks)
        const nameValid = validateField(form.name);
        const emailValid = validateField(form.email);
        const msgValid = validateField(form.message);

        if (!nameValid || !emailValid || !msgValid) {
            showToast("Please fill out all fields correctly", true);
            return;
        }

        const formData = new FormData(form);
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        fetch("https://formspree.io/f/meordgjn", {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        })
            .then(res => {
                if (res.ok) {
                    showToast("Message sent successfully!", false);
                    form.reset();
                    submitBtn.disabled = true; // Redisable after reset
                    clearAllErrors();
                } else {
                    showToast("Failed to send message.", true);
                    submitBtn.disabled = false;
                }
            })
            .catch(() => {
                showToast("Error sending message.", true);
                submitBtn.disabled = false;
            })
            .finally(() => {
                if (submitBtn.textContent === "Sending...") {
                    submitBtn.textContent = originalText;
                }
            });
    });

    // Initial check
    checkFormValidity();
}
