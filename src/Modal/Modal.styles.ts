export const modalStyles = `
/* Modal Overlay */
.oc-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--oc-spacing-md);
  z-index: var(--oc-z-modal);
  animation: oc-fade-in var(--oc-duration-fast) var(--oc-easing-enter);
}

/* Modal */
.oc-modal {
  background: var(--oc-bg-canvas);
  border-radius: var(--oc-radius-lg);
  box-shadow: var(--oc-shadow-xl);
  max-height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  animation: oc-fade-in var(--oc-duration-normal) var(--oc-easing-spring);
}

/* Modal Sizes */
.oc-modal--sm { width: 100%; max-width: 400px; }
.oc-modal--md { width: 100%; max-width: 500px; }
.oc-modal--lg { width: 100%; max-width: 640px; }
.oc-modal--xl { width: 100%; max-width: 800px; }
.oc-modal--full { width: 100%; max-width: calc(100vw - 32px); height: calc(100vh - 32px); }

/* Modal Header */
.oc-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--oc-spacing-md);
  padding: var(--oc-spacing-lg);
  padding-bottom: 0;
}

.oc-modal-header__content {
  flex: 1;
  min-width: 0;
}

.oc-modal-header__title {
  font-size: var(--oc-font-size-xl);
  font-weight: 600;
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-tight);
  letter-spacing: -0.01em;
}

.oc-modal-header__subtitle {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-secondary);
  margin-top: var(--oc-spacing-xs);
  line-height: var(--oc-line-height-normal);
}

/* Close Button */
.oc-modal-close {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--oc-radius-md);
  background: transparent;
  color: var(--oc-fg-secondary);
  cursor: pointer;
  transition: background var(--oc-duration-fast) var(--oc-easing-default),
              color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-modal-close:hover {
  background: var(--oc-bg-surface-hover);
  color: var(--oc-fg-primary);
}

/* Modal Body */
.oc-modal-body {
  flex: 1;
  padding: var(--oc-spacing-lg);
  overflow-y: auto;
  color: var(--oc-fg-primary);
  font-size: var(--oc-font-size-md);
  line-height: var(--oc-line-height-relaxed);
}

/* Modal Footer */
.oc-modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--oc-spacing-sm);
  padding: var(--oc-spacing-lg);
  padding-top: 0;
}
`;
