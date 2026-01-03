/**
 * utils.js - Helper utilities
 */

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const on = (element, event, handler, options = { passive: true }) => {
  if (element) {
    element.addEventListener(event, handler, options);
  }
};

export const setAttr = (element, name, value) => {
  if (element) {
    element.setAttribute(name, value);
  }
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Checks if the device supports touch (for conditional interactions)
 */
export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};
