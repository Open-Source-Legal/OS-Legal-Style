import React, {
  forwardRef,
  createContext,
  useContext,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  MouseEventHandler,
  CSSProperties,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type TableVariant = 'default' | 'bordered' | 'minimal';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableLayout = 'auto' | 'fixed';
export type StickyDirection = 'left' | 'right';
export type SortDirection = 'asc' | 'desc';
export type CellAlign = 'left' | 'center' | 'right';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: TableSize;
  striped?: boolean;
  stickyHeader?: boolean;
  layout?: TableLayout;
  className?: string;
  style?: CSSProperties;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  style?: CSSProperties;
}

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
  width?: string | number;
  sticky?: StickyDirection;
  sortable?: boolean;
  sorted?: SortDirection | null;
  onSort?: () => void;
  className?: string;
  style?: CSSProperties;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  style?: CSSProperties;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  className?: string;
  style?: CSSProperties;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: CellAlign;
  sticky?: StickyDirection;
  truncate?: boolean;
  maxWidth?: string;
  className?: string;
  style?: CSSProperties;
}

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  style?: CSSProperties;
}

export interface TableScrollContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface VirtualizedTableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  rowCount: number;
  rowHeight: number;
  overscan?: number;
  containerHeight: number;
  renderRow: (index: number, style: CSSProperties) => ReactNode;
  className?: string;
  style?: CSSProperties;
  onLoadMore?: () => void;
  loadMoreThreshold?: number;
}

// ─── Context ────────────────────────────────────────────────────────────────

interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
  stickyHeader: boolean;
}

const TableContext = createContext<TableContextValue | null>(null);

const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table sub-components must be used within a Table component');
  }
  return context;
};

// ─── Sort Icons (inline SVGs) ───────────────────────────────────────────────

const ChevronUpIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10l4-4 4 4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const ChevronsUpDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10l4 4 4-4" />
    <path d="M4 6l4-4 4 4" />
  </svg>
);

// ─── Table (Root) ───────────────────────────────────────────────────────────

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      variant = 'default',
      size = 'md',
      striped = false,
      stickyHeader = false,
      layout = 'auto',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-table',
      `oc-table--${variant}`,
      `oc-table--${size}`,
      striped && 'oc-table--striped',
      stickyHeader && 'oc-table--sticky-header',
      layout === 'fixed' && 'oc-table--layout-fixed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TableContext.Provider value={{ variant, size, stickyHeader }}>
        <table ref={ref} className={classes} {...props}>
          {children}
        </table>
      </TableContext.Provider>
    );
  }
);

TableRoot.displayName = 'Table';

