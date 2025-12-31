export const searchInputStyles = `
/* Search input wrapper */
.oc-search-input-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

.oc-search-input-wrapper--full-width {
  width: 100%;
}

/* Search input container */
.oc-search-input-container {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  padding: 0 var(--oc-spacing-sm);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  min-height: 36px;
  transition: border-color var(--oc-duration-fast) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-search-input-container--focused {
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.15);
}

/* Search icon */
.oc-search-input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary);
  flex-shrink: 0;
}

.oc-search-input-spinner {
  animation: oc-spin var(--oc-duration-spin) linear infinite;
}

/* Input field */
.oc-search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  outline: none;
}

.oc-search-input::placeholder {
  color: var(--oc-fg-tertiary);
}

/* Clear button */
.oc-search-input-clear {
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
  flex-shrink: 0;
}

.oc-search-input-clear:hover {
  background: var(--oc-bg-surface);
  color: var(--oc-fg-primary);
}

/* Shortcut badge */
.oc-search-input-shortcut {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  font-family: inherit;
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-tertiary);
  background: var(--oc-bg-surface);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-sm);
  flex-shrink: 0;
}

/* Dropdown */
.oc-search-input-dropdown {
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
  max-height: 300px;
  overflow-y: auto;
  z-index: var(--oc-z-dropdown);
}

.oc-search-input-dropdown-header {
  padding: var(--oc-spacing-xs) var(--oc-spacing-sm);
  font-size: var(--oc-font-size-xs);
  font-weight: 500;
  color: var(--oc-fg-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.oc-search-input-dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  width: 100%;
  padding: var(--oc-spacing-sm);
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  text-align: left;
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-search-input-dropdown-item:hover,
.oc-search-input-dropdown-item--highlighted {
  background: var(--oc-bg-surface);
}

.oc-search-input-dropdown-item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary);
  flex-shrink: 0;
}

.oc-search-input-dropdown-item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;
