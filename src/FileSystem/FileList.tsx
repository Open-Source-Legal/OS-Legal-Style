import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useFileSystem, FileSystemItem, FileType } from './FileSystem';

// ═══════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════

const FileIcons: Record<FileType, ReactNode> = {
  folder: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 6a2 2 0 012-2h5.172a2 2 0 011.414.586l.828.828A2 2 0 0012.828 6H20a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  ),
  document: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  pdf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  image: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  spreadsheet: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  presentation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  archive: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  unknown: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const getFileIcon = (type: FileType): ReactNode => FileIcons[type] || FileIcons.unknown;

// ═══════════════════════════════════════════════════════════════
// FILE LIST
// ═══════════════════════════════════════════════════════════════

export interface FileListProps extends HTMLAttributes<HTMLDivElement> {
  /** Items to display */
  items?: FileSystemItem[];
  /** Show column headers (list view only) */
  showHeaders?: boolean;
  /** Empty state content */
  emptyState?: ReactNode;
  /** Custom children instead of items */
  children?: ReactNode;
  /** Callback when item is clicked */
  onItemClick?: (item: FileSystemItem) => void;
  /** Callback when item is double-clicked (open) */
  onItemOpen?: (item: FileSystemItem) => void;
}

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  (
    {
      items,
      showHeaders = true,
      emptyState,
      children,
      onItemClick,
      onItemOpen,
      className = '',
      ...props
    },
    ref
  ) => {
    const { viewMode, navigateToFolder } = useFileSystem();

    const handleItemOpen = (item: FileSystemItem) => {
      if (item.type === 'folder') {
        const pathSegments = item.path.split('/').filter(Boolean);
        navigateToFolder(pathSegments);
      }
      onItemOpen?.(item);
    };

    const classes = [
      'oc-file-list',
      `oc-file-list--${viewMode}`,
      className,
    ].filter(Boolean).join(' ');

    const isEmpty = !children && (!items || items.length === 0);

    return (
      <div ref={ref} className={classes} role="list" {...props}>
        {viewMode === 'list' && showHeaders && !isEmpty && (
          <div className="oc-file-list__header">
            <div className="oc-file-list__header-cell oc-file-list__header-cell--name">Name</div>
            <div className="oc-file-list__header-cell oc-file-list__header-cell--modified">Modified</div>
            <div className="oc-file-list__header-cell oc-file-list__header-cell--size">Size</div>
          </div>
        )}

        {isEmpty ? (
          <div className="oc-file-list__empty">
            {emptyState || (
              <div className="oc-file-list__empty-content">
                <div className="oc-file-list__empty-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 12a4 4 0 014-4h10.343a4 4 0 012.829 1.172l1.656 1.656a4 4 0 002.829 1.172H36a4 4 0 014 4v20a4 4 0 01-4 4H12a4 4 0 01-4-4V12z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="oc-file-list__empty-title">This folder is empty</div>
                <div className="oc-file-list__empty-description">
                  Upload files or create a new folder to get started
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="oc-file-list__content">
            {children || items?.map((item) => (
              <FileListItem
                key={item.id}
                item={item}
                onClick={() => onItemClick?.(item)}
                onDoubleClick={() => handleItemOpen(item)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileList.displayName = 'FileList';

// ═══════════════════════════════════════════════════════════════
// FILE LIST ITEM
// ═══════════════════════════════════════════════════════════════

export interface FileListItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The file/folder item */
  item: FileSystemItem;
  /** Custom icon override */
  icon?: ReactNode;
  /** Additional actions */
  actions?: ReactNode;
}

export const FileListItem = forwardRef<HTMLDivElement, FileListItemProps>(
  ({ item, icon, actions, className = '', onClick, onDoubleClick, ...props }, ref) => {
    const { viewMode, selectedItems, toggleSelection, navigateToFolder } = useFileSystem();

    const isSelected = selectedItems.has(item.id);
    const isFolder = item.type === 'folder';

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      toggleSelection(item.id, e.ctrlKey || e.metaKey);
      onClick?.(e);
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFolder) {
        const pathSegments = item.path.split('/').filter(Boolean);
        navigateToFolder(pathSegments);
      }
      onDoubleClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        if (isFolder) {
          const pathSegments = item.path.split('/').filter(Boolean);
          navigateToFolder(pathSegments);
        }
      }
    };

    const classes = [
      'oc-file-list-item',
      `oc-file-list-item--${viewMode}`,
      isSelected && 'oc-file-list-item--selected',
      isFolder && 'oc-file-list-item--folder',
      className,
    ].filter(Boolean).join(' ');

    const iconColorClass = isFolder ? 'oc-file-list-item__icon--folder' : `oc-file-list-item__icon--${item.type}`;

    const formatSize = (bytes?: number) => {
      if (!bytes) return '—';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    if (viewMode === 'grid') {
      return (
        <div
          ref={ref}
          className={classes}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onKeyDown={handleKeyDown}
          role="listitem"
          tabIndex={0}
          aria-selected={isSelected}
          {...props}
        >
          <div className={`oc-file-list-item__icon ${iconColorClass}`}>
            {icon || getFileIcon(item.type)}
          </div>
          <div className="oc-file-list-item__name" title={item.name}>
            {item.name}
          </div>
          {actions && <div className="oc-file-list-item__actions">{actions}</div>}
        </div>
      );
    }

    // List view
    return (
      <div
        ref={ref}
        className={classes}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onKeyDown={handleKeyDown}
        role="listitem"
        tabIndex={0}
        aria-selected={isSelected}
        {...props}
      >
        <div className="oc-file-list-item__cell oc-file-list-item__cell--name">
          <div className={`oc-file-list-item__icon ${iconColorClass}`}>
            {icon || getFileIcon(item.type)}
          </div>
          <span className="oc-file-list-item__name-text" title={item.name}>
            {item.name}
          </span>
        </div>
        <div className="oc-file-list-item__cell oc-file-list-item__cell--modified">
          {item.modifiedAt || '—'}
        </div>
        <div className="oc-file-list-item__cell oc-file-list-item__cell--size">
          {isFolder ? '—' : formatSize(item.size)}
        </div>
        {actions && <div className="oc-file-list-item__actions">{actions}</div>}
      </div>
    );
  }
);

FileListItem.displayName = 'FileListItem';
