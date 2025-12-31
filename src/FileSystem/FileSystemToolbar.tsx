import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useFileSystem, FileSystemViewMode } from './FileSystem';

// ═══════════════════════════════════════════════════════════════
// FILESYSTEM TOOLBAR
// ═══════════════════════════════════════════════════════════════

export interface FileSystemToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Show view mode toggle */
  showViewToggle?: boolean;
  /** Show navigation buttons (back/up) */
  showNavigation?: boolean;
  /** Custom left actions */
  leftActions?: ReactNode;
  /** Custom right actions */
  rightActions?: ReactNode;
  /** Children for custom layout */
  children?: ReactNode;
}

export const FileSystemToolbar = forwardRef<HTMLDivElement, FileSystemToolbarProps>(
  (
    {
      showViewToggle = true,
      showNavigation = true,
      leftActions,
      rightActions,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const { currentPath, navigateUp, viewMode, setViewMode } = useFileSystem();

    const canNavigateUp = currentPath.length > 0;

    const classes = ['oc-fs-toolbar', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-fs-toolbar__left">
          {showNavigation && (
            <div className="oc-fs-toolbar__nav">
              <button
                className="oc-fs-toolbar__nav-btn"
                onClick={navigateUp}
                disabled={!canNavigateUp}
                title="Go up one level"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className="oc-fs-toolbar__nav-btn"
                onClick={navigateUp}
                disabled={!canNavigateUp}
                title="Go to parent folder"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4.177 7.823l3.246-3.246a.25.25 0 01.354 0l3.246 3.246a.25.25 0 01-.177.427H8.75v3.5a.75.75 0 01-1.5 0v-3.5H5.104a.25.25 0 01-.177-.427z" />
                  <path d="M2 2.75A.75.75 0 012.75 2h10.5a.75.75 0 010 1.5H2.75A.75.75 0 012 2.75z" />
                </svg>
              </button>
            </div>
          )}
          {leftActions}
        </div>

        {children && <div className="oc-fs-toolbar__center">{children}</div>}

        <div className="oc-fs-toolbar__right">
          {rightActions}
          {showViewToggle && (
            <div className="oc-fs-toolbar__view-toggle" role="radiogroup" aria-label="View mode">
              <button
                className={[
                  'oc-fs-toolbar__view-btn',
                  viewMode === 'list' && 'oc-fs-toolbar__view-btn--active',
                ].filter(Boolean).join(' ')}
                onClick={() => setViewMode('list')}
                role="radio"
                aria-checked={viewMode === 'list'}
                title="List view"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.5-1.5a.5.5 0 000 1h8a.5.5 0 000-1h-8zm0 4a.5.5 0 000 1h8a.5.5 0 000-1h-8zm0 4a.5.5 0 000 1h8a.5.5 0 000-1h-8zM2 8a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                className={[
                  'oc-fs-toolbar__view-btn',
                  viewMode === 'grid' && 'oc-fs-toolbar__view-btn--active',
                ].filter(Boolean).join(' ')}
                onClick={() => setViewMode('grid')}
                role="radio"
                aria-checked={viewMode === 'grid'}
                title="Grid view"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileSystemToolbar.displayName = 'FileSystemToolbar';

// ═══════════════════════════════════════════════════════════════
// TOOLBAR BUTTON
// ═══════════════════════════════════════════════════════════════

export interface ToolbarButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'default' | 'primary';
  /** Icon to display */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ variant = 'default', icon, disabled, children, className = '', type = 'button', ...props }, ref) => {
    const classes = [
      'oc-fs-toolbar__button',
      `oc-fs-toolbar__button--${variant}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} disabled={disabled} type={type} {...props}>
        {icon && <span className="oc-fs-toolbar__button-icon">{icon}</span>}
        {children}
      </button>
    );
  }
);

ToolbarButton.displayName = 'ToolbarButton';

// ═══════════════════════════════════════════════════════════════
// TOOLBAR SEPARATOR
// ═══════════════════════════════════════════════════════════════

export const ToolbarSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = ['oc-fs-toolbar__separator', className].filter(Boolean).join(' ');
    return <div ref={ref} className={classes} role="separator" {...props} />;
  }
);

ToolbarSeparator.displayName = 'ToolbarSeparator';
