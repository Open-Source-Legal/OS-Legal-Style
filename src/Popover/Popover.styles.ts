export const popoverStyles = `
/* Popover Trigger */
.oc-popover-trigger {
  display: inline-flex;
}

/* Popover */
.oc-popover {
  position: absolute;
  z-index: var(--oc-z-popover, 1000);
  min-width: 200px;
  padding: var(--oc-spacing-md);
  background: var(--oc-bg-canvas, #FFFFFF);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  box-shadow: var(--oc-shadow-lg, 0 4px 12px rgba(0, 0, 0, 0.1));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  animation: oc-popover-fade-in 0.15s ease-out;
}

@keyframes oc-popover-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
