# 📘 Portfolio Project Documentation

This document serves as the comprehensive manual for your modern, refactored portfolio. It explains the new architecture, the visual effects, and the latest enhancements.

## 🏗️ Project Architecture

The project now uses a modern **ES Module** architecture. This makes the code easier to read, debug, and expand.

### File Structure
```
my_portfolio_web/
├── index.html          # Main Entry Point (uses type="module")
├── css/
│   └── styles.css      # Styling (Variables, Glassmorphism, Premium Gradients)
├── js/
│   ├── main.js         # 🟢 JavaScript Entry Point
│   └── modules/        # 📦 Logic split into focused files
│       ├── animations.js   # Scroll Reveal, Typing, Lazy Loading
│       ├── cursor.js       # Custom "Follower" Cursor
│       ├── hero-canvas.js  # Particle Network Background
│       ├── theme.js        # Dark/Light mode logic
│       ├── tilt.js         # 3D Card Hover effects
│       ├── ui.js           # Navigation, Modals, Forms
│       └── utils.js        # Helpers
└── assets/             # Images
```

---

## 🌟 Visual Enhancements

### 1. "Simple yet Beautiful" Design
- **Premium Gradients**: We replaced generic colors with a cohesive **Indigo-to-Purple** theme (`#6366f1` → `#a855f7`).
- **Where it's used**:
    - **Logo**: The "KY" box in the navbar.
    - **Buttons**: Primary buttons and hover states.
    - **Loader**: The preloader spinner ring.
- **Glassmorphism**: Enhanced frosted glass effects on the navbar and cards.

### 2. Interactive Effects
- **Hero Particles**: A generic "constellation" network that reacts to your mouse.
- **Custom Cursor**: A trailing circle that expands when hovering over interactive elements.
- **3D Tilt**: Project cards pivot realistically in 3D space when hovered.

---

## 🛠️ Functional Fixes & Features

### 1. Contact Form Validation (`ui.js`)
- **Real-time Checks**: Validates text boxes as you type or click away (blur).
- **Security**: Prevents submission if fields are empty or email is invalid.
- **Feedback**: Shows clear error messages ("fill out this text-box") directly below the problem field.

### 2. Image Optimization (`animations.js`)
- **Lazy Loading**: Images only load when they scroll into view to save bandwidth.
- **Fade In**: Images smoothly fade from 0 to 100% opacity once loaded.

---

## 🚀 How to Run (Local Server Required)

Since this project uses ES Modules (`<script type="module">`), you **must** use a local server. Double-clicking `index.html` will not work.

**Option 1: VS Code (Recommended)**
1.  Install the **Live Server** extension.
2.  Right-click `index.html` > **Open with Live Server**.

**Option 2: Python**
1.  Open terminal in the project folder.
2.  Run: `python -m http.server`
3.  Go to: `http://localhost:8000`

---

## 📝 Configuration

| To Change... | Edit File... | Search For... |
| :--- | :--- | :--- |
| **Project Text/Data** | `js/modules/ui.js` | `const projectDetails` |
| **Gradient Colors** | `css/styles.css` | `:root { --gradient-premium... }` |
| **Particle Density** | `js/modules/hero-canvas.js` | `particleCount` |
| **Typing Text** | `js/modules/animations.js` | `const phrases` |
