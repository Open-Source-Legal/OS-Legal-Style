export const discussionStyles = `
/* ============ Category Badge ============ */
.oc-category-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--category-color, var(--oc-fg-secondary, #475569));
  background: color-mix(in srgb, var(--category-color, var(--oc-fg-secondary)) 10%, transparent);
  border-radius: var(--oc-radius-sm, 6px);
  white-space: nowrap;
}

.oc-category-badge__label {
  line-height: 1;
}

/* ============ Discussion List ============ */
.oc-discussion-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  overflow: hidden;
}

.oc-discussion-list--card {
  gap: 12px;
  background: transparent;
}

.oc-discussion-list--compact,
.oc-discussion-list--minimal {
  border: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-discussion-list--loading {
  gap: 0;
}

.oc-discussion-list__loading {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.oc-discussion-list__skeleton {
  height: 80px;
  background: var(--oc-bg-surface, #F8F8F8);
  animation: oc-skeleton-pulse 1.5s ease-in-out infinite;
}

.oc-discussion-list__skeleton:nth-child(2) {
  animation-delay: 0.1s;
}

.oc-discussion-list__skeleton:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes oc-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ============ Discussion Item - Card Variant ============ */
.oc-discussion-item--card {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  background: var(--oc-bg-surface, white);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-discussion-item--card:hover {
  border-color: var(--oc-border-strong, #CBD5E1);
  box-shadow: var(--oc-shadow-sm, 0 1px 3px rgba(15, 23, 42, 0.04));
  transform: translateY(-1px);
}

.oc-discussion-item--card:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: 2px;
}

.oc-discussion-item--card.oc-discussion-item--pinned {
  border-left: 3px solid var(--oc-warning, #D97706);
  background: linear-gradient(90deg, rgba(217, 119, 6, 0.03) 0%, transparent 30%);
}

.oc-discussion-item--card.oc-discussion-item--unread {
  border-left: 3px solid var(--oc-accent, #0F766E);
}

.oc-discussion-item--card.oc-discussion-item--answered,
.oc-discussion-item--card.oc-discussion-item--resolved {
  border-left: 3px solid var(--oc-success, #059669);
}

/* Vote column */
.oc-discussion-item__votes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 40px;
  padding-top: 2px;
}

.oc-discussion-item__vote-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: var(--oc-bg-canvas, #FAFAFA);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-discussion-item__vote-btn:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-accent, #0F766E);
  color: var(--oc-accent, #0F766E);
}

.oc-discussion-item__vote-btn--active {
  background: var(--oc-accent, #0F766E);
  border-color: var(--oc-accent, #0F766E);
  color: white;
}

.oc-discussion-item__vote-btn--active:hover {
  background: var(--oc-accent-hover, #0D9488);
  color: white;
}

.oc-discussion-item__vote-count {
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg-secondary, #475569);
}

/* Main content */
.oc-discussion-item__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.oc-discussion-item__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.oc-discussion-item__header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.oc-discussion-item__status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-discussion-item__status-icon--resolved {
  color: var(--oc-success, #059669);
}

.oc-discussion-item__status-icon--pinned {
  color: var(--oc-warning, #D97706);
}

.oc-discussion-item__activity {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
  white-space: nowrap;
}

.oc-discussion-item__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
  line-height: 1.4;
}

.oc-discussion-item--card .oc-discussion-item__title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.oc-discussion-item--unread .oc-discussion-item__title {
  color: var(--oc-accent, #0F766E);
}

.oc-discussion-item__preview {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--oc-fg-secondary, #475569);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.oc-discussion-item__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.oc-discussion-item__tag {
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-radius: var(--oc-radius-full, 9999px);
}

.oc-discussion-item__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.oc-discussion-item__author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.oc-discussion-item__author-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-discussion-item__author-badge {
  display: inline-flex;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--oc-accent, #0F766E);
  background: rgba(15, 118, 110, 0.1);
  border-radius: var(--oc-radius-sm, 6px);
}

.oc-discussion-item__created {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-discussion-item__stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.oc-discussion-item__stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--oc-fg-secondary, #475569);
}

.oc-discussion-item__stat svg {
  opacity: 0.6;
}

/* ============ Discussion Item - Compact Variant ============ */
.oc-discussion-item--compact {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--oc-bg-surface, white);
  cursor: pointer;
  transition: background 0.15s ease;
}

.oc-discussion-item--compact:hover {
  background: var(--oc-bg-surface-hover, #F8F8F8);
}

.oc-discussion-item--compact:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: -2px;
}

.oc-discussion-item--compact.oc-discussion-item--pinned {
  background: linear-gradient(90deg, rgba(217, 119, 6, 0.05) 0%, transparent 20%);
}

.oc-discussion-item--compact .oc-discussion-item__leading {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.oc-discussion-item--compact .oc-discussion-item__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oc-discussion-item--compact .oc-discussion-item__title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-discussion-item--compact .oc-discussion-item__tags {
  gap: 4px;
}

.oc-discussion-item--compact .oc-discussion-item__tag {
  font-size: 10px;
  padding: 1px 6px;
}

.oc-discussion-item--compact .oc-discussion-item__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.oc-discussion-item--compact .oc-discussion-item__replies {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
}

.oc-discussion-item--compact .oc-discussion-item__replies svg {
  opacity: 0.6;
}

.oc-discussion-item--compact .oc-discussion-item__time {
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
  white-space: nowrap;
}

/* ============ Discussion Item - Minimal Variant ============ */
.oc-discussion-item--minimal {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--oc-bg-surface, white);
  cursor: pointer;
  transition: background 0.15s ease;
}

.oc-discussion-item--minimal:hover {
  background: var(--oc-bg-surface-hover, #F8F8F8);
}

.oc-discussion-item--minimal:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: -2px;
}

.oc-discussion-item--minimal .oc-discussion-item__avatar {
  flex-shrink: 0;
}

.oc-discussion-item--minimal .oc-discussion-item__content {
  flex: 1;
  min-width: 0;
}

.oc-discussion-item--minimal .oc-discussion-item__title {
  font-size: 14px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-discussion-item--minimal .oc-discussion-item__byline {
  font-size: 12px;
  color: var(--oc-fg-secondary, #475569);
}

.oc-discussion-item--minimal .oc-discussion-item__time {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-discussion-item--minimal .oc-discussion-item__time::before {
  content: '\\00B7';
  margin: 0 6px;
}

.oc-discussion-item--minimal .oc-discussion-item__replies {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  background: var(--oc-bg-canvas, #FAFAFA);
  border-radius: var(--oc-radius-full, 9999px);
}

.oc-discussion-item--minimal .oc-discussion-item__replies svg {
  opacity: 0.6;
}

/* ============ Discussion Filters ============ */
.oc-discussion-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  margin-bottom: 16px;
}

.oc-discussion-filters__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.oc-discussion-filters__category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: var(--oc-fg-secondary, #475569);
  background: transparent;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-full, 9999px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-discussion-filters__category:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-border-strong, #CBD5E1);
}

.oc-discussion-filters__category--active {
  background: var(--oc-accent, #0F766E);
  border-color: var(--oc-accent, #0F766E);
  color: white;
}

.oc-discussion-filters__category--active:hover {
  background: var(--oc-accent-hover, #0D9488);
  border-color: var(--oc-accent-hover, #0D9488);
}

.oc-discussion-filters__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--oc-radius-full, 9999px);
}

.oc-discussion-filters__category--active .oc-discussion-filters__count {
  background: rgba(255, 255, 255, 0.2);
}

.oc-discussion-filters__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.oc-discussion-filters__search {
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

.oc-discussion-filters__search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--oc-fg-tertiary, #94A3B8);
  pointer-events: none;
}

.oc-discussion-filters__search-input {
  width: 100%;
  padding: 10px 12px 10px 38px;
  font-size: 14px;
  font-family: inherit;
  color: var(--oc-fg-primary, #1E293B);
  background: var(--oc-bg-surface, white);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  transition: all 0.15s ease;
}

.oc-discussion-filters__search-input:focus {
  outline: none;
  border-color: var(--oc-accent, #0F766E);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.oc-discussion-filters__search-input::placeholder {
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-discussion-filters__sort {
  padding: 10px 32px 10px 12px;
  font-size: 14px;
  font-family: inherit;
  color: var(--oc-fg-primary, #1E293B);
  background: var(--oc-bg-surface, white) url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394A3B8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 8px center/20px no-repeat;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  cursor: pointer;
  appearance: none;
  transition: all 0.15s ease;
}

.oc-discussion-filters__sort:focus {
  outline: none;
  border-color: var(--oc-accent, #0F766E);
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

/* ============ New Discussion Button ============ */
.oc-new-discussion-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  color: white;
  background: var(--oc-accent, #0F766E);
  border: none;
  border-radius: var(--oc-radius-md, 8px);
  cursor: pointer;
  transition: all 0.15s ease;
}

.oc-new-discussion-btn:hover {
  background: var(--oc-accent-hover, #0D9488);
  transform: translateY(-1px);
  box-shadow: var(--oc-shadow-md, 0 4px 6px rgba(15, 23, 42, 0.05));
}

.oc-new-discussion-btn:active {
  transform: translateY(0);
}

.oc-new-discussion-btn:focus-visible {
  outline: 2px solid var(--oc-accent, #0F766E);
  outline-offset: 2px;
}

/* ============ Discussion Stats ============ */
.oc-discussion-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
}

.oc-discussion-stats__item {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.oc-discussion-stats__value {
  font-size: 18px;
  font-weight: 700;
  color: var(--oc-fg-primary, #1E293B);
}

.oc-discussion-stats__label {
  font-size: 13px;
  color: var(--oc-fg-secondary, #475569);
}

.oc-discussion-stats__item--answered .oc-discussion-stats__value {
  color: var(--oc-success, #059669);
}

/* ============ Responsive ============ */
@media (max-width: 768px) {
  .oc-discussion-item--card {
    flex-direction: column;
    gap: 12px;
  }

  .oc-discussion-item__votes {
    flex-direction: row;
    min-width: unset;
    gap: 8px;
    order: -1;
  }

  .oc-discussion-item__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .oc-discussion-item__stats {
    width: 100%;
    justify-content: flex-start;
  }

  .oc-discussion-filters__categories {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 8px;
    margin-bottom: -8px;
    -webkit-overflow-scrolling: touch;
  }

  .oc-discussion-filters__category {
    flex-shrink: 0;
  }

  .oc-discussion-filters__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .oc-discussion-filters__search {
    max-width: none;
  }

  .oc-discussion-filters__sort {
    width: 100%;
  }

  .oc-discussion-stats {
    flex-wrap: wrap;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .oc-discussion-item--compact,
  .oc-discussion-item--minimal {
    padding: 10px 12px;
  }

  .oc-discussion-item--compact .oc-discussion-item__meta {
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .oc-new-discussion-btn {
    width: 100%;
    justify-content: center;
  }
}
`;
