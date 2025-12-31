export const checkboxStyles = `
/* Checkbox wrapper */
.oc-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.oc-checkbox-wrapper--disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-checkbox-wrapper--error .oc-checkbox-box {
  border-color: var(--oc-error);
}

/* Checkbox box */
.oc-checkbox-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--oc-border-strong);
  border-radius: var(--oc-radius-sm);
  background: var(--oc-bg-canvas);
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  flex-shrink: 0;
}

.oc-checkbox-box--checked,
.oc-checkbox-box--indeterminate {
  background: var(--oc-accent);
  border-color: var(--oc-accent);
}

.oc-checkbox-wrapper:hover:not(.oc-checkbox-wrapper--disabled) .oc-checkbox-box:not(.oc-checkbox-box--checked):not(.oc-checkbox-box--indeterminate) {
  border-color: var(--oc-accent);
}

/* Hidden input */
.oc-checkbox-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  cursor: inherit;
}

.oc-checkbox-input:focus-visible + .oc-checkbox-icon,
.oc-checkbox-box:has(.oc-checkbox-input:focus-visible) {
  outline: 2px solid var(--oc-accent);
  outline-offset: 2px;
}

/* Check icon */
.oc-checkbox-icon {
  width: 12px;
  height: 12px;
  color: var(--oc-fg-inverse);
  pointer-events: none;
}

/* Label */
.oc-checkbox-label {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

/* Checkbox group */
.oc-checkbox-group {
  display: flex;
  gap: var(--oc-spacing-sm);
}

.oc-checkbox-group--vertical {
  flex-direction: column;
}

.oc-checkbox-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}
`;
