import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type CollectionType = 'legislation' | 'contracts' | 'case-law' | 'knowledge' | 'default';

export interface CollectionCardProps extends HTMLAttributes<HTMLElement> {
  /** Collection type for icon and badge styling */
  type?: CollectionType;
  /** Badge text (e.g., "Legislation", "Contracts") */
  badge?: string;
  /** Status text (e.g., "Active discussion", "Recently updated") */
  status?: string;
  /** Collection title */
  title: string;
  /** Collection description */
  description?: string;
  /** Stats to display (e.g., "54 titles", "34.2K annotations") */
  stats?: string[];
  /** Custom icon override */
  icon?: ReactNode;
  /** Thumbnail image URL - displays in place of icon */
  image?: string;
  /** Alt text for thumbnail image */
  imageAlt?: string;
  /** Custom badge color */
  badgeColor?: { bg: string; color: string };
  /** Click handler */
  onClick?: () => void;
  /** Context menu content (e.g., dropdown menu) */
  menu?: ReactNode;
  /** Click handler for built-in kebab menu button */
  onMenuClick?: (e: React.MouseEvent) => void;
  /** Additional class name */
  className?: string;
}

export interface CollectionListProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional class name */
  className?: string;
  children: ReactNode;
}

// Default icons for collection types
const LegislationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4zm2 2h4v2H8V6zm0 4h4v2H8v-2z" clipRule="evenodd" />
  </svg>
);

const ContractsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6zm2 2h8v2H6V8zm0 4h5v2H6v-2z" />
  </svg>
);

const CaseLawIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2L3 7v11h14V7l-7-5zM5 9h10v7H5V9zm2 2h6v2H7v-2z" clipRule="evenodd" />
  </svg>
);

const KnowledgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
  </svg>
);

const DefaultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2 0h12v8H4V6z" />
  </svg>
);

const KebabIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <circle cx="8" cy="3" r="1.5" fill="#64748B" />
    <circle cx="8" cy="8" r="1.5" fill="#64748B" />
    <circle cx="8" cy="13" r="1.5" fill="#64748B" />
  </svg>
);

const getTypeIcon = (type: CollectionType): ReactNode => {
  switch (type) {
    case 'legislation':
      return <LegislationIcon />;
    case 'contracts':
      return <ContractsIcon />;
    case 'case-law':
      return <CaseLawIcon />;
    case 'knowledge':
      return <KnowledgeIcon />;
    default:
      return <DefaultIcon />;
  }
};

const getTypeBadgeColor = (type: CollectionType): { bg: string; color: string } => {
  switch (type) {
    case 'legislation':
      return { bg: '#DBEAFE', color: '#1E40AF' };
    case 'contracts':
      return { bg: '#D1FAE5', color: '#065F46' };
    case 'case-law':
      return { bg: '#FEE2E2', color: '#991B1B' };
    case 'knowledge':
      return { bg: '#E0E7FF', color: '#3730A3' };
    default:
      return { bg: '#F1F5F9', color: '#475569' };
  }
};

export const CollectionCard = forwardRef<HTMLElement, CollectionCardProps>(
  (
    {
      type = 'default',
      badge,
      status,
      title,
      description,
      stats,
      icon,
      image,
      imageAlt,
      badgeColor,
      onClick,
      menu,
      onMenuClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-collection-card',
      onClick && 'oc-collection-card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const colors = badgeColor || getTypeBadgeColor(type);
    const iconElement = icon || getTypeIcon(type);

    const Component = onClick ? 'article' : 'article';

    // Render thumbnail image or icon
    const renderVisual = () => {
      if (image) {
        return (
          <div className="oc-collection-card__image">
            <img src={image} alt={imageAlt || title} />
          </div>
        );
      }
      return <div className="oc-collection-card__icon">{iconElement}</div>;
    };

    const handleMenuClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onMenuClick?.(e);
    };

    return (
      <Component
        ref={ref as any}
        className={classes}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        {...props}
      >
        {renderVisual()}
        <div className="oc-collection-card__content">
          <div className="oc-collection-card__header">
            {badge && (
              <span
                className="oc-collection-card__badge"
                style={{ background: colors.bg, color: colors.color }}
              >
                {badge}
              </span>
            )}
            {status && <span className="oc-collection-card__status">{status}</span>}
          </div>
          <h3 className="oc-collection-card__title">{title}</h3>
          {description && (
            <p className="oc-collection-card__description">{description}</p>
          )}
          {stats && stats.length > 0 && (
            <div className="oc-collection-card__stats">
              {stats.map((stat, index) => (
                <span key={index}>{stat}</span>
              ))}
            </div>
          )}
        </div>
        {(menu || onMenuClick) && (
          <div className="oc-collection-card__menu">
            {menu || (
              <button
                type="button"
                className="oc-collection-card__menu-button"
                onClick={handleMenuClick}
                aria-label="Open menu"
              >
                <KebabIcon />
              </button>
            )}
          </div>
        )}
      </Component>
    );
  }
);

CollectionCard.displayName = 'CollectionCard';

export const CollectionList = forwardRef<HTMLDivElement, CollectionListProps>(
  ({ gap = 'md', className = '', children, ...props }, ref) => {
    const classes = [
      'oc-collection-list',
      `oc-collection-list--gap-${gap}`,
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

CollectionList.displayName = 'CollectionList';
