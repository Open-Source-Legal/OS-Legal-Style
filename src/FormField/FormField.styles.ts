export const formFieldStyles = `
/* Form field */
.oc-form-field {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
}

/* Label */
.oc-form-field__label {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-primary);
}

.oc-form-field__required {
  color: var(--oc-error);
}

.oc-form-field__optional {
  font-weight: 400;
  color: var(--oc-fg-tertiary);
}

/* Control */
.oc-form-field__control {
  display: flex;
  flex-direction: column;
}

/* Helper text */
.oc-form-field__helper {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  margin: 0;
}

/* Error text */
.oc-form-field__error {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-error);
  margin: 0;
}
`;
