export const inputStyles = `
/* Input wrapper */
.oc-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
}

.oc-input-wrapper--full-width {
  width: 100%;
}

/* Label */
.oc-input-label {
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-primary);
}

/* Input container */
.oc-input-container {
  display: flex;
  align-items: stretch;
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  transition: border-color var(--oc-duration-fast) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast) var(--oc-easing-default);
  overflow: hidden;
}

.oc-input-container:focus-within {
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-input-container--error {
  border-color: var(--oc-error);
}

.oc-input-container--error:focus-within {
  border-color: var(--oc-error);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.oc-input-container--disabled {
  background: var(--oc-bg-surface);
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

/* Size variants */
.oc-input-container--sm {
  min-height: 32px;
}

.oc-input-container--md {
  min-height: 36px;
}

.oc-input-container--lg {
  min-height: 44px;
}

/* Field wrapper */
.oc-input-field {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}

/* Input element */
.oc-input {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  padding: 0 var(--oc-spacing-sm);
  outline: none;
}

.oc-input-container--sm .oc-input {
  font-size: var(--oc-font-size-xs);
}

.oc-input-container--lg .oc-input {
  font-size: var(--oc-font-size-md);
  padding: 0 var(--oc-spacing-md);
}

.oc-input::placeholder {
  color: var(--oc-fg-tertiary);
}

.oc-input:disabled {
  cursor: not-allowed;
}

.oc-input--has-left-icon {
  padding-left: calc(var(--oc-spacing-sm) + 24px);
}

.oc-input--has-right-icon {
  padding-right: calc(var(--oc-spacing-sm) + 24px);
}

/* Icons */
.oc-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary);
  pointer-events: none;
}

.oc-input-icon--left {
  left: var(--oc-spacing-sm);
}

.oc-input-icon--right {
  right: var(--oc-spacing-sm);
}

.oc-input-icon svg {
  width: 16px;
  height: 16px;
}

/* Addons */
.oc-input-addon {
  display: flex;
  align-items: center;
  padding: 0 var(--oc-spacing-sm);
  background: var(--oc-bg-surface);
  color: var(--oc-fg-secondary);
  font-size: var(--oc-font-size-sm);
  border-color: inherit;
  white-space: nowrap;
}

.oc-input-addon--left {
  border-right: 1px solid var(--oc-border-default);
}

.oc-input-addon--right {
  border-left: 1px solid var(--oc-border-default);
}

/* Helper and error text */
.oc-input-helper {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  margin: 0;
}

.oc-input-error {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-error);
  margin: 0;
}
`;
