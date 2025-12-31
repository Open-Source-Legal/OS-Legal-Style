export const textareaStyles = `
/* Textarea wrapper */
.oc-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
}

.oc-textarea-wrapper--full-width {
  width: 100%;
}

/* Label */
.oc-textarea-label {
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-primary);
}

/* Textarea element */
.oc-textarea {
  width: 100%;
  padding: var(--oc-spacing-sm);
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  line-height: var(--oc-line-height-normal);
  color: var(--oc-fg-primary);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  resize: vertical;
  transition: border-color var(--oc-duration-fast) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-textarea:focus {
  outline: none;
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-textarea::placeholder {
  color: var(--oc-fg-tertiary);
}

.oc-textarea--error {
  border-color: var(--oc-error);
}

.oc-textarea--error:focus {
  border-color: var(--oc-error);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.oc-textarea--disabled {
  background: var(--oc-bg-surface);
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
  resize: none;
}

.oc-textarea--auto-resize {
  resize: none;
  overflow-y: hidden;
}

/* Helper and error text */
.oc-textarea-helper {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  margin: 0;
}

.oc-textarea-error {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-error);
  margin: 0;
}
`;
