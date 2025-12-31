import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';

export type DocumentType = 'pdf' | 'doc' | 'docx' | 'txt' | 'xls' | 'xlsx' | 'ppt' | 'img' | 'unknown';

export interface SourceCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Document title/name */
  title: string;
  /** Document type for icon */
  type?: DocumentType;
  /** Page or section reference */
  reference?: string;
  /** Brief excerpt or description */
  excerpt?: string;
  /** Confidence/relevance score (0-100) */
  score?: number;
  /** Custom icon */
  icon?: ReactNode;
  /** Click handler */
  onOpen?: () => void;
  /** Compact inline variant */
  inline?: boolean;
}

export interface SourcePillProps extends HTMLAttributes<HTMLButtonElement> {
  /** Document name */
  name: string;
  /** Document type */
  type?: DocumentType;
  /** Reference (page, section) */
  reference?: string;
  /** Click handler */
  onOpen?: () => void;
}

export interface SourceListProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Number of sources */
  count?: number;
  children: ReactNode;
}

const typeColors: Record<DocumentType, string> = {
  pdf: '#0891B2',
  doc: '#2563EB',
  docx: '#2563EB',
  txt: '#64748B',
  xls: '#059669',
  xlsx: '#059669',
  ppt: '#D97706',
  img: '#8B5CF6',
  unknown: '#64748B',
};

const typeLabels: Record<DocumentType, string> = {
  pdf: 'PDF',
  doc: 'DOC',
  docx: 'DOCX',
  txt: 'TXT',
  xls: 'XLS',
  xlsx: 'XLSX',
  ppt: 'PPT',
  img: 'IMG',
  unknown: 'FILE',
};

const DocumentIcon = ({ type = 'unknown' }: { type?: DocumentType }) => (
  <div
    className="oc-source__icon"
    style={{ '--icon-color': typeColors[type] } as React.CSSProperties}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
    <span className="oc-source__icon-label">{typeLabels[type]}</span>
  </div>
);

export const SourceCard = forwardRef<HTMLDivElement, SourceCardProps>(
  (
    {
      title,
      type = 'unknown',
      reference,
      excerpt,
      score,
      icon,
      onOpen,
      inline = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-source-card',
      inline && 'oc-source-card--inline',
      onOpen && 'oc-source-card--clickable',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onOpen}
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        {...props}
      >
        {icon || <DocumentIcon type={type} />}
        <div className="oc-source-card__content">
          <div className="oc-source-card__header">
            <span className="oc-source-card__title">{title}</span>
            {reference && <span className="oc-source-card__ref">{reference}</span>}
          </div>
          {excerpt && <p className="oc-source-card__excerpt">{excerpt}</p>}
        </div>
        {score !== undefined && (
          <div className="oc-source-card__score">
            <div
              className="oc-source-card__score-bar"
              style={{ '--score': `${score}%` } as React.CSSProperties}
            />
            <span className="oc-source-card__score-label">{score}%</span>
          </div>
        )}
        {onOpen && (
          <svg className="oc-source-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
          </svg>
        )}
      </div>
    );
  }
);

SourceCard.displayName = 'SourceCard';

export const SourcePill = forwardRef<HTMLButtonElement, SourcePillProps>(
  ({ name, type = 'unknown', reference, onOpen, className = '', ...props }, ref) => {
    const classes = ['oc-source-pill', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        onClick={onOpen}
        type="button"
        style={{ '--pill-color': typeColors[type] } as React.CSSProperties}
        {...props}
      >
        <span className="oc-source-pill__icon">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 2a1 1 0 011-1h3.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V10a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" />
          </svg>
        </span>
        <span className="oc-source-pill__name">{name}</span>
        {reference && <span className="oc-source-pill__ref">{reference}</span>}
      </button>
    );
  }
);

SourcePill.displayName = 'SourcePill';

export const SourceList = forwardRef<HTMLDivElement, SourceListProps>(
  ({ title = 'Sources', count, className = '', children, ...props }, ref) => {
    const classes = ['oc-source-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-source-list__header">
          <span className="oc-source-list__title">{title}</span>
          {count !== undefined && (
            <span className="oc-source-list__count">{count} sources</span>
          )}
        </div>
        <div className="oc-source-list__items">{children}</div>
      </div>
    );
  }
);

SourceList.displayName = 'SourceList';

/** Inline citation marker */
export interface CitationProps extends HTMLAttributes<HTMLButtonElement> {
  /** Citation number */
  number: number;
  /** Click handler */
  onClick?: () => void;
}

export const Citation = forwardRef<HTMLButtonElement, CitationProps>(
  ({ number, className = '', ...props }, ref) => {
    const classes = ['oc-citation', className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {number}
      </button>
    );
  }
);

Citation.displayName = 'Citation';
