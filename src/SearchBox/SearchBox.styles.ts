export const searchBoxStyles = `
/* ============================================
   SearchBox Component
   ============================================ */

.oc-search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--oc-bg-surface, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  transition: border-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default),
              box-shadow var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-search-box:focus-within {
  border-color: var(--oc-accent, #0F766E);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

/* Size variants */
.oc-search-box--sm {
  padding: 8px 12px;
  gap: 10px;
}

.oc-search-box--sm .oc-search-box__input {
  font-size: var(--oc-font-size-sm, 13px);
}

.oc-search-box--sm .oc-search-box__button {
  padding: 6px 14px;
  font-size: var(--oc-font-size-sm, 13px);
}

.oc-search-box--lg {
  padding: 16px 20px;
  gap: 14px;
}

.oc-search-box--lg .oc-search-box__input {
  font-size: var(--oc-font-size-lg, 17px);
}

.oc-search-box--lg .oc-search-box__button {
  padding: 10px 24px;
  font-size: var(--oc-font-size-md, 15px);
}

/* Icon */
.oc-search-box__icon {
  color: var(--oc-fg-tertiary, #94A3B8);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Input */
.oc-search-box__input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--oc-font-size-md, 15px);
  color: var(--oc-fg-primary, #1E293B);
  outline: none;
}

.oc-search-box__input::placeholder {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-search-box__input:disabled {
  cursor: not-allowed;
}

/* Button */
.oc-search-box__button {
  padding: 8px 20px;
  background: #334155;
  color: var(--oc-fg-inverse, #FFFFFF);
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  font-family: inherit;
  font-size: var(--oc-font-size-sm, 14px);
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.oc-search-box__button:hover:not(:disabled) {
  background: #1E293B;
}

.oc-search-box__button:active:not(:disabled) {
  background: #0F172A;
}

.oc-search-box__button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading state */
.oc-search-box--loading {
  pointer-events: none;
}

.oc-search-box__spinner {
  animation: oc-spin var(--oc-duration-spin, 0.8s) linear infinite;
}

/* Responsive */
@media (max-width: 480px) {
  .oc-search-box {
    flex-wrap: wrap;
  }

  .oc-search-box__input {
    flex: 1 1 100%;
    order: 1;
  }

  .oc-search-box__icon {
    order: 0;
  }

  .oc-search-box__button {
    order: 2;
    width: 100%;
    margin-top: 8px;
  }
}
`;
