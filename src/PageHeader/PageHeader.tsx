import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Page title */
  title: ReactNode;
  /** Optional subtitle/description */
  subtitle?: ReactNode;
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** Actions (buttons, etc.) aligned to the right */
  actions?: ReactNode;
  /** Back button handler */
  onBack?: () => void;
  /** Tabs or secondary navigation below title */
  tabs?: ReactNode;
  children?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, subtitle, breadcrumbs, actions, onBack, tabs, className = '', children, ...props }, ref) => {
    const classes = ['oc-page-header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="oc-page-header__breadcrumbs" aria-label="Breadcrumb">
            <ol className="oc-breadcrumbs">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="oc-breadcrumbs__item">
                  {index > 0 && <span className="oc-breadcrumbs__separator">/</span>}
                  {item.href || item.onClick ? (
                    <a
                      href={item.href || '#'}
                      onClick={item.onClick}
                      className="oc-breadcrumbs__link"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="oc-breadcrumbs__current">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="oc-page-header__row">
          <div className="oc-page-header__content">
            {onBack && (
              <button className="oc-page-header__back" onClick={onBack} aria-label="Go back">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <div className="oc-page-header__text">
              <h1 className="oc-page-header__title">{title}</h1>
              {subtitle && <p className="oc-page-header__subtitle">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="oc-page-header__actions">{actions}</div>}
        </div>

        {tabs && <div className="oc-page-header__tabs">{tabs}</div>}
        {children}
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
