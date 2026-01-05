export const nodeStyles = `
  .oc-node {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .oc-node__circle {
    border-radius: var(--oc-radius-full, 9999px);
    background-color: var(--oc-accent, #0F766E);
    transition:
      transform var(--oc-transition-fast, 0.15s) ease,
      background-color var(--oc-transition-fast, 0.15s) ease,
      box-shadow var(--oc-transition-fast, 0.15s) ease;
  }

  /* Sizes */
  .oc-node--xs .oc-node__circle {
    width: 6px;
    height: 6px;
  }

  .oc-node--sm .oc-node__circle {
    width: 8px;
    height: 8px;
  }

  .oc-node--md .oc-node__circle {
    width: 12px;
    height: 12px;
  }

  .oc-node--lg .oc-node__circle {
    width: 16px;
    height: 16px;
  }

  /* Variants */
  .oc-node--default .oc-node__circle {
    background-color: var(--oc-accent, #0F766E);
  }

  .oc-node--active .oc-node__circle {
    background-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 3px var(--oc-accent-light, rgba(15, 118, 110, 0.2));
  }

  .oc-node--muted .oc-node__circle {
    background-color: var(--oc-fg-tertiary, #94A3B8);
  }

  .oc-node--connected .oc-node__circle {
    background-color: var(--oc-accent, #0F766E);
    box-shadow: 0 0 0 2px var(--oc-bg-surface, #FFFFFF),
                0 0 0 4px var(--oc-accent, #0F766E);
  }

  /* Interactive state */
  .oc-node--interactive {
    cursor: pointer;
  }

  .oc-node--interactive:hover .oc-node__circle {
    transform: scale(1.2);
    background-color: var(--oc-accent-hover, #0D9488);
  }

  .oc-node--interactive:active .oc-node__circle {
    transform: scale(1.1);
  }

  /* Pulse animation */
  .oc-node--pulse .oc-node__circle {
    animation: oc-node-pulse 2s ease-in-out infinite;
  }

  @keyframes oc-node-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 var(--oc-accent-light, rgba(15, 118, 110, 0.4));
    }
    50% {
      box-shadow: 0 0 0 6px var(--oc-accent-light, rgba(15, 118, 110, 0));
    }
  }

  /* Count badge */
  .oc-node__count {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    margin-left: 4px;
    font-size: var(--oc-font-size-xs, 11px);
    font-weight: 500;
    color: var(--oc-fg-tertiary, #94A3B8);
    white-space: nowrap;
    line-height: 1;
  }

  .oc-node--active .oc-node__count,
  .oc-node--interactive:hover .oc-node__count {
    color: var(--oc-accent, #0F766E);
  }
`;
