export const relationshipPillStyles = `
  .oc-relationship-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 8px 12px;
    margin: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    cursor: pointer;
    text-align: left;
    transition:
      background-color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-pill:hover {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.06));
  }

  .oc-relationship-pill:focus-visible {
    outline: 2px solid var(--oc-accent, #0F766E);
    outline-offset: -2px;
  }

  .oc-relationship-pill--active {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.08));
  }

  .oc-relationship-pill--disabled {
    cursor: default;
    opacity: 0.5;
  }

  .oc-relationship-pill--disabled:hover {
    background-color: transparent;
  }

  /* Connector */
  .oc-relationship-pill__connector {
    width: 8px;
    height: 1px;
    background-color: var(--oc-border-default, #E2E8F0);
    flex-shrink: 0;
  }

  .oc-relationship-pill:hover .oc-relationship-pill__connector,
  .oc-relationship-pill--active .oc-relationship-pill__connector {
    background-color: var(--oc-accent, #0F766E);
  }

  /* Icon */
  .oc-relationship-pill__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-relationship-pill__icon svg {
    width: 14px;
    height: 14px;
  }

  /* Title */
  .oc-relationship-pill__title {
    flex: 1;
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-sm, 14px);
    font-weight: 450;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .oc-relationship-pill:hover .oc-relationship-pill__title {
    color: var(--oc-accent, #0F766E);
  }

  /* Type label */
  .oc-relationship-pill__type {
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    color: var(--oc-fg-tertiary, #94A3B8);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Direction indicators */
  .oc-relationship-pill--incoming .oc-relationship-pill__type::before {
    content: '← ';
    opacity: 0.6;
  }

  .oc-relationship-pill--outgoing .oc-relationship-pill__type::after {
    content: ' →';
    opacity: 0.6;
  }

  /* AI source badge */
  .oc-relationship-pill__source-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 4px;
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--oc-fg-tertiary, #94A3B8);
    background-color: var(--oc-bg-canvas, #F8FAFC);
    border: 1px solid var(--oc-border-default, #E2E8F0);
    border-radius: 3px;
    flex-shrink: 0;
  }

  .oc-relationship-pill--source-analyzer .oc-relationship-pill__source-badge {
    color: var(--oc-accent, #0F766E);
    background-color: var(--oc-accent-light, rgba(15, 118, 110, 0.08));
    border-color: var(--oc-accent-light, rgba(15, 118, 110, 0.2));
  }
`;
