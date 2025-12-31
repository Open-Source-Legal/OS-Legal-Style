export const skeletonStyles = `
/* Skeleton base */
.oc-skeleton {
  background: var(--oc-bg-surface);
  display: block;
}

/* Variants */
.oc-skeleton--text {
  height: 1em;
  border-radius: var(--oc-radius-sm);
  transform-origin: 0 55%;
  transform: scale(1, 0.8);
}

.oc-skeleton--circular {
  border-radius: var(--oc-radius-full);
}

.oc-skeleton--rectangular {
  border-radius: 0;
}

.oc-skeleton--rounded {
  border-radius: var(--oc-radius-md);
}

/* Animations */
.oc-skeleton--pulse {
  animation: oc-skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes oc-skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.oc-skeleton--wave {
  position: relative;
  overflow: hidden;
}

.oc-skeleton--wave::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  animation: oc-skeleton-wave 1.5s linear infinite;
}

@keyframes oc-skeleton-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Skeleton text */
.oc-skeleton-text {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
}

/* Document card skeleton */
.oc-skeleton-document-card {
  background: var(--oc-bg-canvas);
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-lg);
  overflow: hidden;
  width: 200px;
}

.oc-skeleton-document-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
  padding: var(--oc-spacing-sm);
}

/* Table row skeleton */
.oc-skeleton-table-row {
  display: flex;
  align-items: center;
  gap: var(--oc-spacing-md);
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
  border-bottom: 1px solid var(--oc-border-default);
}

.oc-skeleton-table-row > .oc-skeleton {
  flex: 1;
}

/* Chat message skeleton */
.oc-skeleton-chat-message {
  display: flex;
  align-items: flex-start;
  gap: var(--oc-spacing-sm);
}

.oc-skeleton-chat-message__content {
  display: flex;
  flex-direction: column;
  gap: var(--oc-spacing-xs);
  flex: 1;
}
`;
