export const relationshipBadgeStyles = `
  .oc-relationship-badge {
    display: inline-flex;
    align-items: center;
    gap: 0;
    padding: 2px 4px 2px 2px;
    margin: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    cursor: pointer;
    transition:
      background-color var(--oc-transition-fast, 0.15s) ease,
      opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-badge:hover {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.08));
  }

  .oc-relationship-badge:focus-visible {
    outline: 2px solid var(--oc-accent, #0F766E);
    outline-offset: 1px;
  }

  .oc-relationship-badge--disabled {
    cursor: default;
    opacity: 0.5;
  }

  .oc-relationship-badge--disabled:hover {
    background-color: transparent;
  }

  /* Connector line */
  .oc-relationship-badge__connector {
    width: 6px;
    height: 1px;
    background-color: var(--oc-fg-tertiary, #94A3B8);
    transition: background-color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-badge:hover .oc-relationship-badge__connector,
  .oc-relationship-badge--active .oc-relationship-badge__connector {
    background-color: var(--oc-accent, #0F766E);
  }

  /* Count */
  .oc-relationship-badge__count {
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: var(--oc-fg-tertiary, #94A3B8);
    line-height: 1;
    transition: color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-badge:hover .oc-relationship-badge__count,
  .oc-relationship-badge--active .oc-relationship-badge__count {
    color: var(--oc-accent, #0F766E);
  }

  /* Size: sm */
  .oc-relationship-badge--sm {
    gap: 0;
  }

  .oc-relationship-badge--sm .oc-relationship-badge__connector {
    width: 5px;
  }

  .oc-relationship-badge--sm .oc-relationship-badge__count {
    font-size: 10px;
  }

  /* Size: md */
  .oc-relationship-badge--md {
    padding: 3px 6px 3px 3px;
  }

  .oc-relationship-badge--md .oc-relationship-badge__connector {
    width: 8px;
  }

  .oc-relationship-badge--md .oc-relationship-badge__count {
    font-size: var(--oc-font-size-xs, 11px);
  }
`;
