export const selectStyles = `
/* Select wrapper */
.oc-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
  position: relative;
}

.oc-select-wrapper--full-width {
  width: 100%;
}

/* Label */
.oc-select-label {
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-fg-primary);
}

/* Trigger */
.oc-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--oc-spacing-sm);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  cursor: pointer;
  transition: border-color var(--oc-duration-fast) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-select-trigger:focus {
  outline: none;
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-select-trigger--sm {
  min-height: 32px;
  padding: 0 var(--oc-spacing-sm);
  font-size: var(--oc-font-size-xs);
}

.oc-select-trigger--md {
  min-height: 36px;
  padding: 0 var(--oc-spacing-sm);
  font-size: var(--oc-font-size-sm);
}

.oc-select-trigger--lg {
  min-height: 44px;
  padding: 0 var(--oc-spacing-md);
  font-size: var(--oc-font-size-md);
}

.oc-select-trigger--open {
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

.oc-select-trigger--error {
  border-color: var(--oc-error);
}

.oc-select-trigger--error:focus,
.oc-select-trigger--error.oc-select-trigger--open {
  border-color: var(--oc-error);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.oc-select-trigger--disabled {
  background: var(--oc-bg-surface);
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

/* Value and placeholder */
.oc-select-value {
  flex: 1;
  color: var(--oc-fg-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-select-placeholder {
  flex: 1;
  color: var(--oc-fg-tertiary);
}

/* Search input */
.oc-select-search {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  color: var(--oc-fg-primary);
  outline: none;
  min-width: 0;
}

.oc-select-search::placeholder {
  color: var(--oc-fg-tertiary);
}

/* Indicators */
.oc-select-indicators {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
  flex-shrink: 0;
}

.oc-select-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: var(--oc-fg-tertiary);
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  padding: 0;
}

.oc-select-clear:hover {
  background: var(--oc-bg-surface);
  color: var(--oc-fg-primary);
}

.oc-select-chevron {
  color: var(--oc-fg-tertiary);
  transition: transform var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-select-trigger--open .oc-select-chevron {
  transform: rotate(180deg);
}

/* Dropdown */
.oc-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--oc-spacing-xs);
  padding: var(--oc-spacing-xs);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  box-shadow: var(--oc-shadow-lg);
  max-height: 240px;
  overflow-y: auto;
  z-index: var(--oc-z-dropdown);
  list-style: none;
}

/* Option */
.oc-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--oc-spacing-sm);
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  border-radius: var(--oc-radius-sm);
  cursor: pointer;
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-select-option:hover,
.oc-select-option--highlighted {
  background: var(--oc-bg-surface);
}

.oc-select-option--selected {
  color: var(--oc-accent);
  font-weight: 500;
}

.oc-select-option--disabled {
  color: var(--oc-fg-tertiary);
  cursor: not-allowed;
}

.oc-select-option--disabled:hover {
  background: transparent;
}

.oc-select-check {
  flex-shrink: 0;
  color: var(--oc-accent);
}

/* Option group */
.oc-select-group {
  list-style: none;
}

.oc-select-group:not(:first-child) {
  margin-top: var(--oc-spacing-xs);
  padding-top: var(--oc-spacing-xs);
  border-top: 1px solid var(--oc-border-default);
}

.oc-select-group-label {
  padding: var(--oc-spacing-xs) var(--oc-spacing-sm);
  font-size: var(--oc-font-size-xs);
  font-weight: 500;
  color: var(--oc-fg-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.oc-select-group-options {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Empty state */
.oc-select-empty {
  padding: var(--oc-spacing-md);
  text-align: center;
  color: var(--oc-fg-tertiary);
  font-size: var(--oc-font-size-sm);
}

/* Helper and error text */
.oc-select-helper {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  margin: 0;
}

.oc-select-error {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-error);
  margin: 0;
}
`;
