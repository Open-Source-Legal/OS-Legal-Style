import React, { forwardRef, ReactNode, HTMLAttributes, useState } from 'react';

export type ResearchStatus = 'pending' | 'researching' | 'completed' | 'error';

// ============ ResearchCard (Main Container) ============

export interface ResearchCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Title of the research/analysis */
  title: string;
  /** Back button handler */
  onBack?: () => void;
  /** Actions for the header (share, export, etc.) */
  headerActions?: ReactNode;
  /** Content of the research */
  children: ReactNode;
}

export const ResearchCard = forwardRef<HTMLDivElement, ResearchCardProps>(
  ({ title, onBack, headerActions, className = '', children, ...props }, ref) => {
    const classes = ['oc-research-card', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-research-card__header">
          {onBack && (
            <button
              className="oc-research-card__back"
              onClick={onBack}
              type="button"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.56l4.22 4.22a.75.75 0 11-1.06 1.06l-5.5-5.5a.75.75 0 010-1.06l5.5-5.5a.75.75 0 011.06 1.06L5.56 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <h1 className="oc-research-card__title">{title}</h1>
          {headerActions && <div className="oc-research-card__actions">{headerActions}</div>}
        </div>
        <div className="oc-research-card__content">{children}</div>
      </div>
    );
  }
);

ResearchCard.displayName = 'ResearchCard';

// ============ UserQuestion ============

export interface UserQuestionProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatar element */
  avatar?: ReactNode;
  /** Question text */
  children: ReactNode;
}

export const UserQuestion = forwardRef<HTMLDivElement, UserQuestionProps>(
  ({ avatar, className = '', children, ...props }, ref) => {
    const classes = ['oc-user-question', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-user-question__avatar">
          {avatar || (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          )}
        </div>
        <div className="oc-user-question__text">{children}</div>
      </div>
    );
  }
);

UserQuestion.displayName = 'UserQuestion';

// ============ AIResponse ============

export interface AIResponseProps extends HTMLAttributes<HTMLDivElement> {
  /** AI avatar/icon */
  avatar?: ReactNode;
  /** Status of the research */
  status?: ResearchStatus;
  /** Number of steps completed */
  stepsCompleted?: number;
  /** Total steps */
  totalSteps?: number;
  /** Status text override */
  statusText?: string;
  /** Is the status expandable/collapsible? */
  expandable?: boolean;
  /** Expanded state */
  expanded?: boolean;
  /** Toggle expand handler */
  onToggle?: () => void;
  /** Sources badge content */
  sourcesBadge?: ReactNode;
  /** Response content */
  children?: ReactNode;
}

export const AIResponse = forwardRef<HTMLDivElement, AIResponseProps>(
  (
    {
      avatar,
      status = 'completed',
      stepsCompleted,
      totalSteps,
      statusText,
      expandable = false,
      expanded = false,
      onToggle,
      sourcesBadge,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(expanded);
    const currentExpanded = expanded !== undefined ? expanded : isExpanded;

    const handleToggle = () => {
      if (expandable) {
        setIsExpanded(!currentExpanded);
        onToggle?.();
      }
    };

    const getStatusText = () => {
      if (statusText) return statusText;
      if (stepsCompleted !== undefined) {
        if (status === 'researching') {
          return `Researching... Step ${stepsCompleted}${totalSteps ? ` of ${totalSteps}` : ''}`;
        }
        return `Finished in ${stepsCompleted} steps`;
      }
      switch (status) {
        case 'pending': return 'Waiting to start...';
        case 'researching': return 'Researching...';
        case 'completed': return 'Research complete';
        case 'error': return 'Research failed';
        default: return '';
      }
    };

    const classes = [
      'oc-ai-response',
      `oc-ai-response--${status}`,
      expandable && 'oc-ai-response--expandable',
      currentExpanded && 'oc-ai-response--expanded',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-ai-response__header">
          <div className="oc-ai-response__avatar">
            {avatar || (
              <span className="oc-ai-response__avatar-icon">OC</span>
            )}
          </div>
          <button
            className="oc-ai-response__status"
            onClick={handleToggle}
            type="button"
            disabled={!expandable}
          >
            {status === 'researching' && (
              <span className="oc-ai-response__spinner" />
            )}
            <span className="oc-ai-response__status-text">{getStatusText()}</span>
            {expandable && (
              <svg
                className="oc-ai-response__chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
              </svg>
            )}
          </button>
        </div>
        {sourcesBadge && (
          <div className="oc-ai-response__sources">{sourcesBadge}</div>
        )}
        {children && (
          <div className="oc-ai-response__content">{children}</div>
        )}
      </div>
    );
  }
);

AIResponse.displayName = 'AIResponse';

// ============ SourcesBadge ============

export interface SourcesBadgeProps extends HTMLAttributes<HTMLButtonElement> {
  /** Number of sources */
  count: number;
  /** Source provider name */
  provider?: string;
  /** Provider icon */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export const SourcesBadge = forwardRef<HTMLButtonElement, SourcesBadgeProps>(
  ({ count, provider, icon, className = '', onClick, ...props }, ref) => {
    const classes = ['oc-sources-badge', className].filter(Boolean).join(' ');

    const text = provider
      ? `${count} sources from ${provider}`
      : `${count} source${count !== 1 ? 's' : ''}`;

    return (
      <button ref={ref} className={classes} onClick={onClick} type="button" {...props}>
        {icon && <span className="oc-sources-badge__icon">{icon}</span>}
        <span className="oc-sources-badge__text">{text}</span>
        <svg
          className="oc-sources-badge__arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
        </svg>
      </button>
    );
  }
);

SourcesBadge.displayName = 'SourcesBadge';

// ============ ResearchSection ============

export interface ResearchSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Section heading */
  heading?: string;
  /** Content */
  children: ReactNode;
}

export const ResearchSection = forwardRef<HTMLDivElement, ResearchSectionProps>(
  ({ heading, className = '', children, ...props }, ref) => {
    const classes = ['oc-research-section', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {heading && <h2 className="oc-research-section__heading">{heading}</h2>}
        <div className="oc-research-section__body">{children}</div>
      </div>
    );
  }
);

ResearchSection.displayName = 'ResearchSection';

// ============ StepsList (for expanded view) ============

export interface StepItem {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  description?: string;
}

export interface StepsListProps extends HTMLAttributes<HTMLDivElement> {
  /** Steps to display */
  steps: StepItem[];
}

export const StepsList = forwardRef<HTMLDivElement, StepsListProps>(
  ({ steps, className = '', ...props }, ref) => {
    const classes = ['oc-steps-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`oc-steps-list__item oc-steps-list__item--${step.status}`}
          >
            <div className="oc-steps-list__indicator">
              {step.status === 'completed' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zm3.28-8.72a.75.75 0 00-1.06-1.06L6 7.44 4.78 6.22a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z" clipRule="evenodd" />
                </svg>
              ) : step.status === 'running' ? (
                <span className="oc-steps-list__spinner" />
              ) : step.status === 'error' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zM5.28 4.22a.75.75 0 00-1.06 1.06L5.94 7l-1.72 1.72a.75.75 0 101.06 1.06L7 8.06l1.72 1.72a.75.75 0 101.06-1.06L8.06 7l1.72-1.72a.75.75 0 00-1.06-1.06L7 5.94 5.28 4.22z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="oc-steps-list__number">{index + 1}</span>
              )}
            </div>
            <div className="oc-steps-list__content">
              <span className="oc-steps-list__label">{step.label}</span>
              {step.description && (
                <span className="oc-steps-list__desc">{step.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

StepsList.displayName = 'StepsList';
