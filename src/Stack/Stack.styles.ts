export const stackStyles = `
/* Stack Component */
.oc-stack {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Spacer */
.oc-spacer {
  flex: 1;
}

/* Divider */
.oc-divider {
  flex-shrink: 0;
  background: var(--oc-border-default, #E5E5E5);
}

.oc-divider--horizontal {
  height: 1px;
  width: 100%;
}

.oc-divider--vertical {
  width: 1px;
  align-self: stretch;
}

/* Box - generic container with padding */
.oc-box {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.oc-box--padding-none { padding: 0; }
.oc-box--padding-xs { padding: var(--oc-spacing-xs, 4px); }
.oc-box--padding-sm { padding: var(--oc-spacing-sm, 8px); }
.oc-box--padding-md { padding: var(--oc-spacing-md, 16px); }
.oc-box--padding-lg { padding: var(--oc-spacing-lg, 24px); }
.oc-box--padding-xl { padding: var(--oc-spacing-xl, 32px); }

/* Center - center content both ways */
.oc-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Container - max-width constrained container */
.oc-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--oc-spacing-md, 16px);
  padding-right: var(--oc-spacing-md, 16px);
}

.oc-container--sm { max-width: 640px; }
.oc-container--md { max-width: 768px; }
.oc-container--lg { max-width: 1024px; }
.oc-container--xl { max-width: 1280px; }
.oc-container--full { max-width: 100%; }
`;
