export const buttonStyles = `
/* Button */
.oc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--oc-spacing-sm);
  border: none;
  border-radius: var(--oc-radius-md);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  text-decoration: none;
  white-space: nowrap;
}

.oc-button:focus-visible {
  outline: 2px solid var(--oc-accent);
  outline-offset: 2px;
}

/* Sizes */
.oc-button--sm {
  height: 32px;
  padding: 0 var(--oc-spacing-sm);
  font-size: var(--oc-font-size-xs);
}

.oc-button--md {
  height: 36px;
  padding: 0 var(--oc-spacing-md);
  font-size: var(--oc-font-size-sm);
}

.oc-button--lg {
  height: 44px;
  padding: 0 var(--oc-spacing-lg);
  font-size: var(--oc-font-size-md);
}

/* Primary variant - flat, modern */
.oc-button--primary {
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
  box-shadow: var(--oc-shadow-sm);
}

.oc-button--primary:hover:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-accent-hover);
  box-shadow: var(--oc-shadow-md);
  transform: translateY(-1px);
}

.oc-button--primary:active:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-accent-active);
  transform: translateY(0);
  box-shadow: var(--oc-shadow-sm);
}

/* Secondary variant */
.oc-button--secondary {
  background: var(--oc-bg-canvas);
  color: var(--oc-fg-primary);
  border: 1px solid var(--oc-border-default);
}

.oc-button--secondary:hover:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-bg-surface);
  border-color: var(--oc-border-strong);
}

.oc-button--secondary:active:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-bg-surface-hover);
}

/* Ghost variant */
.oc-button--ghost {
  background: transparent;
  color: var(--oc-fg-primary);
}

.oc-button--ghost:hover:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-bg-surface);
}

.oc-button--ghost:active:not(:disabled):not(.oc-button--loading) {
  background: var(--oc-bg-surface-hover);
}

/* Danger variant */
.oc-button--danger {
  background: var(--oc-error);
  color: var(--oc-fg-inverse);
}

.oc-button--danger:hover:not(:disabled):not(.oc-button--loading) {
  filter: brightness(0.9);
}

.oc-button--danger:active:not(:disabled):not(.oc-button--loading) {
  filter: brightness(0.85);
}

/* Link variant */
.oc-button--link {
  background: transparent;
  color: var(--oc-accent);
  padding: 0;
  height: auto;
}

.oc-button--link:hover:not(:disabled):not(.oc-button--loading) {
  color: var(--oc-accent-hover);
  text-decoration: underline;
}

/* States */
.oc-button--full-width {
  width: 100%;
}

.oc-button--disabled,
.oc-button:disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-button--loading {
  cursor: wait;
}

.oc-button--loading .oc-button__label {
  opacity: var(--oc-opacity-loading);
}

/* Button parts */
.oc-button__spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-button__spinner-icon {
  width: 16px;
  height: 16px;
  animation: oc-spin var(--oc-duration-spin) linear infinite;
}

.oc-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.oc-button__icon svg {
  width: 16px;
  height: 16px;
}

.oc-button--lg .oc-button__icon svg {
  width: 20px;
  height: 20px;
}

.oc-button__label {
  display: inline-flex;
  align-items: center;
}

/* IconButton */
.oc-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--oc-radius-md);
  cursor: pointer;
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  background: transparent;
  color: var(--oc-fg-secondary);
}

.oc-icon-button:focus-visible {
  outline: 2px solid var(--oc-accent);
  outline-offset: 2px;
}

/* IconButton sizes */
.oc-icon-button--sm {
  width: 28px;
  height: 28px;
}

.oc-icon-button--md {
  width: 32px;
  height: 32px;
}

.oc-icon-button--lg {
  width: 40px;
  height: 40px;
}

.oc-icon-button svg {
  width: 16px;
  height: 16px;
}

.oc-icon-button--lg svg {
  width: 20px;
  height: 20px;
}

/* IconButton variants */
.oc-icon-button--ghost:hover:not(:disabled) {
  background: var(--oc-bg-surface);
  color: var(--oc-fg-primary);
}

.oc-icon-button--ghost:active:not(:disabled) {
  background: var(--oc-bg-surface-hover);
}

.oc-icon-button--primary {
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
}

.oc-icon-button--primary:hover:not(:disabled) {
  background: var(--oc-accent-hover);
}

.oc-icon-button--primary:active:not(:disabled) {
  background: var(--oc-accent-active);
}

.oc-icon-button--secondary {
  background: var(--oc-bg-canvas);
  color: var(--oc-fg-primary);
  border: 1px solid var(--oc-border-default);
}

.oc-icon-button--secondary:hover:not(:disabled) {
  background: var(--oc-bg-surface);
  border-color: var(--oc-border-strong);
}

.oc-icon-button--danger {
  color: var(--oc-error);
}

.oc-icon-button--danger:hover:not(:disabled) {
  background: var(--oc-error-bg);
}

.oc-icon-button--link {
  color: var(--oc-accent);
}

.oc-icon-button--link:hover:not(:disabled) {
  color: var(--oc-accent-hover);
}

.oc-icon-button--disabled,
.oc-icon-button:disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-icon-button--loading {
  cursor: wait;
}

.oc-icon-button__spinner {
  animation: oc-spin var(--oc-duration-spin) linear infinite;
}

/* ButtonGroup */
.oc-button-group {
  display: inline-flex;
  gap: var(--oc-spacing-sm);
}

.oc-button-group--attached {
  gap: 0;
}

.oc-button-group--attached > .oc-button {
  border-radius: 0;
}

.oc-button-group--attached > .oc-button:first-child {
  border-radius: var(--oc-radius-md) 0 0 var(--oc-radius-md);
}

.oc-button-group--attached > .oc-button:last-child {
  border-radius: 0 var(--oc-radius-md) var(--oc-radius-md) 0;
}

.oc-button-group--attached > .oc-button--secondary:not(:first-child) {
  border-left: none;
}
`;
