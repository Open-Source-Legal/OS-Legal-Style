import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import type { HTMLAttributes, ReactNode, CSSProperties } from 'react';

export type DataGridColumnType = 'text' | 'number' | 'date' | 'boolean' | 'link' | 'custom';
export type SortDirection = 'asc' | 'desc' | null;

export interface DataGridColumn<T = Record<string, unknown>> {
  /** Unique column key matching data property */
  key: string;
  /** Column header label */
  label: string;
  /** Data type for formatting */
  type?: DataGridColumnType;
  /** Fixed width (e.g., '200px', '20%') */
  width?: string;
  /** Minimum width */
  minWidth?: string;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether to show cell actions on this column */
  showCellActions?: boolean;
}

export interface CellAction<T = Record<string, unknown>> {
  /** Unique action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: ReactNode;
  /** Action handler */
  onClick: (value: unknown, row: T, column: DataGridColumn<T>, rowIndex: number) => void;
  /** Whether to show this action for a specific cell */
  visible?: (value: unknown, row: T, column: DataGridColumn<T>) => boolean;
  /** Danger action styling */
  danger?: boolean;
}

export interface DataGridProps<T = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Column definitions */
  columns: DataGridColumn<T>[];
  /** Data rows */
  data: T[];
  /** Unique key property in data objects */
  rowKey: string;
  /** Row click handler */
  onRowClick?: (row: T, rowIndex: number) => void;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedKeys?: string[];
  /** Selection change handler */
  onSelectionChange?: (selectedKeys: string[]) => void;
  /** Empty state content */
  emptyState?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Number of skeleton rows when loading */
  loadingRows?: number;
  /** Sticky header */
  stickyHeader?: boolean;
  /** Max height with scroll */
  maxHeight?: string;
  /** Cell actions menu */
  cellActions?: CellAction<T>[];
  /** Sort state */
  sortColumn?: string;
  /** Sort direction */
  sortDirection?: SortDirection;
  /** Sort change handler */
  onSortChange?: (column: string, direction: SortDirection) => void;
  /** Compact mode */
  compact?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Additional class name */
  className?: string;
}

// Icons
const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="oc-data-grid__sort-icon">
    <path
      d="M7 2.5L10.5 6H3.5L7 2.5Z"
      opacity={direction === 'asc' ? 1 : 0.3}
    />
    <path
      d="M7 11.5L3.5 8H10.5L7 11.5Z"
      opacity={direction === 'desc' ? 1 : 0.3}
    />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="4" cy="8" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="12" cy="8" r="1.5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M11.354 4.354a.5.5 0 00-.708-.708L5.5 8.793 3.354 6.646a.5.5 0 10-.708.708l2.5 2.5a.5.5 0 00.708 0l5.5-5.5z" />
  </svg>
);

// Default formatters
const formatValue = (value: unknown, type: DataGridColumnType = 'text'): string => {
  if (value === null || value === undefined) return '—';

  switch (type) {
    case 'number':
      return typeof value === 'number' ? value.toLocaleString() : String(value);
    case 'date':
      if (value instanceof Date) return value.toLocaleDateString();
      if (typeof value === 'string') return new Date(value).toLocaleDateString();
      return String(value);
    case 'boolean':
      return value ? 'Yes' : 'No';
    default:
      return String(value);
  }
};

// Cell Actions Menu Component
interface CellActionsMenuProps<T> {
  value: unknown;
  row: T;
  column: DataGridColumn<T>;
  rowIndex: number;
  actions: CellAction<T>[];
  onClose: () => void;
}

function CellActionsMenu<T>({
  value,
  row,
  column,
  rowIndex,
  actions,
  onClose,
}: CellActionsMenuProps<T>) {
  const visibleActions = actions.filter(
    (action) => !action.visible || action.visible(value, row, column)
  );

  if (visibleActions.length === 0) return null;

  return (
    <div className="oc-data-grid__cell-menu">
      {visibleActions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={[
            'oc-data-grid__cell-menu-item',
            action.danger && 'oc-data-grid__cell-menu-item--danger',
          ].filter(Boolean).join(' ')}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick(value, row, column, rowIndex);
            onClose();
          }}
        >
          {action.icon && <span className="oc-data-grid__cell-menu-icon">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  );
}

