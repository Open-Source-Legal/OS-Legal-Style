export const toastStyles = `
/* Toast container */
.oc-toast-container {
  position: fixed;
  z-index: var(--oc-z-tooltip);
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-md);
  pointer-events: none;
  max-width: 420px;
  width: 100%;
}

.oc-toast-container--top-right {
  top: 0;
  right: 0;
}

.oc-toast-container--top-left {
  top: 0;
  left: 0;
}

.oc-toast-container--bottom-right {
  bottom: 0;
  right: 0;
}

.oc-toast-container--bottom-left {
  bottom: 0;
  left: 0;
}

.oc-toast-container--top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.oc-toast-container--bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* Toast */
.oc-toast {
  display: flex;
  align-items: flex-start;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-lg);
  box-shadow: var(--oc-shadow-lg);
  pointer-events: auto;
  animation: oc-slide-up-fade var(--oc-duration-normal) var(--oc-easing-enter);
}

/* Toast icon */
.oc-toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
}

.oc-toast--success .oc-toast__icon {
  color: var(--oc-success);
}

.oc-toast--error .oc-toast__icon {
  color: var(--oc-error);
}

.oc-toast--warning .oc-toast__icon {
  color: var(--oc-warning);
}

.oc-toast--info .oc-toast__icon {
  color: var(--oc-accent);
}

/* Toast content */
.oc-toast__content {
  flex: 1;
  min-width: 0;
}

.oc-toast__title {
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

.oc-toast__description {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-secondary);
  line-height: var(--oc-line-height-tight);
  margin-top: 2px;
}

/* Toast action */
.oc-toast__action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

/* Toast close button */
.oc-toast__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--oc-fg-tertiary);
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-toast__close:hover {
  background: var(--oc-bg-surface);
  color: var(--oc-fg-primary);
}
`;
