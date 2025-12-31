export const toggleStyles = `
/* Toggle wrapper */
.oc-toggle-wrapper {
  display: inline-flex;
  align-items: flex-start;
  gap: var(--oc-spacing-sm);
  cursor: pointer;
  user-select: none;
}

.oc-toggle-wrapper--disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

/* Toggle track */
.oc-toggle-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--oc-border-default);
  border-radius: var(--oc-radius-full);
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
  flex-shrink: 0;
}

.oc-toggle-track--sm {
  width: 28px;
  height: 16px;
}

.oc-toggle-track--md {
  width: 36px;
  height: 20px;
}

.oc-toggle-track--lg {
  width: 44px;
  height: 24px;
}

.oc-toggle-track--checked {
  background: var(--oc-accent);
}

.oc-toggle-track--error {
  background: var(--oc-error);
}

.oc-toggle-wrapper:hover:not(.oc-toggle-wrapper--disabled) .oc-toggle-track:not(.oc-toggle-track--checked) {
  background: var(--oc-border-strong);
}

/* Hidden input */
.oc-toggle-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  margin: 0;
  cursor: inherit;
}

.oc-toggle-track:has(.oc-toggle-input:focus-visible) {
  outline: 2px solid var(--oc-accent);
  outline-offset: 2px;
}

/* Toggle thumb */
.oc-toggle-thumb {
  position: absolute;
  background: var(--oc-fg-inverse);
  border-radius: var(--oc-radius-full);
  box-shadow: var(--oc-shadow-sm);
  transition: transform var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-toggle-track--sm .oc-toggle-thumb {
  width: 12px;
  height: 12px;
  left: 2px;
}

.oc-toggle-track--md .oc-toggle-thumb {
  width: 16px;
  height: 16px;
  left: 2px;
}

.oc-toggle-track--lg .oc-toggle-thumb {
  width: 20px;
  height: 20px;
  left: 2px;
}

.oc-toggle-track--checked.oc-toggle-track--sm .oc-toggle-thumb {
  transform: translateX(12px);
}

.oc-toggle-track--checked.oc-toggle-track--md .oc-toggle-thumb {
  transform: translateX(16px);
}

.oc-toggle-track--checked.oc-toggle-track--lg .oc-toggle-thumb {
  transform: translateX(20px);
}

/* Content */
.oc-toggle-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.oc-toggle-label {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

.oc-toggle-description {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  line-height: var(--oc-line-height-tight);
}
`;
