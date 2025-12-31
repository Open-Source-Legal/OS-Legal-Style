import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useFileSystem, FileSystemItem } from './FileSystem';

// ═══════════════════════════════════════════════════════════════
// FOLDER TREE
// ═══════════════════════════════════════════════════════════════

export interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
  /** Root label displayed at top */
  rootLabel?: string;
  /** Whether root is clickable to navigate to root */
  rootNavigable?: boolean;
  /** Folder data to render */
  folders?: FileSystemItem[];
  /** Custom render for folder items */
  children?: ReactNode;
}

export const FolderTree = forwardRef<HTMLDivElement, FolderTreeProps>(
  ({ rootLabel = 'All Files', rootNavigable = true, folders, className = '', children, ...props }, ref) => {
    const { currentPath, navigateToFolder } = useFileSystem();

    const classes = ['oc-folder-tree', className].filter(Boolean).join(' ');

    const isRootActive = currentPath.length === 0;

    return (
      <div ref={ref} className={classes} role="tree" {...props}>
        {/* Root item */}
        <button
          className={[
            'oc-folder-tree__root',
            isRootActive && 'oc-folder-tree__root--active',
          ].filter(Boolean).join(' ')}
          onClick={() => rootNavigable && navigateToFolder([])}
          role="treeitem"
          aria-selected={isRootActive}
          type="button"
        >
          <span className="oc-folder-tree__root-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.25 6.75L9 1.5l6.75 5.25v8.25a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75z" />
              <path d="M6.75 16.5V9h4.5v7.5" />
            </svg>
          </span>
          <span className="oc-folder-tree__root-label">{rootLabel}</span>
        </button>

        {/* Folder tree content */}
        <div className="oc-folder-tree__content">
          {children || (folders && folders.map((folder) => (
            <FolderTreeItem key={folder.id} item={folder} depth={0} />
          )))}
        </div>
      </div>
    );
  }
);

FolderTree.displayName = 'FolderTree';

// ═══════════════════════════════════════════════════════════════
// FOLDER TREE ITEM
// ═══════════════════════════════════════════════════════════════

export interface FolderTreeItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The folder item data */
  item: FileSystemItem;
  /** Nesting depth for indentation */
  depth?: number;
  /** Custom icon */
  icon?: ReactNode;
}

export const FolderTreeItem = forwardRef<HTMLDivElement, FolderTreeItemProps>(
  ({ item, depth = 0, icon, className = '', ...props }, ref) => {
    const { currentPath, expandedFolders, toggleFolder, navigateToFolder } = useFileSystem();

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedFolders.has(item.id);

    // Check if this folder is in the current path
    const pathString = item.path;
    const currentPathString = currentPath.join('/');
    const isActive = pathString === currentPathString;
    const isInPath = currentPathString.startsWith(pathString + '/') || isActive;

    const handleClick = () => {
      // Navigate to this folder
      const pathSegments = item.path.split('/').filter(Boolean);
      navigateToFolder(pathSegments);
    };

    const handleExpandClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFolder(item.id);
    };

    const classes = [
      'oc-folder-tree-item',
      isActive && 'oc-folder-tree-item--active',
      isInPath && 'oc-folder-tree-item--in-path',
      className,
    ].filter(Boolean).join(' ');

    const defaultIcon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M1 3.5A1.5 1.5 0 012.5 2h3.879a1.5 1.5 0 011.06.44l.311.31a.5.5 0 00.354.147H13.5A1.5 1.5 0 0115 4.397v8.103a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 12.5v-9z" />
      </svg>
    );

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          className="oc-folder-tree-item__row"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          role="treeitem"
          aria-selected={isActive}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {/* Expand/collapse button */}
          <button
            className={[
              'oc-folder-tree-item__toggle',
              !hasChildren && 'oc-folder-tree-item__toggle--hidden',
            ].filter(Boolean).join(' ')}
            onClick={handleExpandClick}
            tabIndex={-1}
            type="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={isExpanded ? 'oc-folder-tree-item__chevron--expanded' : ''}
            >
              <path d="M4.5 3L7.5 6L4.5 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Folder button */}
          <button
            className="oc-folder-tree-item__button"
            onClick={handleClick}
            type="button"
          >
            <span className="oc-folder-tree-item__icon">
              {icon || defaultIcon}
            </span>
            <span className="oc-folder-tree-item__label">{item.name}</span>
          </button>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="oc-folder-tree-item__children" role="group">
            {item.children!.filter(child => child.type === 'folder').map((child) => (
              <FolderTreeItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
);

FolderTreeItem.displayName = 'FolderTreeItem';
