export const popoverStyles = `
/* Popover Trigger */
.oc-popover-trigger {
  display: inline-flex;
}

/* Popover */
.oc-popover {
  position: absolute;
  z-index: var(--oc-z-popover);
  min-width: 200px;
  padding: var(--oc-spacing-md);
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-lg);
  box-shadow: var(--oc-shadow-lg);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  animation: oc-fade-in var(--oc-duration-fast) var(--oc-easing-enter);
}

/* Placement */
.oc-popover--top {
  transform: translateX(-50%) translateY(-100%);
}

.oc-popover--bottom {
  transform: translateX(-50%);
}

.oc-popover--left {
  transform: translateX(-100%) translateY(-50%);
}

.oc-popover--right {
  transform: translateY(-50%);
}
`;
