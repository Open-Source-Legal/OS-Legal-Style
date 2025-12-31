export const alertStyles = `
/* Alert */
.oc-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
  border-radius: var(--oc-radius-md);
  border: 1px solid;
}

.oc-alert--info {
  background: rgba(8, 145, 178, 0.06);
  border-color: rgba(8, 145, 178, 0.2);
}

.oc-alert--success {
  background: var(--oc-success-bg);
  border-color: rgba(5, 150, 105, 0.2);
}

.oc-alert--warning {
  background: var(--oc-warning-bg);
  border-color: rgba(217, 119, 6, 0.2);
}

.oc-alert--error {
  background: var(--oc-error-bg);
  border-color: rgba(220, 38, 38, 0.2);
}

.oc-alert__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
}

.oc-alert--info .oc-alert__icon {
  color: var(--oc-accent);
}

.oc-alert--success .oc-alert__icon {
  color: var(--oc-success);
}

.oc-alert--warning .oc-alert__icon {
  color: var(--oc-warning);
}

.oc-alert--error .oc-alert__icon {
  color: var(--oc-error);
}

.oc-alert__content {
  flex: 1;
  min-width: 0;
}

.oc-alert__title {
  font-size: var(--oc-font-size-sm);
  font-weight: 600;
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

.oc-alert__description {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-secondary);
  line-height: var(--oc-line-height-tight);
}

.oc-alert__title + .oc-alert__description {
  margin-top: 2px;
}

.oc-alert__action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.oc-alert__dismiss {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--oc-fg-tertiary);
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-alert__dismiss:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--oc-fg-primary);
}

/* Banner */
.oc-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
  width: 100%;
}

.oc-banner--info {
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
}

.oc-banner--success {
  background: var(--oc-success);
  color: var(--oc-fg-inverse);
}

.oc-banner--warning {
  background: var(--oc-warning);
  color: var(--oc-fg-inverse);
}

.oc-banner--error {
  background: var(--oc-error);
  color: var(--oc-fg-inverse);
}

.oc-banner__content {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  flex: 1;
  justify-content: center;
}

.oc-banner__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-banner__text {
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
}

.oc-banner__action {
  display: flex;
  align-items: center;
}

.oc-banner__action button,
.oc-banner__action a {
  color: inherit;
  text-decoration: underline;
  font-weight: 600;
}

.oc-banner__dismiss {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: var(--oc-radius-sm);
  opacity: 0.8;
  transition: opacity var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-banner__dismiss:hover {
  opacity: 1;
}
`;
