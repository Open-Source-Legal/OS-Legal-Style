export const avatarStyles = `
/* Avatar Component */
.oc-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #E5E5E5 0%, #D4D4D4 100%);
  color: var(--oc-fg-secondary, #6B6B6B);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
}

.oc-avatar--square {
  border-radius: var(--oc-radius-md, 8px);
}

/* Sizes */
.oc-avatar--xs { font-size: 10px; }
.oc-avatar--sm { font-size: 12px; }
.oc-avatar--md { font-size: 14px; }
.oc-avatar--lg { font-size: 16px; }
.oc-avatar--xl { font-size: 20px; }

/* Accent variant (for AI/system) */
.oc-avatar--accent {
  background: var(--oc-accent);
  color: white;
  box-shadow: 0 2px 8px rgba(8, 145, 178, 0.3);
}

/* Image */
.oc-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fallback */
.oc-avatar__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Status indicator */
.oc-avatar__status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 25%;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  border: 2px solid white;
  box-sizing: content-box;
}

.oc-avatar__status--online {
  background: var(--oc-success, #10B981);
}

.oc-avatar__status--offline {
  background: var(--oc-fg-tertiary, #9B9B9B);
}

.oc-avatar__status--busy {
  background: var(--oc-error, #EF4444);
}

.oc-avatar__status--away {
  background: var(--oc-warning, #F59E0B);
}

/* AI Avatar */
.oc-avatar--ai {
  background: var(--oc-accent);
  animation: oc-avatar-ai-pulse 3s ease-in-out infinite;
}

@keyframes oc-avatar-ai-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(8, 145, 178, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(8, 145, 178, 0);
  }
}

.oc-avatar__ai-icon {
  width: 60%;
  height: 60%;
}

/* Avatar Group */
.oc-avatar-group {
  display: inline-flex;
  align-items: center;
}

.oc-avatar-group__item {
  margin-left: -8px;
}

.oc-avatar-group__item:first-child {
  margin-left: 0;
}

.oc-avatar-group__item .oc-avatar {
  border: 2px solid white;
  box-sizing: content-box;
}
`;
