export const relationshipPopoverStyles = `
  .oc-relationship-popover {
    min-width: 280px;
    max-width: 360px;
    background: var(--oc-bg-surface, #FFFFFF);
    border-radius: var(--oc-radius-lg, 12px);
    box-shadow: var(--oc-shadow-lg, 0 4px 24px rgba(0, 0, 0, 0.12));
    overflow: hidden;
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
  }

  /* Header */
  .oc-relationship-popover__header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  }

  .oc-relationship-popover__title {
    font-size: var(--oc-font-size-sm, 13px);
    font-weight: 500;
    color: var(--oc-fg-primary, #1E293B);
  }

  /* List */
  .oc-relationship-popover__list {
    padding: 4px;
    overflow-y: auto;
  }

  /* Scrollbar styling */
  .oc-relationship-popover__list::-webkit-scrollbar {
    width: 6px;
  }

  .oc-relationship-popover__list::-webkit-scrollbar-track {
    background: transparent;
  }

  .oc-relationship-popover__list::-webkit-scrollbar-thumb {
    background-color: var(--oc-border-default, #E2E8F0);
    border-radius: 3px;
  }

  .oc-relationship-popover__list::-webkit-scrollbar-thumb:hover {
    background-color: var(--oc-fg-tertiary, #94A3B8);
  }

  /* Item */
  .oc-relationship-popover__item {
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
    transition: background-color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-popover__item:hover {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.06));
  }

  .oc-relationship-popover__item:focus-visible {
    outline: 2px solid var(--oc-accent, #0F766E);
    outline-offset: -2px;
  }

  /* Node indicator */
  .oc-relationship-popover__node {
    width: 6px;
    height: 6px;
    border-radius: var(--oc-radius-full, 9999px);
    background-color: var(--oc-accent, #0F766E);
    flex-shrink: 0;
  }

  /* Connector */
  .oc-relationship-popover__connector {
    width: 8px;
    height: 1px;
    background-color: var(--oc-border-default, #E2E8F0);
    flex-shrink: 0;
  }

  .oc-relationship-popover__item:hover .oc-relationship-popover__connector {
    background-color: var(--oc-accent, #0F766E);
  }

  /* Icon */
  .oc-relationship-popover__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-relationship-popover__icon svg {
    width: 14px;
    height: 14px;
  }

  /* Document title */
  .oc-relationship-popover__doc-title {
    flex: 1;
    font-size: var(--oc-font-size-sm, 14px);
    font-weight: 450;
    color: var(--oc-fg-primary, #1E293B);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .oc-relationship-popover__item:hover .oc-relationship-popover__doc-title {
    color: var(--oc-accent, #0F766E);
  }

  /* Relationship type */
  .oc-relationship-popover__rel-type {
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    color: var(--oc-fg-tertiary, #94A3B8);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* AI badge */
  .oc-relationship-popover__ai-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1px 4px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--oc-accent, #0F766E);
    background-color: var(--oc-accent-light, rgba(15, 118, 110, 0.08));
    border: 1px solid var(--oc-accent-light, rgba(15, 118, 110, 0.2));
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* Footer */
  .oc-relationship-popover__footer {
    padding: 8px;
    border-top: 1px solid var(--oc-border-default, #E2E8F0);
    background-color: var(--oc-bg-canvas, #F8FAFC);
  }

  .oc-relationship-popover__graph-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 8px 12px;
    margin: 0;
    background: transparent;
    border: none;
    border-radius: var(--oc-radius-sm, 6px);
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: var(--oc-font-size-sm, 13px);
    font-weight: 500;
    color: var(--oc-accent, #0F766E);
    cursor: pointer;
    transition:
      background-color var(--oc-transition-fast, 0.15s) ease,
      color var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-popover__graph-link:hover {
    background-color: var(--oc-bg-surface-hover, rgba(15, 118, 110, 0.08));
    color: var(--oc-accent-hover, #0D9488);
  }

  .oc-relationship-popover__graph-link:focus-visible {
    outline: 2px solid var(--oc-accent, #0F766E);
    outline-offset: -2px;
  }

  .oc-relationship-popover__graph-link svg {
    transition: transform var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-relationship-popover__graph-link:hover svg {
    transform: translateX(2px);
  }
`;
