import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { useFileSystem } from './FileSystem';

// ═══════════════════════════════════════════════════════════════
// FILE PATH BREADCRUMB
// ═══════════════════════════════════════════════════════════════

export interface FilePathBreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  /** Root label */
  rootLabel?: string;
  /** Custom separator between items */
  separator?: ReactNode;
  /** Path segments (overrides context) */
  path?: string[];
  /** Callback when segment is clicked */
  onNavigate?: (path: string[]) => void;
}

export const FilePathBreadcrumb = forwardRef<HTMLDivElement, FilePathBreadcrumbProps>(
  (
    {
      rootLabel = 'All Files',
      separator,
      path: pathProp,
      onNavigate,
      className = '',
      ...props
    },
    ref
  ) => {
    const context = useFileSystem();
    const currentPath = pathProp ?? context.currentPath;
    const navigate = onNavigate ?? context.navigateToFolder;

    const classes = ['oc-file-breadcrumb', className].filter(Boolean).join(' ');

    const defaultSeparator = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="oc-file-breadcrumb__separator">
        <path d="M6.22 4.22a.75.75 0 011.06 0l3.5 3.5a.75.75 0 010 1.06l-3.5 3.5a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" />
      </svg>
    );

    const handleNavigate = (index: number) => {
      if (index === -1) {
        // Navigate to root
        navigate([]);
      } else {
        // Navigate to path up to this segment
        navigate(currentPath.slice(0, index + 1));
      }
    };

    return (
      <nav ref={ref} className={classes} aria-label="File path" {...props}>
        <ol className="oc-file-breadcrumb__list">
          {/* Root */}
          <li className="oc-file-breadcrumb__item">
            <button
              className={[
                'oc-file-breadcrumb__link',
                currentPath.length === 0 && 'oc-file-breadcrumb__link--active',
              ].filter(Boolean).join(' ')}
              onClick={() => handleNavigate(-1)}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="oc-file-breadcrumb__icon">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-7a.5.5 0 00-.146-.354L13 5.793V2.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.293L8.354 1.146a.5.5 0 00-.708 0l-6 6A.5.5 0 001.5 7.5v7a.5.5 0 00.5.5h4a.5.5 0 00.5-.5z" />
              </svg>
              {rootLabel}
            </button>
          </li>

          {/* Path segments */}
          {currentPath.map((segment, index) => (
            <li key={index} className="oc-file-breadcrumb__item">
              {separator || defaultSeparator}
              <button
                className={[
                  'oc-file-breadcrumb__link',
                  index === currentPath.length - 1 && 'oc-file-breadcrumb__link--active',
                ].filter(Boolean).join(' ')}
                onClick={() => handleNavigate(index)}
                type="button"
                aria-current={index === currentPath.length - 1 ? 'page' : undefined}
              >
                {segment}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

FilePathBreadcrumb.displayName = 'FilePathBreadcrumb';
