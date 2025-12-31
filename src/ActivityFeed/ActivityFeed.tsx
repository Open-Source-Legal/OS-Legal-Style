import React, { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface ActivityItemData {
  /** Unique identifier */
  id: string | number;
  /** User/actor name */
  name: string;
  /** Avatar initials (fallback if no avatar) */
  initials?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Avatar background color */
  avatarColor?: string;
  /** Action verb (e.g., "annotated", "created", "published") */
  action: string;
  /** Target of the action */
  target: string;
  /** Target link URL */
  targetUrl?: string;
  /** Timestamp display string */
  time: string;
  /** Optional icon for the action */
  icon?: ReactNode;
}

export interface ActivityItemProps extends HTMLAttributes<HTMLDivElement> {
  /** User/actor name */
  name: string;
  /** Avatar initials */
  initials?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Avatar background color */
  avatarColor?: string;
  /** Action verb */
  action: string;
  /** Target of the action */
  target: string;
  /** Target link URL */
  targetUrl?: string;
  /** Timestamp display string */
  time: string;
  /** Additional class name */
  className?: string;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of activity items */
  items?: ActivityItemData[];
  /** Show dividers between items */
  dividers?: boolean;
  /** "View all" link URL */
  viewAllUrl?: string;
  /** "View all" link text */
  viewAllText?: string;
  /** Called when view all is clicked */
  onViewAll?: () => void;
  /** Additional class name */
  className?: string;
  children?: ReactNode;
}

export const ActivityItem = forwardRef<HTMLDivElement, ActivityItemProps>(
  (
    {
      name,
      initials,
      avatarUrl,
      avatarColor = '#64748B',
      action,
      target,
      targetUrl,
      time,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = ['oc-activity-item', className].filter(Boolean).join(' ');

    const displayInitials =
      initials ||
      name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
      <div ref={ref} className={classes} {...props}>
        <div
          className="oc-activity-item__avatar"
          style={{
            background: avatarUrl ? `url(${avatarUrl}) center/cover` : avatarColor,
          }}
        >
          {!avatarUrl && displayInitials}
        </div>
        <div className="oc-activity-item__content">
          <p className="oc-activity-item__text">
            <span className="oc-activity-item__name">{name}</span>
            {' '}{action}{' '}
            {targetUrl ? (
              <a href={targetUrl} className="oc-activity-item__target">
                {target}
              </a>
            ) : (
              <span className="oc-activity-item__target">{target}</span>
            )}
          </p>
          <div className="oc-activity-item__time">{time}</div>
        </div>
      </div>
    );
  }
);

ActivityItem.displayName = 'ActivityItem';

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      items,
      dividers = true,
      viewAllUrl,
      viewAllText = 'View all activity',
      onViewAll,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-activity-feed',
      dividers && 'oc-activity-feed--dividers',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleViewAll = () => {
      if (onViewAll) {
        onViewAll();
      }
    };

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-activity-feed__list">
          {items
            ? items.map((item) => (
                <ActivityItem
                  key={item.id}
                  name={item.name}
                  initials={item.initials}
                  avatarUrl={item.avatarUrl}
                  avatarColor={item.avatarColor}
                  action={item.action}
                  target={item.target}
                  targetUrl={item.targetUrl}
                  time={item.time}
                />
              ))
            : children}
        </div>
        {(viewAllUrl || onViewAll) && (
          viewAllUrl ? (
            <a href={viewAllUrl} className="oc-activity-feed__view-all">
              {viewAllText} →
            </a>
          ) : (
            <button
              type="button"
              className="oc-activity-feed__view-all"
              onClick={handleViewAll}
            >
              {viewAllText} →
            </button>
          )
        )}
      </div>
    );
  }
);

ActivityFeed.displayName = 'ActivityFeed';
