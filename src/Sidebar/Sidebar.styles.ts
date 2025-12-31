export const sidebarStyles = `
/* Sidebar Component */
.oc-sidebar {
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100%;
  background: var(--oc-bg-surface);
  color: var(--oc-fg-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: width var(--oc-duration-normal) var(--oc-easing-default);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.oc-sidebar--collapsed {
  width: 64px;
}

/* Sidebar Header */
.oc-sidebar-header {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-md);
  min-height: 56px;
  border-bottom: 1px solid var(--oc-border-default);
}

.oc-sidebar-header__logo {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--oc-accent);
  border-radius: var(--oc-radius-md);
  color: var(--oc-fg-inverse);
}

.oc-sidebar-header__title {
  font-size: var(--oc-font-size-md);
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--oc-fg-primary);
}

/* Sidebar Nav */
.oc-sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--oc-spacing-sm);
}

/* Sidebar Section */
.oc-sidebar-section {
  margin-bottom: var(--oc-spacing-md);
}

.oc-sidebar-section:first-child {
  margin-top: var(--oc-spacing-xs);
}

.oc-sidebar-section__title {
  font-size: var(--oc-font-size-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--oc-fg-tertiary);
  padding: var(--oc-spacing-sm);
  margin-bottom: var(--oc-spacing-xs);
}

.oc-sidebar-section__items {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Sidebar Item */
.oc-sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-sm);
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: var(--oc-radius-md);
  background: transparent;
  color: var(--oc-fg-secondary);
  font-size: var(--oc-font-size-sm);
  font-weight: 500;
  font-family: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--oc-duration-fast) var(--oc-easing-default);
  position: relative;
}

.oc-sidebar-item:hover {
  background: var(--oc-bg-surface-hover);
  color: var(--oc-fg-primary);
}

.oc-sidebar-item--active {
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
}

.oc-sidebar-item--active:hover {
  background: var(--oc-accent-hover);
}

.oc-sidebar-item--active .oc-sidebar-item__icon {
  color: var(--oc-fg-inverse);
}

.oc-sidebar-item--disabled {
  opacity: var(--oc-opacity-disabled);
  cursor: not-allowed;
}

.oc-sidebar-item--disabled:hover {
  background: transparent;
  color: var(--oc-fg-secondary);
}

.oc-sidebar-item__icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--oc-fg-tertiary);
  transition: color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-sidebar-item:hover .oc-sidebar-item__icon {
  color: var(--oc-fg-primary);
}

.oc-sidebar-item--active .oc-sidebar-item__icon,
.oc-sidebar-item--active:hover .oc-sidebar-item__icon {
  color: var(--oc-fg-inverse);
}

.oc-sidebar-item__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-sidebar-item__badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--oc-radius-full);
  background: var(--oc-accent);
  color: var(--oc-fg-inverse);
}

.oc-sidebar-item--active .oc-sidebar-item__badge {
  background: rgba(255, 255, 255, 0.2);
}

/* Sidebar Footer */
.oc-sidebar-footer {
  padding: var(--oc-spacing-md);
  border-top: 1px solid var(--oc-border-default);
  margin-top: auto;
}

/* Dark variant */
.oc-sidebar--dark {
  background: var(--oc-bg-sidebar);
  color: var(--oc-fg-inverse);
}

.oc-sidebar--dark .oc-sidebar-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.oc-sidebar--dark .oc-sidebar-header__title {
  color: var(--oc-fg-inverse);
}

.oc-sidebar--dark .oc-sidebar-section__title {
  color: rgba(255, 255, 255, 0.4);
}

.oc-sidebar--dark .oc-sidebar-item {
  color: rgba(255, 255, 255, 0.7);
}

.oc-sidebar--dark .oc-sidebar-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--oc-fg-inverse);
}

.oc-sidebar--dark .oc-sidebar-item__icon {
  color: rgba(255, 255, 255, 0.5);
}

.oc-sidebar--dark .oc-sidebar-item:hover .oc-sidebar-item__icon {
  color: rgba(255, 255, 255, 0.9);
}

.oc-sidebar--dark .oc-sidebar-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}
`;
