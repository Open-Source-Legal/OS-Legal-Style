export const tooltipStyles = `
/* Tooltip Trigger */
.oc-tooltip-trigger {
  display: inline-flex;
}

/* Tooltip */
.oc-tooltip {
  position: absolute;
  z-index: var(--oc-z-tooltip);
  padding: var(--oc-spacing-xs) var(--oc-spacing-sm);
  background: var(--oc-bg-sidebar);
  color: var(--oc-fg-inverse);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: var(--oc-font-size-xs);
  border-radius: var(--oc-radius-md);
  white-space: nowrap;
  pointer-events: none;
  animation: oc-fade-in var(--oc-duration-fast) var(--oc-easing-enter);
}

/* Placement */
.oc-tooltip--top {
  transform: translateX(-50%) translateY(-100%);
}

.oc-tooltip--bottom {
  transform: translateX(-50%);
}

.oc-tooltip--left {
  transform: translateX(-100%) translateY(-50%);
}

.oc-tooltip--right {
  transform: translateY(-50%);
}
`;
