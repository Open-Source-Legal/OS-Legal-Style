export const threadStyles = `
/* ============ Thread View Container ============ */
.oc-thread-view {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--oc-bg-canvas, #FFFFFF);
}

.oc-thread-view__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-thread-view__title {
  flex: 1;
  min-width: 200px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-view__pin,
.oc-thread-view__status,
.oc-thread-view__locked {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--oc-radius-sm, 6px);
}

.oc-thread-view__pin {
  background: rgba(217, 119, 6, 0.1);
  color: var(--oc-warning, #D97706);
}

.oc-thread-view__status--resolved {
  background: rgba(5, 150, 105, 0.1);
  color: var(--oc-success, #059669);
}

.oc-thread-view__status--closed {
  background: rgba(100, 116, 139, 0.1);
  color: var(--oc-fg-secondary, #475569);
}

.oc-thread-view__status--archived {
  background: rgba(100, 116, 139, 0.1);
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-view__locked {
  background: rgba(220, 38, 38, 0.1);
  color: var(--oc-error, #DC2626);
}

.oc-thread-view__content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Pinned thread styling */
.oc-thread-view--pinned {
  border-left: 3px solid var(--oc-warning, #D97706);
}

/* Locked thread */
.oc-thread-view--locked .oc-thread-view__content {
  opacity: 0.85;
}

/* ============ Thread Post (Main Post) ============ */
.oc-thread-post {
  display: flex;
  gap: 14px;
  padding: 20px 0;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  animation: oc-thread-fade-in 0.3s ease;
}

@keyframes oc-thread-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.oc-thread-post--root {
  padding-top: 0;
}

.oc-thread-post--highlighted {
  background: linear-gradient(90deg, rgba(15, 118, 110, 0.05) 0%, transparent 100%);
  margin: 0 -20px;
  padding-left: 20px;
  padding-right: 20px;
  border-left: 3px solid var(--oc-accent, #0F766E);
}

.oc-thread-post__avatar {
  flex-shrink: 0;
}

.oc-thread-post__main {
  flex: 1;
  min-width: 0;
}

.oc-thread-post__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.oc-thread-post__author {
  font-size: 14px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-post__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: rgba(15, 118, 110, 0.1);
  color: var(--oc-accent, #0F766E);
  border-radius: var(--oc-radius-sm, 6px);
}

.oc-thread-post__time {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-post__edited {
  font-size: 12px;
  font-style: italic;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-post__body {
  font-size: 15px;
  line-height: 1.65;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-post__body p {
  margin: 0 0 12px;
}

.oc-thread-post__body p:last-child {
  margin-bottom: 0;
}

.oc-thread-post__resources {
  margin-top: 14px;
}

.oc-thread-post__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
}

.oc-thread-post__reactions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.oc-thread-post__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.oc-thread-post:hover .oc-thread-post__actions {
  opacity: 1;
}

.oc-thread-post__reply-count {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  font-size: 13px;
  color: var(--oc-fg-secondary, #475569);
}

.oc-thread-post__reply-count svg {
  opacity: 0.6;
}

/* ============ Thread Reply (Nested) ============ */
.oc-thread-reply {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 24px;
}

.oc-thread-reply__connector {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  display: flex;
  justify-content: center;
}

.oc-thread-reply__line {
  width: 2px;
  height: 100%;
  background: var(--oc-border-default, #E2E8F0);
  border-radius: 1px;
}

.oc-thread-reply:last-child .oc-thread-reply__line {
  height: 32px;
}

.oc-thread-reply__content {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  animation: oc-thread-fade-in 0.3s ease;
}

.oc-thread-reply--collapsed .oc-thread-reply__content {
  padding: 10px 0;
}

.oc-thread-reply--highlighted .oc-thread-reply__content {
  background: linear-gradient(90deg, rgba(15, 118, 110, 0.05) 0%, transparent 100%);
  margin-left: -12px;
  padding-left: 12px;
  border-radius: var(--oc-radius-md, 8px);
}

.oc-thread-reply__avatar {
  flex-shrink: 0;
}

.oc-thread-reply__main {
  flex: 1;
  min-width: 0;
}

.oc-thread-reply__header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 6px;
}

.oc-thread-reply--collapsed .oc-thread-reply__header {
  margin-bottom: 0;
}

.oc-thread-reply__author {
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-reply__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  background: rgba(15, 118, 110, 0.1);
  color: var(--oc-accent, #0F766E);
  border-radius: var(--oc-radius-sm, 6px);
}

.oc-thread-reply__time {
  font-size: 11px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-reply__edited {
  font-size: 11px;
  font-style: italic;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-reply__body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-reply__body p {
  margin: 0 0 10px;
}

.oc-thread-reply__body p:last-child {
  margin-bottom: 0;
}

.oc-thread-reply__resources {
  margin-top: 10px;
}

.oc-thread-reply__footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.oc-thread-reply--collapsed .oc-thread-reply__footer {
  margin-top: 0;
}

.oc-thread-reply__reactions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.oc-thread-reply__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.oc-thread-reply:hover .oc-thread-reply__actions {
  opacity: 1;
}

.oc-thread-reply__toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  margin-left: auto;
  font-size: 12px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-thread-reply__toggle:hover {
  background: var(--oc-bg-surface, #F8F8F8);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-reply__toggle-icon {
  transition: transform 0.2s ease;
}

.oc-thread-reply--collapsed .oc-thread-reply__toggle-icon {
  transform: rotate(-90deg);
}

.oc-thread-reply__replies {
  margin-top: 4px;
}

/* Depth indentation limits */
.oc-thread-reply--depth-1 { padding-left: 24px; }
.oc-thread-reply--depth-2 { padding-left: 20px; }
.oc-thread-reply--depth-3 { padding-left: 16px; }
.oc-thread-reply--depth-4 { padding-left: 12px; }

/* ============ Mention ============ */
.oc-mention {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: var(--oc-accent, #0F766E);
  background: rgba(15, 118, 110, 0.1);
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  cursor: pointer;
  transition: all 0.15s ease;
  vertical-align: baseline;
}

.oc-mention:hover {
  background: rgba(15, 118, 110, 0.2);
  color: var(--oc-accent-hover, #0D9488);
}

.oc-mention__avatar {
  display: flex;
  align-items: center;
  margin-right: 2px;
}

.oc-mention__at {
  opacity: 0.7;
}

.oc-mention__name {
  font-weight: 600;
}

/* ============ Linked Resource ============ */
.oc-linked-resource {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  font-size: 13px;
  font-family: inherit;
  color: var(--resource-color, var(--oc-fg-secondary));
  background: transparent;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-sm, 6px);
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
}

.oc-linked-resource:hover {
  background: var(--oc-bg-surface, #F8F8F8);
  border-color: var(--resource-color, var(--oc-border-default));
  transform: translateY(-1px);
}

.oc-linked-resource__icon {
  display: flex;
  align-items: center;
  opacity: 0.8;
}

.oc-linked-resource__title {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.oc-linked-resource__ref {
  font-size: 11px;
  font-weight: 400;
  color: var(--oc-fg-tertiary, #94A3B8);
  padding-left: 6px;
  border-left: 1px solid var(--oc-border-default, #E2E8F0);
}

/* Resource type colors */
.oc-linked-resource--document { --resource-color: var(--oc-info, #0891B2); }
.oc-linked-resource--collection { --resource-color: var(--oc-warning, #D97706); }
.oc-linked-resource--annotation { --resource-color: var(--oc-accent, #0F766E); }
.oc-linked-resource--comment { --resource-color: var(--oc-fg-secondary, #475569); }
.oc-linked-resource--clause { --resource-color: var(--oc-success, #059669); }
.oc-linked-resource--user { --resource-color: var(--oc-accent, #0F766E); }

/* ============ Resource List ============ */
.oc-resource-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.oc-resource-list__label {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-resource-list__items {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* ============ Reaction Button ============ */
.oc-reaction-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 14px;
  font-family: inherit;
  background: var(--oc-bg-surface, #F8F8F8);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-full, 9999px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-reaction-button:hover {
  background: var(--oc-bg-canvas, #FFFFFF);
  border-color: var(--oc-fg-tertiary, #94A3B8);
  transform: scale(1.05);
}

.oc-reaction-button--active {
  background: rgba(15, 118, 110, 0.1);
  border-color: rgba(15, 118, 110, 0.3);
}

.oc-reaction-button--active:hover {
  background: rgba(15, 118, 110, 0.15);
}

.oc-reaction-button__emoji {
  font-size: 14px;
  line-height: 1;
}

.oc-reaction-button__count {
  font-size: 12px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
}

.oc-reaction-button--active .oc-reaction-button__count {
  color: var(--oc-accent, #0F766E);
}

/* ============ Reaction Bar ============ */
.oc-reaction-bar {
  display: flex;
  align-items: center;
  gap: 6px;
}

.oc-reaction-bar__add {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: 1px dashed var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-full, 9999px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-reaction-bar__add:hover {
  background: var(--oc-bg-surface, #F8F8F8);
  border-color: var(--oc-fg-tertiary, #94A3B8);
  color: var(--oc-fg-secondary, #475569);
}

/* ============ Thread Action ============ */
.oc-thread-action {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: var(--oc-fg-secondary, #475569);
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-md, 8px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-thread-action:hover {
  background: var(--oc-bg-surface, #F8F8F8);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-thread-action--destructive {
  color: var(--oc-error, #DC2626);
}

.oc-thread-action--destructive:hover {
  background: rgba(220, 38, 38, 0.1);
  color: var(--oc-error, #DC2626);
}

.oc-thread-action__label {
  white-space: nowrap;
}

/* ============ Thread Input ============ */
.oc-thread-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px;
  border-top: 1px solid var(--oc-border-default, #E2E8F0);
  background: var(--oc-bg-canvas, #FFFFFF);
}

.oc-thread-input__replying {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--oc-bg-surface, #F8F8F8);
  border-radius: var(--oc-radius-md, 8px);
  font-size: 13px;
}

.oc-thread-input__replying-label {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-thread-input__cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: auto;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-thread-input__cancel:hover {
  background: rgba(220, 38, 38, 0.1);
  color: var(--oc-error, #DC2626);
}

/* ============ Thread Meta ============ */
.oc-thread-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 0;
  font-size: 13px;
  color: var(--oc-fg-secondary, #475569);
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-thread-meta__item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.oc-thread-meta__item svg {
  opacity: 0.6;
}

.oc-thread-meta__participants {
  display: flex;
  align-items: center;
}

.oc-thread-meta__activity {
  margin-left: auto;
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}
`;
