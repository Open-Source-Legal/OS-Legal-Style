export const cardStyles = `
/* Card Component */
.oc-card {
  background: var(--oc-bg-canvas);
  border-radius: var(--oc-radius-lg);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Variants */
.oc-card--elevated {
  box-shadow: var(--oc-shadow-md);
}

.oc-card--flat {
  box-shadow: none;
}

.oc-card--outlined {
  box-shadow: none;
  border: 1px solid var(--oc-border-default);
}

/* Padding */
.oc-card--padding-none {
  padding: 0;
}

.oc-card--padding-sm {
  padding: var(--oc-spacing-sm);
}

.oc-card--padding-md {
  padding: var(--oc-spacing-md);
}

.oc-card--padding-lg {
  padding: var(--oc-spacing-lg);
}

/* Interactive */
.oc-card--interactive {
  cursor: pointer;
  transition: box-shadow var(--oc-duration-fast) var(--oc-easing-default),
              transform var(--oc-duration-fast) var(--oc-easing-default),
              border-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-card--interactive:hover {
  box-shadow: var(--oc-shadow-lg);
  transform: translateY(-2px);
}

.oc-card--interactive.oc-card--outlined:hover {
  border-color: var(--oc-border-strong);
}

.oc-card--interactive:active {
  transform: translateY(0);
  box-shadow: var(--oc-shadow-sm);
}

/* Card Header */
.oc-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--oc-spacing-md);
  margin-bottom: var(--oc-spacing-md);
}

.oc-card-header__content {
  flex: 1;
  min-width: 0;
}

.oc-card-header__title {
  font-size: var(--oc-font-size-lg);
  font-weight: 600;
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
  letter-spacing: -0.01em;
}

.oc-card-header__subtitle {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-secondary);
  margin-top: var(--oc-spacing-xs);
  line-height: var(--oc-line-height-normal);
}

.oc-card-header__action {
  flex-shrink: 0;
}

/* Card Body */
.oc-card-body {
  color: var(--oc-fg-primary);
  font-size: var(--oc-font-size-md);
  line-height: var(--oc-line-height-relaxed);
}

/* Card Footer */
.oc-card-footer {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  margin-top: var(--oc-spacing-md);
  padding-top: var(--oc-spacing-md);
  border-top: 1px solid var(--oc-border-default);
}
`;
