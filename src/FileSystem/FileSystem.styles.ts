export const fileSystemStyles = `
/* ═══════════════════════════════════════════════════════════════
   FILESYSTEM CONTAINER
   ═══════════════════════════════════════════════════════════════ */

.oc-filesystem {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--oc-bg-canvas, #FAFAFA);
  font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
}

.oc-filesystem__layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.oc-filesystem__sidebar {
  width: 240px;
  min-width: 240px;
  background: var(--oc-bg-surface, white);
  border-right: 1px solid var(--oc-border-default, #E2E8F0);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.oc-filesystem__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ═══════════════════════════════════════════════════════════════
   FOLDER TREE
   ═══════════════════════════════════════════════════════════════ */

.oc-folder-tree {
  display: flex;
  flex-direction: column;
  padding: 8px;
  overflow-y: auto;
}

.oc-folder-tree__root {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 4px;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-md, 8px);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  text-align: left;
}

.oc-folder-tree__root:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-folder-tree__root--active {
  background: rgba(15, 118, 110, 0.08);
  color: var(--oc-accent, #0F766E);
}

.oc-folder-tree__root-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit;
}

.oc-folder-tree__root-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-folder-tree__content {
  display: flex;
  flex-direction: column;
}

/* ═══════════════════════════════════════════════════════════════
   FOLDER TREE ITEM
   ═══════════════════════════════════════════════════════════════ */

.oc-folder-tree-item {
  display: flex;
  flex-direction: column;
}

.oc-folder-tree-item__row {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: var(--oc-radius-md, 8px);
  transition: background var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-folder-tree-item__row:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-folder-tree-item--active > .oc-folder-tree-item__row {
  background: rgba(15, 118, 110, 0.08);
}

.oc-folder-tree-item--in-path > .oc-folder-tree-item__row {
  background: rgba(15, 118, 110, 0.04);
}

.oc-folder-tree-item__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  flex-shrink: 0;
}

.oc-folder-tree-item__toggle:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-secondary, #475569);
}

.oc-folder-tree-item__toggle--hidden {
  visibility: hidden;
}

.oc-folder-tree-item__chevron--expanded {
  transform: rotate(90deg);
}

.oc-folder-tree-item__button {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  padding: 6px 8px;
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  text-align: left;
  border-radius: var(--oc-radius-sm, 6px);
  transition: color var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-folder-tree-item__button:hover {
  color: var(--oc-fg-primary, #1E293B);
}

.oc-folder-tree-item--active .oc-folder-tree-item__button {
  font-weight: 500;
  color: var(--oc-accent, #0F766E);
}

.oc-folder-tree-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #F59E0B;
}

.oc-folder-tree-item--active .oc-folder-tree-item__icon {
  color: var(--oc-accent, #0F766E);
}

.oc-folder-tree-item__label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.oc-folder-tree-item__children {
  display: flex;
  flex-direction: column;
}

/* ═══════════════════════════════════════════════════════════════
   FILE PATH BREADCRUMB
   ═══════════════════════════════════════════════════════════════ */

.oc-file-breadcrumb {
  display: flex;
  align-items: center;
}

.oc-file-breadcrumb__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.oc-file-breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 2px;
}

.oc-file-breadcrumb__link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-md, 8px);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-file-breadcrumb__link:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-file-breadcrumb__link--active {
  color: var(--oc-fg-primary, #1E293B);
  cursor: default;
}

.oc-file-breadcrumb__link--active:hover {
  background: transparent;
}

.oc-file-breadcrumb__icon {
  flex-shrink: 0;
  color: inherit;
}

.oc-file-breadcrumb__separator {
  flex-shrink: 0;
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* ═══════════════════════════════════════════════════════════════
   FILESYSTEM TOOLBAR
   ═══════════════════════════════════════════════════════════════ */

.oc-fs-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--oc-bg-surface, white);
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
}

.oc-fs-toolbar__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.oc-fs-toolbar__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.oc-fs-toolbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.oc-fs-toolbar__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.oc-fs-toolbar__nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-fs-toolbar__nav-btn:hover:not(:disabled) {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-border-strong, #CBD5E1);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-fs-toolbar__nav-btn:disabled {
  opacity: var(--oc-opacity-disabled, 0.5);
  cursor: not-allowed;
}

.oc-fs-toolbar__view-toggle {
  display: flex;
  align-items: center;
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-radius: var(--oc-radius-md, 8px);
  padding: 3px;
}

.oc-fs-toolbar__view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--oc-radius-sm, 6px);
  color: var(--oc-fg-tertiary, #94A3B8);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-fs-toolbar__view-btn:hover {
  color: var(--oc-fg-secondary, #475569);
}

.oc-fs-toolbar__view-btn--active {
  background: var(--oc-bg-surface, white);
  color: var(--oc-fg-primary, #1E293B);
  box-shadow: var(--oc-shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.04));
}

.oc-fs-toolbar__button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-md, 8px);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-secondary, #475569);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
}

.oc-fs-toolbar__button:hover:not(:disabled) {
  background: var(--oc-bg-surface-hover, #F1F5F9);
  border-color: var(--oc-border-strong, #CBD5E1);
  color: var(--oc-fg-primary, #1E293B);
}

.oc-fs-toolbar__button--primary {
  background: var(--oc-accent, #0F766E);
  border-color: var(--oc-accent, #0F766E);
  color: white;
}

.oc-fs-toolbar__button--primary:hover:not(:disabled) {
  background: var(--oc-accent-hover, #0D9488);
  border-color: var(--oc-accent-hover, #0D9488);
  color: white;
}

.oc-fs-toolbar__button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.oc-fs-toolbar__separator {
  width: 1px;
  height: 24px;
  background: var(--oc-border-default, #E2E8F0);
}

/* ═══════════════════════════════════════════════════════════════
   FILE LIST
   ═══════════════════════════════════════════════════════════════ */

.oc-file-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.oc-file-list__header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: var(--oc-bg-canvas, #FAFAFA);
  border-bottom: 1px solid var(--oc-border-default, #E2E8F0);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-file-list__header-cell {
  flex-shrink: 0;
}

.oc-file-list__header-cell--name {
  flex: 1;
  min-width: 0;
}

.oc-file-list__header-cell--modified {
  width: 140px;
}

.oc-file-list__header-cell--size {
  width: 100px;
  text-align: right;
}

.oc-file-list__content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.oc-file-list--list .oc-file-list__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
}

.oc-file-list--grid .oc-file-list__content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  padding: 16px;
}

.oc-file-list__empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.oc-file-list__empty-content {
  text-align: center;
  max-width: 300px;
}

.oc-file-list__empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-file-list__empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--oc-fg-primary, #1E293B);
  margin: 0 0 8px;
}

.oc-file-list__empty-description {
  font-size: 14px;
  color: var(--oc-fg-secondary, #475569);
  margin: 0;
}

/* ═══════════════════════════════════════════════════════════════
   FILE LIST ITEM - LIST VIEW
   ═══════════════════════════════════════════════════════════════ */

.oc-file-list-item--list {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--oc-radius-md, 8px);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  outline: none;
}

.oc-file-list-item--list:hover {
  background: var(--oc-bg-surface-hover, #F1F5F9);
}

.oc-file-list-item--list:focus-visible {
  border-color: var(--oc-accent, #0F766E);
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.15);
}

.oc-file-list-item--list.oc-file-list-item--selected {
  background: rgba(15, 118, 110, 0.08);
  border-color: rgba(15, 118, 110, 0.2);
}

.oc-file-list-item__cell {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-size: 13px;
  color: var(--oc-fg-secondary, #475569);
}

.oc-file-list-item__cell--name {
  flex: 1;
  min-width: 0;
  gap: 12px;
}

.oc-file-list-item__cell--modified {
  width: 140px;
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-file-list-item__cell--size {
  width: 100px;
  justify-content: flex-end;
  font-size: 12px;
  color: var(--oc-fg-tertiary, #94A3B8);
}

.oc-file-list-item__name-text {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  color: var(--oc-fg-primary, #1E293B);
}

/* ═══════════════════════════════════════════════════════════════
   FILE LIST ITEM - GRID VIEW
   ═══════════════════════════════════════════════════════════════ */

.oc-file-list-item--grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  background: var(--oc-bg-surface, white);
  border: 1px solid var(--oc-border-default, #E2E8F0);
  border-radius: var(--oc-radius-lg, 12px);
  cursor: pointer;
  transition: all var(--oc-duration-fast, 0.15s) var(--oc-easing-default);
  outline: none;
}

.oc-file-list-item--grid:hover {
  border-color: var(--oc-border-strong, #CBD5E1);
  box-shadow: var(--oc-shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.04));
}

.oc-file-list-item--grid:focus-visible {
  border-color: var(--oc-accent, #0F766E);
  box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.15);
}

.oc-file-list-item--grid.oc-file-list-item--selected {
  border-color: var(--oc-accent, #0F766E);
  background: rgba(15, 118, 110, 0.04);
}

.oc-file-list-item--grid .oc-file-list-item__icon {
  width: 48px;
  height: 48px;
}

.oc-file-list-item--grid .oc-file-list-item__icon svg {
  width: 100%;
  height: 100%;
}

.oc-file-list-item--grid .oc-file-list-item__name {
  width: 100%;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--oc-fg-primary, #1E293B);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ═══════════════════════════════════════════════════════════════
   FILE ICONS
   ═══════════════════════════════════════════════════════════════ */

.oc-file-list-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
}

.oc-file-list-item__icon--folder {
  color: #F59E0B;
}

.oc-file-list-item__icon--pdf {
  color: #DC2626;
}

.oc-file-list-item__icon--document {
  color: #2563EB;
}

.oc-file-list-item__icon--image {
  color: #059669;
}

.oc-file-list-item__icon--spreadsheet {
  color: #059669;
}

.oc-file-list-item__icon--presentation {
  color: #EA580C;
}

.oc-file-list-item__icon--archive {
  color: #7C3AED;
}

.oc-file-list-item__icon--unknown {
  color: var(--oc-fg-tertiary, #94A3B8);
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
  .oc-filesystem__sidebar {
    display: none;
  }

  .oc-file-list__header-cell--modified,
  .oc-file-list-item__cell--modified {
    display: none;
  }

  .oc-file-list__header-cell--size,
  .oc-file-list-item__cell--size {
    width: 80px;
  }

  .oc-file-breadcrumb__list {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .oc-fs-toolbar {
    padding: 10px 12px;
    gap: 8px;
  }
}
`;
