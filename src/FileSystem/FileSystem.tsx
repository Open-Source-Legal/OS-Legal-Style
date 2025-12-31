import React, {
  createContext,
  useContext,
  forwardRef,
  useState,
  useCallback,
  HTMLAttributes,
  ReactNode,
} from 'react';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

export type FileSystemViewMode = 'list' | 'grid';

export type FileType = 'folder' | 'document' | 'pdf' | 'image' | 'spreadsheet' | 'presentation' | 'archive' | 'unknown';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  size?: number;
  modifiedAt?: string;
  createdAt?: string;
  path: string;
  parentId?: string | null;
  children?: FileSystemItem[];
  metadata?: Record<string, unknown>;
}

export interface FileSystemContextValue {
  currentPath: string[];
  setCurrentPath: (path: string[]) => void;
  selectedItems: Set<string>;
  setSelectedItems: (items: Set<string>) => void;
  toggleSelection: (id: string, multi?: boolean) => void;
  viewMode: FileSystemViewMode;
  setViewMode: (mode: FileSystemViewMode) => void;
  expandedFolders: Set<string>;
  toggleFolder: (id: string) => void;
  navigateToFolder: (path: string[]) => void;
  navigateUp: () => void;
}

export interface FileSystemProps extends HTMLAttributes<HTMLDivElement> {
  /** Initial path segments */
  initialPath?: string[];
  /** View mode: list or grid */
  defaultViewMode?: FileSystemViewMode;
  /** Callback when path changes */
  onPathChange?: (path: string[]) => void;
  /** Callback when selection changes */
  onSelectionChange?: (selectedIds: Set<string>) => void;
  /** Children components */
  children: ReactNode;
}

// ═══════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════

const FileSystemContext = createContext<FileSystemContextValue | null>(null);

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystem provider');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════
// FILESYSTEM PROVIDER
// ═══════════════════════════════════════════════════════════════

export const FileSystem = forwardRef<HTMLDivElement, FileSystemProps>(
  (
    {
      initialPath = [],
      defaultViewMode = 'list',
      onPathChange,
      onSelectionChange,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [currentPath, setCurrentPathState] = useState<string[]>(initialPath);
    const [selectedItems, setSelectedItemsState] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<FileSystemViewMode>(defaultViewMode);
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const setCurrentPath = useCallback(
      (path: string[]) => {
        setCurrentPathState(path);
        onPathChange?.(path);
      },
      [onPathChange]
    );

    const setSelectedItems = useCallback(
      (items: Set<string>) => {
        setSelectedItemsState(items);
        onSelectionChange?.(items);
      },
      [onSelectionChange]
    );

    const toggleSelection = useCallback(
      (id: string, multi = false) => {
        setSelectedItemsState((prev) => {
          const next = multi ? new Set(prev) : new Set<string>();
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          onSelectionChange?.(next);
          return next;
        });
      },
      [onSelectionChange]
    );

    const toggleFolder = useCallback((id: string) => {
      setExpandedFolders((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    }, []);

    const navigateToFolder = useCallback(
      (path: string[]) => {
        setCurrentPath(path);
        setSelectedItems(new Set());
      },
      [setCurrentPath, setSelectedItems]
    );

    const navigateUp = useCallback(() => {
      if (currentPath.length > 0) {
        navigateToFolder(currentPath.slice(0, -1));
      }
    }, [currentPath, navigateToFolder]);

    const contextValue: FileSystemContextValue = {
      currentPath,
      setCurrentPath,
      selectedItems,
      setSelectedItems,
      toggleSelection,
      viewMode,
      setViewMode,
      expandedFolders,
      toggleFolder,
      navigateToFolder,
      navigateUp,
    };

    const classes = ['oc-filesystem', className].filter(Boolean).join(' ');

    return (
      <FileSystemContext.Provider value={contextValue}>
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      </FileSystemContext.Provider>
    );
  }
);

FileSystem.displayName = 'FileSystem';

// ═══════════════════════════════════════════════════════════════
// FILESYSTEM LAYOUT
// ═══════════════════════════════════════════════════════════════

export interface FileSystemLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FileSystemLayout = forwardRef<HTMLDivElement, FileSystemLayoutProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-filesystem__layout', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

FileSystemLayout.displayName = 'FileSystemLayout';

// ═══════════════════════════════════════════════════════════════
// FILESYSTEM SIDEBAR
// ═══════════════════════════════════════════════════════════════

export interface FileSystemSidebarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FileSystemSidebar = forwardRef<HTMLDivElement, FileSystemSidebarProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-filesystem__sidebar', className].filter(Boolean).join(' ');

    return (
      <aside ref={ref} className={classes} {...props}>
        {children}
      </aside>
    );
  }
);

FileSystemSidebar.displayName = 'FileSystemSidebar';

// ═══════════════════════════════════════════════════════════════
// FILESYSTEM MAIN
// ═══════════════════════════════════════════════════════════════

export interface FileSystemMainProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FileSystemMain = forwardRef<HTMLDivElement, FileSystemMainProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-filesystem__main', className].filter(Boolean).join(' ');

    return (
      <main ref={ref} className={classes} {...props}>
        {children}
      </main>
    );
  }
);

FileSystemMain.displayName = 'FileSystemMain';
