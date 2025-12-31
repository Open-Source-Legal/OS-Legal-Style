/**
 * Shared CSS Utilities
 *
 * Centralized styles for common patterns used across components.
 * These reduce duplication and ensure consistency.
 */

export const utilitiesStyles = `
/* ============================================
   CSS Custom Properties - Design Tokens
   ============================================ */
:root {
  /* ===========================================
     COLOR SYSTEM - Professional Legal Theme
     =========================================== */

  /* Accent: Deep Teal - professional, authoritative */
  --oc-accent: #0F766E;
  --oc-accent-hover: #0D9488;
  --oc-accent-active: #115E59;

  /* Foreground: Slate scale */
  --oc-fg-primary: #1E293B;
  --oc-fg-secondary: #475569;
  --oc-fg-tertiary: #94A3B8;
  --oc-fg-inverse: #FFFFFF;

  /* Background: Warm neutral surfaces */
  --oc-bg-canvas: #FAFAFA;
  --oc-bg-surface: #FFFFFF;
  --oc-bg-surface-hover: #F8FAFC;
  --oc-bg-subtle: #F1F5F9;
  --oc-bg-sidebar: #0F172A;

  /* Borders: Cool slate */
  --oc-border-default: #E2E8F0;
  --oc-border-strong: #CBD5E1;

  /* Semantic colors */
  --oc-success: #059669;
  --oc-warning: #D97706;
  --oc-error: #DC2626;
  --oc-success-bg: #ECFDF5;
  --oc-warning-bg: #FFFBEB;
  --oc-error-bg: #FEF2F2;

  /* ===========================================
     SPACING
     =========================================== */
  --oc-spacing-xs: 4px;
  --oc-spacing-sm: 8px;
  --oc-spacing-md: 16px;
  --oc-spacing-lg: 24px;
  --oc-spacing-xl: 32px;
  --oc-spacing-2xl: 48px;

  /* ===========================================
     RADIUS - Refined, slightly softer corners
     =========================================== */
  --oc-radius-sm: 6px;
  --oc-radius-md: 8px;
  --oc-radius-lg: 12px;
  --oc-radius-full: 9999px;

  /* ===========================================
     TYPOGRAPHY
     =========================================== */
  --oc-font-size-xs: 11px;
  --oc-font-size-sm: 13px;
  --oc-font-size-md: 15px;
  --oc-font-size-lg: 17px;
  --oc-font-size-xl: 20px;
  --oc-font-size-2xl: 24px;
  --oc-font-size-3xl: 32px;

  /* Line heights */
  --oc-line-height-tight: 1.25;
  --oc-line-height-normal: 1.5;
  --oc-line-height-relaxed: 1.75;

  /* ===========================================
     ANIMATION
     =========================================== */
  --oc-duration-fast: 0.15s;
  --oc-duration-normal: 0.2s;
  --oc-duration-slow: 0.3s;
  --oc-duration-spin: 0.8s;

  /* Easing curves */
  --oc-easing-default: cubic-bezier(0.4, 0, 0.2, 1);
  --oc-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --oc-easing-exit: cubic-bezier(0.4, 0, 1, 1);
  --oc-easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ===========================================
     Z-INDEX SCALE
     =========================================== */
  --oc-z-dropdown: 100;
  --oc-z-sticky: 200;
  --oc-z-overlay: 300;
  --oc-z-modal: 400;
  --oc-z-popover: 500;
  --oc-z-tooltip: 600;

  /* ===========================================
     OPACITY
     =========================================== */
  --oc-opacity-disabled: 0.5;
  --oc-opacity-loading: 0.7;
  --oc-opacity-hover: 0.04;
  --oc-opacity-focus-ring: 0.2;
  --oc-opacity-overlay: 0.6;

  /* Breakpoints (for reference in JS, media queries use values directly) */
  --oc-breakpoint-sm: 640px;
  --oc-breakpoint-md: 768px;
  --oc-breakpoint-lg: 1024px;
  --oc-breakpoint-xl: 1280px;

  /* ===========================================
     SHADOWS - Subtle, clean
     =========================================== */
  --oc-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --oc-shadow-md: 0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.03);
  --oc-shadow-lg: 0 4px 6px rgba(15, 23, 42, 0.05), 0 10px 15px rgba(15, 23, 42, 0.04);
  --oc-shadow-xl: 0 8px 16px rgba(15, 23, 42, 0.06), 0 20px 25px rgba(15, 23, 42, 0.05);
  --oc-shadow-inner: inset 0 1px 2px rgba(15, 23, 42, 0.03);
  --oc-shadow-accent: 0 4px 14px rgba(15, 118, 110, 0.2);
  --oc-shadow-accent-lg: 0 8px 24px rgba(15, 118, 110, 0.25);
}

/* ============================================
   Focus Ring Utility
   ============================================ */
.oc-focus-ring:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: 2px;
}

/* Focus ring with glow effect (for inputs, etc.) */
.oc-focus-glow:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, var(--oc-opacity-focus-ring, 0.15));
}

/* ============================================
   Disabled State Utility
   ============================================ */
.oc-disabled,
[disabled] {
  opacity: var(--oc-opacity-disabled, 0.5);
  cursor: not-allowed;
  pointer-events: none;
}

/* ============================================
   Loading State Utility
   ============================================ */
.oc-loading {
  cursor: wait;
  pointer-events: none;
}

.oc-loading > * {
  opacity: var(--oc-opacity-loading, 0.7);
}

/* ============================================
   Shared Keyframe Animations
   ============================================ */

/* Spinner rotation - used by Button, IconButton, Progress, SearchInput */
@keyframes oc-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Fade in with slight scale - used by Modal, Tooltip, Popover */
@keyframes oc-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Fade out with slight scale */
@keyframes oc-fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/* Slide up fade - used by chat messages, toasts */
@keyframes oc-slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide down fade - for dropdowns */
@keyframes oc-slide-down-fade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation - for skeleton loading, thinking indicators */
@keyframes oc-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Bounce animation - for typing indicators */
@keyframes oc-bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
}

/* Shimmer animation - for skeleton loading */
@keyframes oc-shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

/* ============================================
   Transition Utilities
   ============================================ */
.oc-transition-fast {
  transition-duration: var(--oc-duration-fast, 0.15s);
  transition-timing-function: var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
}

.oc-transition-normal {
  transition-duration: var(--oc-duration-normal, 0.25s);
  transition-timing-function: var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
}

.oc-transition-slow {
  transition-duration: var(--oc-duration-slow, 0.4s);
  transition-timing-function: var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
}

.oc-transition-spring {
  transition-timing-function: var(--oc-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

/* ============================================
   Flexbox Utilities
   ============================================ */
.oc-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.oc-flex-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* ============================================
   Text Utilities
   ============================================ */
.oc-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.oc-line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ============================================
   Accessibility: Reduced Motion
   ============================================ */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ============================================
   Screen Reader Only
   ============================================ */
.oc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ============================================
   Premium Polish Effects
   ============================================ */

/* Frosted glass overlay effect */
.oc-frosted {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.oc-frosted-light {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Interactive lift effect on hover */
.oc-lift {
  transition: transform var(--oc-duration-fast, 0.15s) var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
              box-shadow var(--oc-duration-fast, 0.15s) var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
}

.oc-lift:hover {
  transform: translateY(-2px);
}

/* Press effect */
.oc-press:active {
  transform: translateY(1px);
}

/* Focus glow effect for inputs */
.oc-focus-glow-input:focus-within {
  box-shadow: var(--oc-shadow-inner, inset 0 1px 2px rgba(15, 23, 42, 0.03)),
              0 0 0 3px rgba(15, 118, 110, 0.1);
}

/* Smooth color transitions */
.oc-color-transition {
  transition: color var(--oc-duration-fast, 0.15s) var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
              background-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
              border-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default, cubic-bezier(0.4, 0, 0.2, 1));
}

/* ============================================
   Typography Polish
   ============================================ */

/* Professional font feature settings */
.oc-text {
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Heading typography - tighter letter-spacing for polish */
.oc-heading {
  font-feature-settings: 'kern' 1, 'liga' 1;
  letter-spacing: -0.02em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Small caps for labels */
.oc-label {
  font-feature-settings: 'kern' 1, 'smcp' 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Tabular numbers for data */
.oc-tabular {
  font-feature-settings: 'tnum' 1, 'kern' 1;
}

/* ============================================
   Staggered List Animations
   ============================================ */

/* Base stagger animation */
@keyframes oc-stagger-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger animation utilities - apply to list items */
.oc-stagger > * {
  animation: oc-stagger-in var(--oc-duration-normal, 0.25s) var(--oc-easing-enter, cubic-bezier(0, 0, 0.2, 1)) backwards;
}

.oc-stagger > *:nth-child(1) { animation-delay: 0ms; }
.oc-stagger > *:nth-child(2) { animation-delay: 50ms; }
.oc-stagger > *:nth-child(3) { animation-delay: 100ms; }
.oc-stagger > *:nth-child(4) { animation-delay: 150ms; }
.oc-stagger > *:nth-child(5) { animation-delay: 200ms; }
.oc-stagger > *:nth-child(6) { animation-delay: 250ms; }
.oc-stagger > *:nth-child(7) { animation-delay: 300ms; }
.oc-stagger > *:nth-child(8) { animation-delay: 350ms; }
.oc-stagger > *:nth-child(9) { animation-delay: 400ms; }
.oc-stagger > *:nth-child(10) { animation-delay: 450ms; }

/* Fast stagger (25ms intervals) */
.oc-stagger-fast > * {
  animation: oc-stagger-in var(--oc-duration-fast, 0.15s) var(--oc-easing-enter, cubic-bezier(0, 0, 0.2, 1)) backwards;
}

.oc-stagger-fast > *:nth-child(1) { animation-delay: 0ms; }
.oc-stagger-fast > *:nth-child(2) { animation-delay: 25ms; }
.oc-stagger-fast > *:nth-child(3) { animation-delay: 50ms; }
.oc-stagger-fast > *:nth-child(4) { animation-delay: 75ms; }
.oc-stagger-fast > *:nth-child(5) { animation-delay: 100ms; }
.oc-stagger-fast > *:nth-child(6) { animation-delay: 125ms; }
.oc-stagger-fast > *:nth-child(7) { animation-delay: 150ms; }
.oc-stagger-fast > *:nth-child(8) { animation-delay: 175ms; }
.oc-stagger-fast > *:nth-child(9) { animation-delay: 200ms; }
.oc-stagger-fast > *:nth-child(10) { animation-delay: 225ms; }

/* Scale stagger - for cards/grid items */
@keyframes oc-stagger-scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.oc-stagger-scale > * {
  animation: oc-stagger-scale-in var(--oc-duration-normal, 0.25s) var(--oc-easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1)) backwards;
}

.oc-stagger-scale > *:nth-child(1) { animation-delay: 0ms; }
.oc-stagger-scale > *:nth-child(2) { animation-delay: 50ms; }
.oc-stagger-scale > *:nth-child(3) { animation-delay: 100ms; }
.oc-stagger-scale > *:nth-child(4) { animation-delay: 150ms; }
.oc-stagger-scale > *:nth-child(5) { animation-delay: 200ms; }
.oc-stagger-scale > *:nth-child(6) { animation-delay: 250ms; }
`;
