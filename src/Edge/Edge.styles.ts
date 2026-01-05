export const edgeStyles = `
  .oc-edge {
    pointer-events: visibleStroke;
  }

  .oc-edge__line {
    fill: none;
    stroke: var(--oc-border-default, #E2E8F0);
    stroke-width: 1.5;
    stroke-linecap: round;
    transition:
      stroke var(--oc-transition-fast, 0.15s) ease,
      stroke-width var(--oc-transition-fast, 0.15s) ease,
      opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-edge__arrow {
    fill: var(--oc-border-default, #E2E8F0);
    transition: fill var(--oc-transition-fast, 0.15s) ease;
  }

  /* Variants */
  .oc-edge--solid .oc-edge__line {
    stroke-dasharray: none;
  }

  .oc-edge--dashed .oc-edge__line {
    stroke-dasharray: 6 4;
  }

  .oc-edge--dotted .oc-edge__line {
    stroke-dasharray: 2 3;
  }

  /* States */
  .oc-edge--active .oc-edge__line {
    stroke: var(--oc-accent, #0F766E);
    stroke-width: 2;
  }

  .oc-edge--active .oc-edge__arrow {
    fill: var(--oc-accent, #0F766E);
  }

  .oc-edge--muted .oc-edge__line {
    stroke: var(--oc-border-default, #E2E8F0);
    opacity: 0.5;
  }

  .oc-edge--muted .oc-edge__arrow {
    fill: var(--oc-border-default, #E2E8F0);
    opacity: 0.5;
  }

  /* Hover state */
  .oc-edge:hover .oc-edge__line {
    stroke: var(--oc-accent, #0F766E);
    stroke-width: 2;
  }

  .oc-edge:hover .oc-edge__arrow {
    fill: var(--oc-accent, #0F766E);
  }

  /* Animation */
  .oc-edge--animated .oc-edge__line {
    stroke-dasharray: 8 4;
    animation: oc-edge-flow 1s linear infinite;
  }

  @keyframes oc-edge-flow {
    from {
      stroke-dashoffset: 0;
    }
    to {
      stroke-dashoffset: -12;
    }
  }

  /* Label */
  .oc-edge__label-group {
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--oc-transition-fast, 0.15s) ease;
  }

  .oc-edge:hover .oc-edge__label-group,
  .oc-edge--active .oc-edge__label-group {
    opacity: 1;
  }

  .oc-edge__label-bg {
    fill: var(--oc-bg-surface, #FFFFFF);
    stroke: var(--oc-border-default, #E2E8F0);
    stroke-width: 1;
  }

  .oc-edge--active .oc-edge__label-bg {
    stroke: var(--oc-accent, #0F766E);
  }

  .oc-edge__label {
    font-family: var(--oc-font-family, 'Inter', system-ui, sans-serif);
    font-size: 10px;
    font-weight: 500;
    fill: var(--oc-fg-secondary, #475569);
  }

  .oc-edge--active .oc-edge__label {
    fill: var(--oc-accent, #0F766E);
  }
`;
