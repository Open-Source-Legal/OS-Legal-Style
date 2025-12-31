export const pageHeaderStyles = `
/* PageHeader Component */
.oc-page-header {
  padding: var(--oc-spacing-lg) var(--oc-spacing-xl);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Breadcrumbs */
.oc-page-header__breadcrumbs {
  margin-bottom: var(--oc-spacing-sm);
}

.oc-breadcrumbs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--oc-spacing-xs);
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--oc-font-size-sm);
}

.oc-breadcrumbs__item {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
}

.oc-breadcrumbs__separator {
  color: var(--oc-fg-tertiary);
}

.oc-breadcrumbs__link {
  color: var(--oc-fg-secondary);
  text-decoration: none;
  transition: color var(--oc-duration-fast) var(--oc-easing-default);
  padding: 2px 0;
}

.oc-breadcrumbs__link:hover {
  color: var(--oc-accent);
}

.oc-breadcrumbs__current {
  color: var(--oc-fg-primary);
  font-weight: 500;
}

/* Header Row */
.oc-page-header__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--oc-spacing-lg);
}

.oc-page-header__content {
  display: flex;
  align-items: flex-start;
  gap: var(--oc-spacing-md);
  min-width: 0;
  flex: 1;
}

.oc-page-header__back {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-md);
  background: var(--oc-bg-canvas);
  color: var(--oc-fg-secondary);
  cursor: pointer;
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  margin-top: 2px;
}

.oc-page-header__back:hover {
  background: var(--oc-bg-surface);
  border-color: var(--oc-border-strong);
  color: var(--oc-fg-primary);
}

.oc-page-header__text {
  min-width: 0;
}

.oc-page-header__title {
  margin: 0;
  font-size: var(--oc-font-size-2xl);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
}

.oc-page-header__subtitle {
  margin: var(--oc-spacing-xs) 0 0;
  font-size: var(--oc-font-size-md);
  color: var(--oc-fg-secondary);
  line-height: var(--oc-line-height-normal);
}

.oc-page-header__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
}

/* Tabs */
.oc-page-header__tabs {
  margin-top: var(--oc-spacing-lg);
  border-bottom: 1px solid var(--oc-border-default);
}

/* Compact variant */
.oc-page-header--compact {
  padding: var(--oc-spacing-md) var(--oc-spacing-lg);
}

.oc-page-header--compact .oc-page-header__title {
  font-size: var(--oc-font-size-xl);
}

/* Bordered variant */
.oc-page-header--bordered {
  border-bottom: 1px solid var(--oc-border-default);
}

/* With accent bar */
.oc-page-header--accent {
  position: relative;
}

.oc-page-header--accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--oc-accent);
}
`;
