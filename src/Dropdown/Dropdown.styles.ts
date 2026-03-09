export const dropdownStyles = `
/* ─── Dropdown ─────────────────────────────────────────────────────────── */

.oc-dropdown {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  font-family: inherit;
}

.oc-dropdown--fluid {
  width: 100%;
}

/* ─── Size variants ────────────────────────────────────────────────────── */

.oc-dropdown--sm .oc-dropdown__trigger {
  min-height: 30px;
  padding: 4px 8px;
  font-size: var(--oc-font-size-xs);
}

.oc-dropdown--lg .oc-dropdown__trigger {
  min-height: 44px;
  padding: 8px 16px;
  font-size: var(--oc-font-size-md);
}

.oc-dropdown--sm .oc-dropdown__option,
.oc-dropdown--sm .oc-dropdown__item {
  min-height: 30px;
  padding: 4px 8px;
  font-size: var(--oc-font-size-xs);
}

.oc-dropdown--lg .oc-dropdown__option,
.oc-dropdown--lg .oc-dropdown__item {
  min-height: 44px;
  padding: 10px 16px;
  font-size: var(--oc-font-size-md);
}

/* ─── Trigger ──────────────────────────────────────────────────────────── */

.oc-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--oc-spacing-sm);
  min-height: 44px;
  padding: 6px 12px;
  background: var(--oc-bg-surface);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  transition: border-color var(--oc-duration-fast) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast) var(--oc-easing-default),
              background-color var(--oc-duration-fast) var(--oc-easing-default);
  outline: none;
  user-select: none;
}

.oc-dropdown__trigger:hover:not(.oc-dropdown__trigger--disabled) {
  background: var(--oc-bg-surface-hover);
  border-color: var(--oc-border-strong);
}

.oc-dropdown__trigger:focus-visible:not(.oc-dropdown__trigger--disabled) {
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2);
}

.oc-dropdown__trigger--open {
  border-color: var(--oc-accent);
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2);
}

.oc-dropdown__trigger--disabled {
  background: var(--oc-bg-subtle);
  border-color: var(--oc-border-default);
  color: var(--oc-fg-tertiary);
  cursor: not-allowed;
  opacity: var(--oc-opacity-disabled);
}

.oc-dropdown__trigger--custom {
  /* Reset all built-in styling for custom triggers */
  min-height: unset;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.oc-dropdown__trigger--custom:hover,
.oc-dropdown__trigger--custom:focus-visible,
.oc-dropdown__trigger--custom.oc-dropdown__trigger--open {
  background: transparent;
  border: none;
  box-shadow: none;
}

/* ─── Trigger content ──────────────────────────────────────────────────── */

.oc-dropdown__trigger-content {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.oc-dropdown__trigger-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--oc-fg-secondary);
}

.oc-dropdown__trigger-icon svg {
  width: var(--oc-dropdown-icon-size, 16px);
  height: var(--oc-dropdown-icon-size, 16px);
}

.oc-dropdown__trigger-icon .oc-dropdown__option-icon-img {
  width: var(--oc-dropdown-icon-size, 16px);
  height: var(--oc-dropdown-icon-size, 16px);
  object-fit: contain;
  border-radius: 2px;
}

.oc-dropdown__value {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--oc-fg-primary);
}

.oc-dropdown__trigger-value-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.oc-dropdown__trigger-description {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-secondary);
  line-height: var(--oc-line-height-normal);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-dropdown__placeholder {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--oc-fg-secondary);
}

/* ─── Indicators ───────────────────────────────────────────────────────── */

.oc-dropdown__indicators {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
  flex-shrink: 0;
  margin-left: var(--oc-spacing-xs);
}

.oc-dropdown__chevron {
  display: flex;
  align-items: center;
  color: var(--oc-fg-secondary);
  transition: transform var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-dropdown__trigger--open .oc-dropdown__chevron {
  transform: rotate(180deg);
}

.oc-dropdown__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--oc-fg-secondary);
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  transition: color var(--oc-duration-fast) var(--oc-easing-default),
              background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-dropdown__clear:hover {
  color: var(--oc-error);
  background: rgba(220, 38, 38, 0.06);
}

.oc-dropdown__spinner {
  animation: oc-spin var(--oc-duration-spin) linear infinite;
  color: var(--oc-fg-secondary);
  flex-shrink: 0;
}

/* ─── Tags (multiselect) ──────────────────────────────────────────────── */

.oc-dropdown__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.oc-dropdown__tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(15, 118, 110, 0.1);
  border: 1px solid rgba(15, 118, 110, 0.2);
  border-radius: 6px;
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  color: var(--oc-accent);
  line-height: var(--oc-line-height-tight);
  white-space: nowrap;
}

.oc-dropdown__tag-label {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oc-dropdown__tag-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--oc-accent);
  cursor: pointer;
  border-radius: 2px;
  transition: color var(--oc-duration-fast) var(--oc-easing-default);
  flex-shrink: 0;
}

.oc-dropdown__tag-remove:hover {
  color: var(--oc-error);
}

/* ─── Menu ─────────────────────────────────────────────────────────────── */

.oc-dropdown__menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: var(--oc-z-dropdown);
  background: var(--oc-bg-surface);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  box-shadow: var(--oc-shadow-lg);
  overflow: hidden;
  animation: oc-dropdown-enter var(--oc-duration-fast) var(--oc-easing-enter);
}

.oc-dropdown__menu--upward {
  top: auto;
  bottom: calc(100% + 4px);
  animation-name: oc-dropdown-enter-up;
}

.oc-dropdown__menu--align-right {
  left: auto;
  right: 0;
}

/* Menu mode: auto width instead of matching trigger */
.oc-dropdown--menu .oc-dropdown__menu {
  right: auto;
  min-width: 180px;
}

@keyframes oc-dropdown-enter {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes oc-dropdown-enter-up {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ─── Search ───────────────────────────────────────────────────────────── */

.oc-dropdown__search {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  min-height: 44px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--oc-border-default);
}

.oc-dropdown__search-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--oc-fg-secondary);
}

.oc-dropdown__search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  outline: none;
  min-width: 0;
}

.oc-dropdown__search-input::placeholder {
  color: var(--oc-fg-tertiary);
}

.oc-dropdown__search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--oc-fg-secondary);
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  flex-shrink: 0;
  transition: color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-dropdown__search-clear:hover {
  color: var(--oc-fg-primary);
}

/* ─── Options container ────────────────────────────────────────────────── */

.oc-dropdown__options {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--oc-spacing-xs);
}

/* Scrollbar styling */
.oc-dropdown__options::-webkit-scrollbar {
  width: 6px;
}

.oc-dropdown__options::-webkit-scrollbar-track {
  background: transparent;
}

.oc-dropdown__options::-webkit-scrollbar-thumb {
  background: var(--oc-border-default);
  border-radius: 3px;
}

.oc-dropdown__options::-webkit-scrollbar-thumb:hover {
  background: var(--oc-border-strong);
}

/* ─── Option ───────────────────────────────────────────────────────────── */

.oc-dropdown__option {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  min-height: 44px;
  padding: 10px 14px;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  border-radius: var(--oc-radius-sm);
  cursor: pointer;
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
  user-select: none;
}

.oc-dropdown__option:hover:not(.oc-dropdown__option--disabled) {
  background: var(--oc-bg-surface-hover);
}

.oc-dropdown__option--focused {
  background: rgba(15, 118, 110, 0.1);
}

.oc-dropdown__option--focused:hover {
  background: rgba(15, 118, 110, 0.1);
}

.oc-dropdown__option--selected {
  color: var(--oc-accent);
  font-weight: 500;
}

.oc-dropdown__option--selected.oc-dropdown__option--focused {
  background: rgba(15, 118, 110, 0.15);
}

.oc-dropdown__option--disabled {
  color: var(--oc-fg-tertiary);
  cursor: not-allowed;
}

.oc-dropdown__option-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: currentColor;
}

.oc-dropdown__option-icon svg {
  width: var(--oc-dropdown-icon-size, 16px);
  height: var(--oc-dropdown-icon-size, 16px);
}

.oc-dropdown__option-icon-img {
  width: var(--oc-dropdown-icon-size, 16px);
  height: var(--oc-dropdown-icon-size, 16px);
  object-fit: contain;
  border-radius: 2px;
}

.oc-dropdown__option-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.oc-dropdown__option-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-dropdown__option-description {
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-secondary);
  line-height: var(--oc-line-height-normal);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-dropdown--wrap-descriptions .oc-dropdown__option-description {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.oc-dropdown__option--selected .oc-dropdown__option-description {
  color: var(--oc-accent);
  opacity: 0.7;
}

.oc-dropdown__option-check {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--oc-accent);
  margin-left: auto;
}

/* ─── Menu-mode compound items (Dropdown.Item) ─────────────────────────── */

.oc-dropdown__item {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  min-height: 44px;
  padding: 10px 14px;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  border-radius: var(--oc-radius-sm);
  cursor: pointer;
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
  user-select: none;
}

.oc-dropdown__item:hover:not(.oc-dropdown__item--disabled) {
  background: var(--oc-bg-surface-hover);
}

.oc-dropdown__item--focused {
  background: rgba(15, 118, 110, 0.1);
}

.oc-dropdown__item--focused:hover {
  background: rgba(15, 118, 110, 0.1);
}

.oc-dropdown__item--disabled {
  color: var(--oc-fg-tertiary);
  cursor: not-allowed;
}

.oc-dropdown__item-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--oc-fg-secondary);
}

.oc-dropdown__item-icon svg {
  width: var(--oc-dropdown-icon-size, 16px);
  height: var(--oc-dropdown-icon-size, 16px);
}

.oc-dropdown__item-label {
  flex: 1;
  min-width: 0;
}

/* ─── Divider ──────────────────────────────────────────────────────────── */

.oc-dropdown__divider {
  height: 1px;
  margin: var(--oc-spacing-xs) 0;
  background: var(--oc-border-default);
}

/* ─── Header (group label) ─────────────────────────────────────────────── */

.oc-dropdown__header {
  padding: var(--oc-spacing-sm) 14px var(--oc-spacing-xs);
  font-size: var(--oc-font-size-xs);
  font-weight: 500;
  color: var(--oc-fg-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  user-select: none;
}

/* ─── Empty state ──────────────────────────────────────────────────────── */

.oc-dropdown__empty {
  padding: var(--oc-spacing-lg);
  text-align: center;
  color: var(--oc-fg-secondary);
  font-size: var(--oc-font-size-sm);
}

/* ─── Loading state ────────────────────────────────────────────────────── */

.oc-dropdown__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-lg);
  color: var(--oc-fg-secondary);
  font-size: var(--oc-font-size-sm);
}

.oc-dropdown__loading-more {
  display: flex;
  justify-content: center;
  padding: var(--oc-spacing-sm);
}

/* ─── Responsive ───────────────────────────────────────────────────────── */

@media (max-width: 600px) {
  /* 16px minimum prevents iOS Safari auto-zoom on focus */
  .oc-dropdown__trigger {
    font-size: 16px;
  }

  .oc-dropdown__search-input {
    font-size: 16px;
  }

  .oc-dropdown--fluid .oc-dropdown__menu {
    left: 0;
    right: 0;
  }
}

/* ─── Coarse pointer (touch) feedback ─────────────────────────────────── */

@media (pointer: coarse) {
  .oc-dropdown__option:active:not(.oc-dropdown__option--disabled) {
    background: rgba(15, 118, 110, 0.12);
  }

  .oc-dropdown__item:active:not(.oc-dropdown__item--disabled) {
    background: rgba(15, 118, 110, 0.12);
  }
}
`;