// ─── Table.Head ─────────────────────────────────────────────────────────────

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className = '', children, ...props }, ref) => {
    useTableContext();
    const classes = ['oc-table__head', className].filter(Boolean).join(' ');

    return (
      <thead ref={ref} className={classes} {...props}>
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'Table.Head';

// ─── Table.HeadCell ─────────────────────────────────────────────────────────

const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  (
    {
      align,
      width,
      sticky,
      sortable = false,
      sorted = null,
      onSort,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    useTableContext();

    const classes = [
      'oc-table__head-cell',
      align && `oc-table__head-cell--align-${align}`,
      sticky && `oc-table__head-cell--sticky-${sticky}`,
      sortable && 'oc-table__head-cell--sortable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cellStyle: CSSProperties = { ...style };
    if (width !== undefined) {
      cellStyle.width = typeof width === 'number' ? `${width}px` : width;
    }

    const handleClick = sortable && onSort ? onSort : undefined;

    const handleKeyDown = sortable && onSort
      ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSort();
          }
        }
      : undefined;

    const ariaSort = sortable
      ? sorted === 'asc'
        ? ('ascending' as const)
        : sorted === 'desc'
          ? ('descending' as const)
          : ('none' as const)
      : undefined;

    const sortIcon = sortable ? (
      <span
        className={[
          'oc-table__sort-icon',
          sorted ? 'oc-table__sort-icon--active' : 'oc-table__sort-icon--neutral',
        ].join(' ')}
      >
        {sorted === 'asc' ? (
          <ChevronUpIcon />
        ) : sorted === 'desc' ? (
          <ChevronDownIcon />
        ) : (
          <ChevronsUpDownIcon />
        )}
      </span>
    ) : null;

    return (
      <th
        ref={ref}
        className={classes}
        style={cellStyle}
        scope="col"
        aria-sort={ariaSort}
        role={sortable ? 'columnheader button' : undefined}
        tabIndex={sortable ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {sortable ? (
          <span className="oc-table__head-cell-content">
            {children}
            {sortIcon}
          </span>
        ) : (
          children
        )}
      </th>
    );
  }
);

TableHeadCell.displayName = 'Table.HeadCell';

// ─── Table.Body ─────────────────────────────────────────────────────────────

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    useTableContext();
    const classes = ['oc-table__body', className].filter(Boolean).join(' ');

    return (
      <tbody ref={ref} className={classes} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'Table.Body';

// ─── Table.Row ──────────────────────────────────────────────────────────────

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      hoverable = true,
      selected = false,
      onClick,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    useTableContext();

    const classes = [
      'oc-table__row',
      hoverable && 'oc-table__row--hoverable',
      selected && 'oc-table__row--selected',
      onClick && 'oc-table__row--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <tr
        ref={ref}
        className={classes}
        onClick={onClick}
        aria-selected={selected || undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e: React.KeyboardEvent<HTMLTableRowElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick(e as unknown as React.MouseEvent<HTMLTableRowElement>);
                }
              }
            : undefined
        }
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'Table.Row';

// ─── Table.Cell ─────────────────────────────────────────────────────────────

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      align,
      sticky,
      truncate = false,
      maxWidth,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    useTableContext();

    const classes = [
      'oc-table__cell',
      align && `oc-table__cell--align-${align}`,
      sticky && `oc-table__cell--sticky-${sticky}`,
      truncate && 'oc-table__cell--truncate',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const cellStyle: CSSProperties = { ...style };
    if (truncate && maxWidth) {
      cellStyle.maxWidth = maxWidth;
    }

    const titleProp =
      truncate && typeof children === 'string' ? { title: children } : {};

    return (
      <td
        ref={ref}
        className={classes}
        style={cellStyle}
        {...titleProp}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'Table.Cell';

// ─── Table.Footer ───────────────────────────────────────────────────────────

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    useTableContext();
    const classes = ['oc-table__footer', className].filter(Boolean).join(' ');

    return (
      <tfoot ref={ref} className={classes} {...props}>
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = 'Table.Footer';

// ─── Table.ScrollContainer ──────────────────────────────────────────────────

const TableScrollContainer = forwardRef<HTMLDivElement, TableScrollContainerProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-table-scroll-container', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

TableScrollContainer.displayName = 'Table.ScrollContainer';

// ─── Table.VirtualizedBody ──────────────────────────────────────────────────

const VirtualizedBody = forwardRef<HTMLTableSectionElement, VirtualizedTableBodyProps>(
  (
    {
      rowCount,
      rowHeight,
      overscan = 5,
      containerHeight,
      renderRow,
      className = '',
      style,
      onLoadMore,
      loadMoreThreshold = 50,
      ...props
    },
    ref
  ) => {
    useTableContext();

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = rowCount * rowHeight;

    const startIndex = useMemo(
      () => Math.max(0, Math.floor(scrollTop / rowHeight) - overscan),
      [scrollTop, rowHeight, overscan]
    );
    const endIndex = useMemo(
      () =>
        Math.min(
          rowCount - 1,
          Math.floor((scrollTop + containerHeight) / rowHeight) + overscan
        ),
      [scrollTop, containerHeight, rowHeight, overscan, rowCount]
    );

    const handleScroll = useCallback(
      (e: Event) => {
        const target = e.target as HTMLDivElement;
        setScrollTop(target.scrollTop);

        if (
          onLoadMore &&
          target.scrollHeight - target.scrollTop - target.clientHeight < loadMoreThreshold
        ) {
          onLoadMore();
        }
      },
      [onLoadMore, loadMoreThreshold]
    );

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const visibleRows: ReactNode[] = [];
    for (let i = startIndex; i <= endIndex && i < rowCount; i++) {
      const rowStyle: CSSProperties = {
        top: `${i * rowHeight}px`,
        height: `${rowHeight}px`,
      };
      visibleRows.push(renderRow(i, rowStyle));
    }

    const classes = ['oc-table__body', className].filter(Boolean).join(' ');

    return (
      <>
        <tbody
          ref={ref}
          className={classes}
          style={{
            ...style,
            height: `${totalHeight}px`,
          }}
          {...props}
        >
          {visibleRows}
        </tbody>
        {/* Hidden scroll sentinel for tracking container scroll */}
        <style>{`
          .oc-table--virtualized { display: block; }
          .oc-table--virtualized .oc-table__head { display: table; width: 100%; }
          .oc-table--virtualized .oc-table__footer { display: table; width: 100%; }
        `}</style>
      </>
    );
  }
);

VirtualizedBody.displayName = 'Table.VirtualizedBody';

// ─── VirtualizedTable (convenience wrapper) ─────────────────────────────────

export interface VirtualizedTableProps extends Omit<TableProps, 'children'> {
  height: number;
  rowCount: number;
  rowHeight: number;
  overscan?: number;
  renderRow: (index: number, style: CSSProperties) => ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  onLoadMore?: () => void;
  loadMoreThreshold?: number;
}

const VirtualizedTable = forwardRef<HTMLDivElement, VirtualizedTableProps>(
  (
    {
      height,
      rowCount,
      rowHeight,
      overscan = 5,
      renderRow,
      header,
      footer,
      onLoadMore,
      loadMoreThreshold = 50,
      variant = 'default',
      size = 'md',
      striped = false,
      stickyHeader = false,
      layout = 'fixed',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = rowCount * rowHeight;

    const startIndex = useMemo(
      () => Math.max(0, Math.floor(scrollTop / rowHeight) - overscan),
      [scrollTop, rowHeight, overscan]
    );
    const endIndex = useMemo(
      () =>
        Math.min(
          rowCount - 1,
          Math.floor((scrollTop + height) / rowHeight) + overscan
        ),
      [scrollTop, height, rowHeight, overscan, rowCount]
    );

    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        setScrollTop(target.scrollTop);

        if (
          onLoadMore &&
          target.scrollHeight - target.scrollTop - target.clientHeight < loadMoreThreshold
        ) {
          onLoadMore();
        }
      },
      [onLoadMore, loadMoreThreshold]
    );

    const visibleRows: ReactNode[] = [];
    for (let i = startIndex; i <= endIndex && i < rowCount; i++) {
      const rowStyle: CSSProperties = {
        top: `${i * rowHeight}px`,
        height: `${rowHeight}px`,
      };
      visibleRows.push(renderRow(i, rowStyle));
    }

    const tableClasses = [
      'oc-table',
      'oc-table--virtualized',
      `oc-table--${variant}`,
      `oc-table--${size}`,
      striped && 'oc-table--striped',
      stickyHeader && 'oc-table--sticky-header',
      layout === 'fixed' && 'oc-table--layout-fixed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TableContext.Provider value={{ variant, size, stickyHeader }}>
        <div
          ref={(node) => {
            (scrollContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className="oc-table-scroll-container"
          style={{ ...style, height: `${height}px`, overflow: 'auto' }}
          onScroll={handleScroll}
          {...props}
        >
          <table className={tableClasses}>
            {header}
            <tbody
              className="oc-table__body"
              style={{ height: `${totalHeight}px` }}
            >
              {visibleRows}
            </tbody>
            {footer}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

VirtualizedTable.displayName = 'Table.Virtualized';

// ─── Compound Export ────────────────────────────────────────────────────────

export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  HeadCell: TableHeadCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Footer: TableFooter,
  ScrollContainer: TableScrollContainer,
  VirtualizedBody: VirtualizedBody,
  Virtualized: VirtualizedTable,
});
