import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type ExtractStatus = 'pending' | 'queued' | 'running' | 'completed' | 'failed';

export interface ExtractCardProps extends HTMLAttributes<HTMLElement> {
  /** Extract name/title */
  name: string;
  /** Associated corpus name */
  corpusName?: string;
  /** Current status */
  status: ExtractStatus;
  /** Progress percentage (0-100) when status is 'running' */
  progress?: number;
  /** Number of documents processed/to process */
  documentCount?: number;
  /** Number of columns in the extract schema */
  columnCount?: number;
  /** Number of rows extracted (available when completed) */
  rowCount?: number;
  /** Creation timestamp */
  createdAt?: string;
  /** Completion timestamp */
  completedAt?: string;
  /** Optional description */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  /** Context menu content */
  menu?: ReactNode;
  /** Click handler for built-in kebab menu button */
  onMenuClick?: (e: React.MouseEvent) => void;
  /** Additional class name */
  className?: string;
}

export interface ExtractListProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Layout mode */
  layout?: 'list' | 'grid';
  /** Additional class name */
  className?: string;
  children: ReactNode;
}

// Status icons
const PendingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const QueuedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

const RunningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="oc-extract-card__status-icon--spinning">
    <path d="M8 2a6 6 0 100 12A6 6 0 008 2zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity="0.2" />
    <path d="M8 2a6 6 0 016 6h-2a4 4 0 00-4-4V2z" />
  </svg>
);

const CompletedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L7 8.94 5.28 7.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" clipRule="evenodd" />
  </svg>
);

const FailedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zM6.22 5.22a.75.75 0 011.06 0L8 5.94l.72-.72a.75.75 0 111.06 1.06L9.06 7l.72.72a.75.75 0 11-1.06 1.06L8 8.06l-.72.72a.75.75 0 01-1.06-1.06L6.94 7l-.72-.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

const ExtractIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H4z" />
  </svg>
);

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="3" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

const getStatusIcon = (status: ExtractStatus): ReactNode => {
  switch (status) {
    case 'pending':
      return <PendingIcon />;
    case 'queued':
      return <QueuedIcon />;
    case 'running':
      return <RunningIcon />;
    case 'completed':
      return <CompletedIcon />;
    case 'failed':
      return <FailedIcon />;
  }
};

const getStatusLabel = (status: ExtractStatus): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'queued':
      return 'Queued';
    case 'running':
      return 'Running';
    case 'completed':
      return 'Completed';
    case 'failed':
      return 'Failed';
  }
};

export const ExtractCard = forwardRef<HTMLElement, ExtractCardProps>(
  (
    {
      name,
      corpusName,
      status,
      progress,
      documentCount,
      columnCount,
      rowCount,
      createdAt,
      completedAt,
      description,
      onClick,
      menu,
      onMenuClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-extract-card',
      onClick && 'oc-extract-card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleMenuClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onMenuClick?.(e);
    };

    // Build stats array
    const stats: string[] = [];
    if (documentCount !== undefined) {
      stats.push(`${documentCount} doc${documentCount !== 1 ? 's' : ''}`);
    }
    if (columnCount !== undefined) {
      stats.push(`${columnCount} col${columnCount !== 1 ? 's' : ''}`);
    }
    if (rowCount !== undefined && status === 'completed') {
      stats.push(`${rowCount.toLocaleString()} row${rowCount !== 1 ? 's' : ''}`);
    }

    // Time display
    const timeDisplay = status === 'completed' && completedAt
      ? `Completed ${completedAt}`
      : createdAt
        ? `Created ${createdAt}`
        : undefined;

    return (
      <article
        ref={ref as React.Ref<HTMLElement>}
        className={classes}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        {...props}
      >
        <div className="oc-extract-card__icon">
          <ExtractIcon />
        </div>

        <div className="oc-extract-card__content">
          <div className="oc-extract-card__header">
            <span className={`oc-extract-card__status oc-extract-card__status--${status}`}>
              {getStatusIcon(status)}
              <span>{getStatusLabel(status)}</span>
              {status === 'running' && progress !== undefined && (
                <span className="oc-extract-card__progress-text">{progress}%</span>
              )}
            </span>
            {corpusName && (
              <span className="oc-extract-card__corpus">{corpusName}</span>
            )}
          </div>

          <h3 className="oc-extract-card__name">{name}</h3>

          {description && (
            <p className="oc-extract-card__description">{description}</p>
          )}

          {status === 'running' && progress !== undefined && (
            <div className="oc-extract-card__progress-bar">
              <div
                className="oc-extract-card__progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <div className="oc-extract-card__footer">
            {stats.length > 0 && (
              <div className="oc-extract-card__stats">
                {stats.map((stat, index) => (
                  <span key={index}>{stat}</span>
                ))}
              </div>
            )}
            {timeDisplay && (
              <span className="oc-extract-card__time">{timeDisplay}</span>
            )}
          </div>
        </div>

        {(menu || onMenuClick) && (
          <div className="oc-extract-card__menu">
            {menu || (
              <button
                type="button"
                className="oc-extract-card__menu-button"
                onClick={handleMenuClick}
                aria-label="Open menu"
              >
                <KebabIcon />
              </button>
            )}
          </div>
        )}
      </article>
    );
  }
);

ExtractCard.displayName = 'ExtractCard';

export const ExtractList = forwardRef<HTMLDivElement, ExtractListProps>(
  ({ gap = 'md', layout = 'list', className = '', children, ...props }, ref) => {
    const classes = [
      'oc-extract-list',
      `oc-extract-list--gap-${gap}`,
      `oc-extract-list--${layout}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ExtractList.displayName = 'ExtractList';