// Skeleton Row
const SkeletonRow = ({ columnCount }: { columnCount: number }) => (
  <tr className="oc-data-grid__row oc-data-grid__row--skeleton">
    {Array.from({ length: columnCount }).map((_, i) => (
      <td key={i} className="oc-data-grid__cell">
        <div className="oc-data-grid__skeleton" />
      </td>
    ))}
  </tr>
);

// Main component with generic type
function DataGridInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    rowKey,
    onRowClick,
    selectable = false,
    selectedKeys = [],
    onSelectionChange,
    emptyState,
    loading = false,
    loadingRows = 5,
    stickyHeader = false,
    maxHeight,
    cellActions,
    sortColumn,
    sortDirection,
    onSortChange,
    compact = false,
    striped = false,
    className = '',
    style,
    ...props
  }: DataGridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [activeCellMenu, setActiveCellMenu] = useState<{
    rowIndex: number;
    columnKey: string;
  } | null>(null);

  const classes = [
    'oc-data-grid',
    stickyHeader && 'oc-data-grid--sticky-header',
    compact && 'oc-data-grid--compact',
    striped && 'oc-data-grid--striped',
    selectable && 'oc-data-grid--selectable',
    className,
  ].filter(Boolean).join(' ');

  const containerStyle: CSSProperties = {
    ...style,
    ...(maxHeight ? { maxHeight } : {}),
  };

  // Selection handlers
  const allSelected = useMemo(
    () => data.length > 0 && data.every((row) => selectedKeys.includes(String(row[rowKey]))),
    [data, selectedKeys, rowKey]
  );

  const someSelected = useMemo(
    () => data.some((row) => selectedKeys.includes(String(row[rowKey]))) && !allSelected,
    [data, selectedKeys, rowKey, allSelected]
  );

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row) => String(row[rowKey])));
    }
  }, [data, rowKey, allSelected, onSelectionChange]);

  const handleSelectRow = useCallback(
    (row: T) => {
      if (!onSelectionChange) return;
      const key = String(row[rowKey]);
      if (selectedKeys.includes(key)) {
        onSelectionChange(selectedKeys.filter((k) => k !== key));
      } else {
        onSelectionChange([...selectedKeys, key]);
      }
    },
    [rowKey, selectedKeys, onSelectionChange]
  );

  // Sort handler
  const handleSort = useCallback(
    (columnKey: string) => {
      if (!onSortChange) return;
      let newDirection: SortDirection = 'asc';
      if (sortColumn === columnKey) {
        if (sortDirection === 'asc') newDirection = 'desc';
        else if (sortDirection === 'desc') newDirection = null;
      }
      onSortChange(columnKey, newDirection);
    },
    [sortColumn, sortDirection, onSortChange]
  );

  // Cell action toggle
  const toggleCellMenu = useCallback(
    (rowIndex: number, columnKey: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setActiveCellMenu((current) =>
        current?.rowIndex === rowIndex && current?.columnKey === columnKey
          ? null
          : { rowIndex, columnKey }
      );
    },
    []
  );

  const closeCellMenu = useCallback(() => setActiveCellMenu(null), []);

  // Click outside to close menu
  React.useEffect(() => {
    if (!activeCellMenu) return;
    const handleClickOutside = () => closeCellMenu();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeCellMenu, closeCellMenu]);

  // Render cell content
  const renderCell = (column: DataGridColumn<T>, row: T, rowIndex: number) => {
    const value = row[column.key];

    // Custom renderer
    if (column.render) {
      return column.render(value, row, rowIndex);
    }

    // Boolean with checkmark
    if (column.type === 'boolean' && value) {
      return (
        <span className="oc-data-grid__boolean-check">
          <CheckIcon />
        </span>
      );
    }

    // Link type
    if (column.type === 'link' && value) {
      return (
        <a
          href={String(value)}
          className="oc-data-grid__link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {String(value)}
        </a>
      );
    }

    return formatValue(value, column.type);
  };

  // Empty state
  if (!loading && data.length === 0) {
    return (
      <div ref={ref} className={classes} style={containerStyle} {...props}>
        <div className="oc-data-grid__empty">
          {emptyState || (
            <div className="oc-data-grid__empty-default">
              <p>No data available</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={classes} style={containerStyle} {...props}>
      <table className="oc-data-grid__table">
        <thead className="oc-data-grid__header">
          <tr>
            {selectable && (
              <th className="oc-data-grid__th oc-data-grid__th--checkbox">
                <label className="oc-data-grid__checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={handleSelectAll}
                    className="oc-data-grid__checkbox"
                  />
                  <span className="oc-data-grid__checkbox-custom" />
                </label>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={[
                  'oc-data-grid__th',
                  column.sortable && 'oc-data-grid__th--sortable',
                  column.align && `oc-data-grid__th--${column.align}`,
                ].filter(Boolean).join(' ')}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                }}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <span className="oc-data-grid__th-content">
                  {column.label}
                  {column.sortable && (
                    <SortIcon
                      direction={sortColumn === column.key ? (sortDirection ?? null) : null}
                    />
                  )}
                </span>
              </th>
            ))}
            {cellActions && cellActions.length > 0 && (
              <th className="oc-data-grid__th oc-data-grid__th--actions" />
            )}
          </tr>
        </thead>
        <tbody className="oc-data-grid__body">
          {loading
            ? Array.from({ length: loadingRows }).map((_, i) => (
                <SkeletonRow
                  key={i}
                  columnCount={columns.length + (selectable ? 1 : 0) + (cellActions ? 1 : 0)}
                />
              ))
            : data.map((row, rowIndex) => {
                const key = String(row[rowKey]);
                const isSelected = selectedKeys.includes(key);

                return (
                  <tr
                    key={key}
                    className={[
                      'oc-data-grid__row',
                      onRowClick && 'oc-data-grid__row--clickable',
                      isSelected && 'oc-data-grid__row--selected',
                    ].filter(Boolean).join(' ')}
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  >
                    {selectable && (
                      <td className="oc-data-grid__cell oc-data-grid__cell--checkbox">
                        <label className="oc-data-grid__checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(row)}
                            onClick={(e) => e.stopPropagation()}
                            className="oc-data-grid__checkbox"
                          />
                          <span className="oc-data-grid__checkbox-custom" />
                        </label>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={[
                          'oc-data-grid__cell',
                          column.align && `oc-data-grid__cell--${column.align}`,
                          column.type === 'number' && 'oc-data-grid__cell--number',
                        ].filter(Boolean).join(' ')}
                      >
                        <div className="oc-data-grid__cell-content">
                          {renderCell(column, row, rowIndex)}
                          {column.showCellActions && cellActions && cellActions.length > 0 && (
                            <div className="oc-data-grid__cell-action-wrapper">
                              <button
                                type="button"
                                className="oc-data-grid__cell-action-btn"
                                onClick={(e) => toggleCellMenu(rowIndex, column.key, e)}
                                aria-label="Cell actions"
                              >
                                <MoreIcon />
                              </button>
                              {activeCellMenu?.rowIndex === rowIndex &&
                                activeCellMenu?.columnKey === column.key && (
                                  <CellActionsMenu
                                    value={row[column.key]}
                                    row={row}
                                    column={column}
                                    rowIndex={rowIndex}
                                    actions={cellActions}
                                    onClose={closeCellMenu}
                                  />
                                )}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                    {cellActions && cellActions.length > 0 && !columns.some((c) => c.showCellActions) && (
                      <td className="oc-data-grid__cell oc-data-grid__cell--actions">
                        <div className="oc-data-grid__cell-action-wrapper">
                          <button
                            type="button"
                            className="oc-data-grid__cell-action-btn"
                            onClick={(e) => toggleCellMenu(rowIndex, '__row__', e)}
                            aria-label="Row actions"
                          >
                            <MoreIcon />
                          </button>
                          {activeCellMenu?.rowIndex === rowIndex &&
                            activeCellMenu?.columnKey === '__row__' && (
                              <CellActionsMenu
                                value={null}
                                row={row}
                                column={{ key: '__row__', label: '' }}
                                rowIndex={rowIndex}
                                actions={cellActions}
                                onClose={closeCellMenu}
                              />
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

// Export with forwardRef that preserves generic
export const DataGrid = forwardRef(DataGridInner) as <T extends Record<string, unknown>>(
  props: DataGridProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(DataGrid as React.FC).displayName = 'DataGrid';
