export const appShellStyles = `
/* AppShell - Main Application Container */
.oc-app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: var(--oc-bg-canvas);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.oc-app-shell--fixed {
  height: 100vh;
  overflow: hidden;
}

/* AppShell Sidebar */
.oc-app-shell-sidebar {
  --sidebar-width: 260px;
  position: relative;
  width: var(--sidebar-width);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--oc-bg-surface);
  transition: width var(--oc-duration-normal) var(--oc-easing-default),
              margin var(--oc-duration-normal) var(--oc-easing-default);
  overflow: hidden;
}

.oc-app-shell-sidebar--bordered {
  border-right: 1px solid var(--oc-border-default);
}

.oc-app-shell-sidebar--closed {
  width: 0;
  margin-left: calc(var(--sidebar-width) * -1);
}

.oc-app-shell-sidebar__content {
  width: var(--sidebar-width);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* AppShell Main */
.oc-app-shell-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: var(--oc-bg-canvas);
}

/* AppShell Header */
.oc-app-shell-header {
  --header-height: 56px;
  height: var(--header-height);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-md);
  padding: 0 var(--oc-spacing-lg);
  background: var(--oc-bg-canvas);
}

.oc-app-shell-header--bordered {
  border-bottom: 1px solid var(--oc-border-default);
}

.oc-app-shell-header--fixed {
  position: sticky;
  top: 0;
  z-index: var(--oc-z-sticky);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.9);
}

/* Layout composition helpers */
.oc-app-shell > .oc-app-shell-header {
  order: -1;
}

/* Horizontal layout for sidebar + main */
.oc-app-shell:has(.oc-app-shell-sidebar) {
  flex-direction: row;
  flex-wrap: wrap;
}

.oc-app-shell:has(.oc-app-shell-sidebar) > .oc-app-shell-header {
  width: 100%;
  flex-basis: 100%;
}

/* Dark sidebar variant */
.oc-app-shell-sidebar--dark {
  background: var(--oc-bg-sidebar);
  color: var(--oc-fg-inverse);
  border-right-color: rgba(255, 255, 255, 0.1);
}
`;
