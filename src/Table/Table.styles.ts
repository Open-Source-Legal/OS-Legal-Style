export const tableStyles = `
/* Table Component */
.oc-table-scroll-container {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--oc-border-default);
  border-radius: var(--oc-radius-lg);
}

.oc-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-primary);
  line-height: var(--oc-line-height-normal);
}

.oc-table--layout-fixed {
  table-layout: fixed;
}

/* Variants */
.oc-table--default .oc-table__body .oc-table__row {
  border-bottom: 1px solid var(--oc-border-default);
}

.oc-table--default .oc-table__body .oc-table__row:last-child {
  border-bottom: none;
}

.oc-table--bordered .oc-table__cell,
.oc-table--bordered .oc-table__head-cell {
  border: 1px solid var(--oc-border-default);
}

.oc-table--minimal .oc-table__head-cell {
  border-bottom: 1px solid var(--oc-border-default);
}

/* Striped */
.oc-table--striped .oc-table__body .oc-table__row:nth-child(even) {
  background-color: #f9fafb;
}

/* Sizes */
.oc-table--sm .oc-table__cell,
.oc-table--sm .oc-table__head-cell {
  padding: var(--oc-spacing-xs) var(--oc-spacing-sm);
}

.oc-table--md .oc-table__cell,
.oc-table--md .oc-table__head-cell {
  padding: var(--oc-spacing-sm) var(--oc-spacing-md);
}

.oc-table--lg .oc-table__cell,
.oc-table--lg .oc-table__head-cell {
  padding: var(--oc-spacing-md) var(--oc-spacing-lg);
}

/* Head */
.oc-table__head {
  background-color: #f8fafc;
}

.oc-table__head-cell {
  text-align: left;
  font-weight: 600;
  font-size: var(--oc-font-size-xs);
  color: var(--oc-fg-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  user-select: none;
}

/* Sticky header */
.oc-table--sticky-header .oc-table__head .oc-table__row {
  position: sticky;
  top: 0;
  z-index: 10;
}

.oc-table--sticky-header .oc-table__head-cell {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Head cell alignment */
.oc-table__head-cell--align-left {
  text-align: left;
}

.oc-table__head-cell--align-center {
  text-align: center;
}

.oc-table__head-cell--align-right {
  text-align: right;
}

/* Sortable head cell */
.oc-table__head-cell--sortable {
  cursor: pointer;
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-table__head-cell--sortable:hover {
  background-color: var(--oc-bg-surface-hover, #f1f5f9);
}

.oc-table__head-cell--sortable:focus-visible {
  outline: 2px solid var(--oc-accent);
  outline-offset: -2px;
}

.oc-table__head-cell-content {
  display: inline-flex;
  align-items: center;
  gap: var(--oc-spacing-xs);
}

.oc-table__sort-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--oc-fg-tertiary);
  transition: color var(--oc-duration-fast) var(--oc-easing-default),
              opacity var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-table__sort-icon--active {
  color: var(--oc-accent);
}

.oc-table__sort-icon--neutral {
  opacity: 0;
}

.oc-table__head-cell--sortable:hover .oc-table__sort-icon--neutral {
  opacity: 0.5;
}

.oc-table__sort-icon svg {
  width: 14px;
  height: 14px;
}

/* Sticky columns - head cell */
.oc-table__head-cell--sticky-left {
  position: sticky;
  left: 0;
  z-index: 11;
  background-color: #f8fafc;
}

.oc-table__head-cell--sticky-right {
  position: sticky;
  right: 0;
  z-index: 11;
  background-color: #f8fafc;
}

.oc-table__head-cell--sticky-left::after,
.oc-table__cell--sticky-left::after {
  content: '';
  position: absolute;
  top: 0;
  right: -6px;
  bottom: 0;
  width: 6px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

.oc-table__head-cell--sticky-right::before,
.oc-table__cell--sticky-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: -6px;
  bottom: 0;
  width: 6px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.05), transparent);
  pointer-events: none;
}

/* Body */
.oc-table__body {
  /* Ensure body renders cleanly with zero rows */
}

/* Row */
.oc-table__row {
  transition: background-color var(--oc-duration-fast) var(--oc-easing-default);
}

.oc-table__row--hoverable:hover {
  background-color: #f8fafc;
}

.oc-table__row--selected {
  background-color: rgba(15, 118, 110, 0.1);
}

.oc-table__row--selected:hover {
  background-color: rgba(15, 118, 110, 0.15);
}

.oc-table__row--clickable {
  cursor: pointer;
}

.oc-table__row--clickable:focus-visible {
  outline: 2px solid var(--oc-accent);
  outline-offset: -2px;
}

/* Cell */
.oc-table__cell {
  text-align: left;
  color: var(--oc-fg-primary);
  vertical-align: top;
}

.oc-table__cell--align-left {
  text-align: left;
}

.oc-table__cell--align-center {
  text-align: center;
}

.oc-table__cell--align-right {
  text-align: right;
}

/* Truncated cell */
.oc-table__cell--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Sticky columns - body cell */
.oc-table__cell--sticky-left {
  position: sticky;
  left: 0;
  z-index: 5;
  background-color: var(--oc-bg-surface, #ffffff);
}

.oc-table__cell--sticky-right {
  position: sticky;
  right: 0;
  z-index: 5;
  background-color: var(--oc-bg-surface, #ffffff);
}

/* Ensure striped rows have correct bg on sticky cells */
.oc-table--striped .oc-table__body .oc-table__row:nth-child(even) .oc-table__cell--sticky-left,
.oc-table--striped .oc-table__body .oc-table__row:nth-child(even) .oc-table__cell--sticky-right {
  background-color: #f9fafb;
}

/* Ensure selected rows have correct bg on sticky cells */
.oc-table__row--selected .oc-table__cell--sticky-left,
.oc-table__row--selected .oc-table__cell--sticky-right {
  background-color: rgba(15, 118, 110, 0.1);
}

/* Ensure hovered rows have correct bg on sticky cells */
.oc-table__row--hoverable:hover .oc-table__cell--sticky-left,
.oc-table__row--hoverable:hover .oc-table__cell--sticky-right {
  background-color: #f8fafc;
}

/* Footer */
.oc-table__footer {
  border-top: 1px solid var(--oc-border-default);
}

.oc-table__footer .oc-table__cell {
  font-size: var(--oc-font-size-sm);
  color: var(--oc-fg-secondary);
}

/* Virtualized table */
.oc-table--virtualized .oc-table__body {
  display: block;
  position: relative;
}

.oc-table--virtualized .oc-table__head {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.oc-table--virtualized .oc-table__head .oc-table__row {
  display: table-row;
}

.oc-table--virtualized .oc-table__head .oc-table__head-cell {
  display: table-cell;
}

.oc-table--virtualized .oc-table__body .oc-table__row {
  display: table;
  width: 100%;
  table-layout: fixed;
  position: absolute;
  left: 0;
}

.oc-table--virtualized .oc-table__body .oc-table__cell {
  display: table-cell;
}

.oc-table--virtualized .oc-table__footer {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.oc-table--virtualized .oc-table__footer .oc-table__row {
  display: table-row;
}

.oc-table--virtualized .oc-table__footer .oc-table__cell {
  display: table-cell;
}
`;
