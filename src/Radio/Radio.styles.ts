export const radioStyles = `
/* Radio wrapper */
.oc-radio-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.oc-radio-wrapper--disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-radio-wrapper--error .oc-radio-circle {
  border-color: var(--oc-error);
}

/* Radio circle */
.oc-radio-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--oc-border-strong);
  border-radius: var(--oc-radius-full);
  background: var(--oc-bg-canvas);
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  flex-shrink: 0;
}

.oc-radio-circle--checked {
  border-color: var(--oc-accent);
}

.oc-radio-wrapper:hover:not(.oc-radio-wrapper--disabled) .oc-radio-circle:not(.oc-radio-circle--checked) {
  border-color: var(--oc-accent);
}

/* Hidden input */
.oc-radio-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  cursor: inherit;
}

.oc-radio-circle:has(.oc-radio-input:focus-visible) {
  outline: 2px solid var(--oc-accent);
  outline-offset: 2px;
}

/* Dot */
.oc-radio-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--oc-radius-full);
  background: var(--oc-accent);
}

/* Label */
.oc-radio-label {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

/* Radio group */
.oc-radio-group {
  display: flex;
  gap: var(--oc-spacing-sm);
}

.oc-radio-group--vertical {
  flex-direction: column;
}

.oc-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}
`;
