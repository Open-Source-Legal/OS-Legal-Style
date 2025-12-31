export const filterPanelStyles = `
  .oc-filter-panel {
    width: 320px;
    max-height: 520px;
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-lg, 12px);
    box-shadow: var(--oc-shadow-lg, 0 8px 16px rgba(15, 23, 42, 0.06));
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .oc-filter-panel__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    flex-shrink: 0;
  }

  .oc-filter-panel__title {
    font-size: 15px;
    font-weight: 600;
    color: var(--oc-fg-primary, #1E293B);
    margin: 0;
  }

  .oc-filter-panel__clear {
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-accent, #0F766E);
    background: none;
    border: none;
    padding: 4px 8px;
    margin: -4px -8px;
    border-radius: var(--oc-radius-sm, 6px);
    cursor: pointer;
    transition: background 0.15s;
  }

  .oc-filter-panel__clear:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  .oc-filter-panel__clear:disabled {
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: not-allowed;
  }

  .oc-filter-panel__clear:disabled:hover {
    background: transparent;
  }

  .oc-filter-panel__body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  .oc-filter-panel__section {
    padding: 8px 20px;
  }

  .oc-filter-panel__section:not(:last-child) {
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
    padding-bottom: 16px;
    margin-bottom: 8px;
  }

  .oc-filter-panel__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .oc-filter-panel__section-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--oc-fg-tertiary, #94A3B8);
    margin: 0;
  }

  .oc-filter-panel__section-count {
    font-size: 11px;
    font-weight: 600;
    color: var(--oc-accent, #0F766E);
    background: rgba(15, 118, 110, 0.1);
    padding: 2px 6px;
    border-radius: var(--oc-radius-full, 9999px);
  }

  /* Section search input */
  .oc-filter-panel__search {
    position: relative;
    margin-bottom: 12px;
  }

  .oc-filter-panel__search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--oc-fg-tertiary, #94A3B8);
    display: flex;
    align-items: center;
  }

  .oc-filter-panel__search-input {
    width: 100%;
    padding: 8px 32px 8px 32px;
    font-size: 13px;
    color: var(--oc-fg-primary, #1E293B);
    background: var(--oc-bg-canvas, #FAFAFA);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .oc-filter-panel__search-input:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
    background: var(--oc-bg-surface, white);
  }

  .oc-filter-panel__search-input::placeholder {
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-filter-panel__search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--oc-bg-surface-hover, #F1F5F9);
    border: none;
    border-radius: 50%;
    color: var(--oc-fg-tertiary, #94A3B8);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    padding: 0;
  }

  .oc-filter-panel__search-clear:hover {
    background: var(--oc-border-default, #E2E8F0);
    color: var(--oc-fg-secondary, #475569);
  }

  /* Options list */
  .oc-filter-panel__options {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 240px;
    overflow-y: auto;
  }

  .oc-filter-panel__option {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 12px;
    margin: 0 -12px;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: background 0.1s;
  }

  .oc-filter-panel__option:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  /* Checkbox styles */
  .oc-filter-panel__checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 2px solid var(--oc-border-strong, #CBD5E1);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.15s;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .oc-filter-panel__checkbox--checked {
    border-color: var(--oc-accent, #0F766E);
    background: var(--oc-accent, #0F766E);
  }

  /* Radio styles */
  .oc-filter-panel__radio {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--oc-border-strong, #CBD5E1);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .oc-filter-panel__radio--checked {
    border-color: var(--oc-accent, #0F766E);
  }

  .oc-filter-panel__radio-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--oc-accent, #0F766E);
  }

  /* Option content */
  .oc-filter-panel__option-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .oc-filter-panel__option-label {
    font-size: 14px;
    color: var(--oc-fg-primary, #1E293B);
    line-height: 1.3;
  }

  .oc-filter-panel__option-description {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    line-height: 1.3;
  }

  .oc-filter-panel__option-count {
    font-size: 12px;
    color: var(--oc-fg-tertiary, #94A3B8);
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Loading state */
  .oc-filter-panel__loading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-filter-panel__spinner {
    animation: oc-filter-spin 0.8s linear infinite;
  }

  @keyframes oc-filter-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Empty state */
  .oc-filter-panel__empty {
    padding: 12px;
    font-size: 13px;
    color: var(--oc-fg-tertiary, #94A3B8);
    text-align: center;
    font-style: italic;
  }

  /* Show more button */
  .oc-filter-panel__show-more {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    margin: 4px -12px 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-md, 8px);
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-accent, #0F766E);
    cursor: pointer;
    transition: background 0.15s;
  }

  .oc-filter-panel__show-more:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  .oc-filter-panel__show-more svg {
    transition: transform 0.2s;
  }

  /* Date inputs */
  .oc-filter-panel__date-inputs {
    display: flex;
    gap: 12px;
  }

  .oc-filter-panel__date-field {
    flex: 1;
  }

  .oc-filter-panel__date-label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    margin-bottom: 6px;
  }

  .oc-filter-panel__date-input {
    width: 100%;
    padding: 8px 12px;
    font-size: 13px;
    color: var(--oc-fg-primary, #1E293B);
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-md, 8px);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .oc-filter-panel__date-input:focus {
    border-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
  }

  /* Footer */
  .oc-filter-panel__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
    background: var(--oc-bg-canvas, #FAFAFA);
    flex-shrink: 0;
  }

  .oc-filter-panel__footer-spacer {
    flex: 1;
  }

  .oc-filter-panel__active-count {
    font-size: 13px;
    color: var(--oc-fg-secondary, #475569);
  }

  .oc-filter-panel__active-count strong {
    color: var(--oc-accent, #0F766E);
    font-weight: 600;
  }

  /* Buttons */
  .oc-filter-panel__btn {
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    border-radius: var(--oc-radius-md, 8px);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .oc-filter-panel__btn--secondary {
    color: var(--oc-fg-secondary, #475569);
    background: transparent;
    border: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .oc-filter-panel__btn--secondary:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    border-color: var(--oc-border-strong, #CBD5E1);
  }

  .oc-filter-panel__btn--primary {
    color: white;
    background: var(--oc-accent, #0F766E);
    border: none;
  }

  .oc-filter-panel__btn--primary:hover {
    background: var(--oc-accent-hover, #0D9488);
  }

  /* Quick filter chips */
  .oc-filter-panel__quick-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 20px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .oc-filter-panel__quick-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    color: var(--oc-fg-secondary, #475569);
    background: var(--oc-bg-surface, white);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: var(--oc-radius-full, 9999px);
    cursor: pointer;
    transition: all 0.15s;
  }

  .oc-filter-panel__quick-chip:hover {
    border-color: var(--oc-border-strong, #CBD5E1);
    background: var(--oc-bg-surface-hover, #F1F5F9);
  }

  .oc-filter-panel__quick-chip--active {
    color: var(--oc-accent, #0F766E);
    background: rgba(15, 118, 110, 0.08);
    border-color: var(--oc-accent, #0F766E);
  }

  .oc-filter-panel__quick-chip-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    margin-right: -4px;
    border-radius: 50%;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    opacity: 0.6;
    transition: opacity 0.15s;
  }

  .oc-filter-panel__quick-chip-remove:hover {
    opacity: 1;
  }
`;
