import React, { forwardRef, ReactNode, HTMLAttributes, createContext, useContext } from 'react';

// ============ Types ============

export type DiscussionCategory = 'general' | 'question' | 'announcement' | 'idea' | 'help' | 'show' | string;
export type DiscussionStatus = 'open' | 'answered' | 'resolved' | 'closed' | 'pinned';
export type DiscussionSortOption = 'newest' | 'oldest' | 'mostReplies' | 'recentActivity' | 'mostVotes';

export interface DiscussionAuthor {
  name: string;
  avatar?: ReactNode;
  badge?: string;
}

// ============ Context ============

interface DiscussionListContextValue {
  variant: 'card' | 'compact' | 'minimal';
  onItemClick?: (id: string) => void;
}

const DiscussionListContext = createContext<DiscussionListContextValue>({
  variant: 'card',
});

// ============ Category Badge Component ============

const categoryConfig: Record<string, { color: string; label: string; icon: ReactNode }> = {
  general: {
    color: 'var(--oc-fg-secondary, #475569)',
    label: 'General',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1a5 5 0 100 10A5 5 0 006 1zM0 6a6 6 0 1112 0A6 6 0 010 6z" />
        <circle cx="6" cy="6" r="2" />
      </svg>
    ),
  },
  question: {
    color: 'var(--oc-info, #0891B2)',
    label: 'Question',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1a5 5 0 100 10A5 5 0 006 1zM0 6a6 6 0 1112 0A6 6 0 010 6zm6-2.5a1 1 0 00-.867.5.5.5 0 11-.866-.5A2 2 0 118 5c0 .734-.432 1.132-.774 1.39a2.16 2.16 0 01-.226.155V7a.5.5 0 01-1 0v-.75a.5.5 0 01.5-.5c.286 0 .516-.099.696-.232.175-.13.304-.293.304-.518a1 1 0 00-1.5-.866zM6 9a.5.5 0 100-1 .5.5 0 000 1z" />
      </svg>
    ),
  },
  announcement: {
    color: 'var(--oc-warning, #D97706)',
    label: 'Announcement',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1.5a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1A.75.75 0 016 1.5zM2.343 3.757a.75.75 0 011.06 0l.708.708a.75.75 0 11-1.06 1.06l-.708-.707a.75.75 0 010-1.061zM10.364 4.464a.75.75 0 010 1.061l-.707.708a.75.75 0 11-1.06-1.06l.707-.709a.75.75 0 011.06 0zM1 7.25a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1A.75.75 0 011 7.25zm8.25-.75a.75.75 0 000 1.5h1a.75.75 0 000-1.5h-1zM6 5.5A1.75 1.75 0 004.25 7.25v.5c0 .69.4 1.286.979 1.57L5 11h2l-.229-1.68a1.75 1.75 0 00.979-1.57v-.5A1.75 1.75 0 006 5.5z" />
      </svg>
    ),
  },
  idea: {
    color: 'var(--oc-success, #059669)',
    label: 'Idea',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1a4 4 0 00-2.5 7.118V9.5A1.5 1.5 0 005 11h2a1.5 1.5 0 001.5-1.5V8.118A4 4 0 006 1zM4.5 9.5V8.809a.5.5 0 01.203-.402A3 3 0 106 2a3 3 0 001.297 5.407.5.5 0 01.203.402V9.5a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5z" />
      </svg>
    ),
  },
  help: {
    color: 'var(--oc-error, #DC2626)',
    label: 'Help Wanted',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 1a5 5 0 100 10A5 5 0 006 1zm-.75 2.75a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5zM6 9a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
  },
  show: {
    color: 'var(--oc-accent, #0F766E)',
    label: 'Show & Tell',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M1.5 2A1.5 1.5 0 000 3.5v5A1.5 1.5 0 001.5 10h9A1.5 1.5 0 0012 8.5v-5A1.5 1.5 0 0010.5 2h-9zM1 3.5a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-5z" />
        <path d="M4.5 5L7.5 6.5 4.5 8V5z" />
      </svg>
    ),
  },
};

export interface CategoryBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  category: DiscussionCategory;
}

export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, className = '', ...props }, ref) => {
    const config = categoryConfig[category] || categoryConfig.general;
    const classes = ['oc-category-badge', className].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        style={{ '--category-color': config.color } as React.CSSProperties}
        {...props}
      >
        {config.icon}
        <span className="oc-category-badge__label">{config.label}</span>
      </span>
    );
  }
);

CategoryBadge.displayName = 'CategoryBadge';

// ============ Discussion Item ============

export interface DiscussionItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique identifier */
  id: string;
  /** Discussion title */
  title: string;
  /** Author information */
  author: DiscussionAuthor;
  /** Category/type */
  category?: DiscussionCategory;
  /** Discussion status */
  status?: DiscussionStatus;
  /** Preview/excerpt text */
  preview?: string;
  /** Tags/labels */
  tags?: string[];
  /** Reply count */
  replyCount?: number;
  /** View count */
  viewCount?: number;
  /** Upvote/reaction count */
  voteCount?: number;
  /** Whether current user has voted */
  hasVoted?: boolean;
  /** Participant avatars */
  participants?: ReactNode;
  /** Time since creation */
  createdAt?: string;
  /** Time since last activity */
  lastActivity?: string;
  /** Whether pinned */
  pinned?: boolean;
  /** Whether discussion is unread */
  unread?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Vote handler */
  onVote?: () => void;
}

export const DiscussionItem = forwardRef<HTMLDivElement, DiscussionItemProps>(
  (
    {
      id,
      title,
      author,
      category,
      status,
      preview,
      tags,
      replyCount = 0,
      viewCount,
      voteCount = 0,
      hasVoted = false,
      participants,
      createdAt,
      lastActivity,
      pinned = false,
      unread = false,
      onClick,
      onVote,
      className = '',
      ...props
    },
    ref
  ) => {
    const ctx = useContext(DiscussionListContext);
    const variant = ctx.variant;

    const classes = [
      'oc-discussion-item',
      `oc-discussion-item--${variant}`,
      pinned && 'oc-discussion-item--pinned',
      unread && 'oc-discussion-item--unread',
      status === 'answered' && 'oc-discussion-item--answered',
      status === 'resolved' && 'oc-discussion-item--resolved',
      status === 'closed' && 'oc-discussion-item--closed',
      className,
    ].filter(Boolean).join(' ');

    const handleClick = () => {
      onClick?.();
      ctx.onItemClick?.(id);
    };

    const handleVote = (e: React.MouseEvent) => {
      e.stopPropagation();
      onVote?.();
    };

    const StatusIcon = () => {
      if (status === 'answered' || status === 'resolved') {
        return (
          <span className="oc-discussion-item__status-icon oc-discussion-item__status-icon--resolved">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L6.5 9.44 5.28 8.22a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l4.75-4.75z" clipRule="evenodd" />
            </svg>
          </span>
        );
      }
      if (pinned) {
        return (
          <span className="oc-discussion-item__status-icon oc-discussion-item__status-icon--pinned">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M9.828 1.172a2.5 2.5 0 013.536 3.536l-2.829 2.828.707 2.121a1.25 1.25 0 01-.316 1.288l-1.768 1.768a1.25 1.25 0 01-1.768 0L5.268 10.59l-3.182 3.182a.625.625 0 11-.884-.884l3.182-3.182-2.122-2.122a1.25 1.25 0 010-1.768l1.768-1.768a1.25 1.25 0 011.288-.316l2.121.707 2.829-2.829z" />
            </svg>
          </span>
        );
      }
      return null;
    };

    // Compact variant (like Linear/Notion)
    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          className={classes}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          data-discussion-id={id}
          {...props}
        >
          <div className="oc-discussion-item__leading">
            <StatusIcon />
            {category && <CategoryBadge category={category} />}
          </div>
          <div className="oc-discussion-item__content">
            <h3 className="oc-discussion-item__title">{title}</h3>
            {tags && tags.length > 0 && (
              <div className="oc-discussion-item__tags">
                {tags.map((tag) => (
                  <span key={tag} className="oc-discussion-item__tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          <div className="oc-discussion-item__meta">
            {replyCount > 0 && (
              <span className="oc-discussion-item__replies">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
                {replyCount}
              </span>
            )}
            {lastActivity && (
              <span className="oc-discussion-item__time">{lastActivity}</span>
            )}
          </div>
        </div>
      );
    }

    // Minimal variant (just title + meta)
    if (variant === 'minimal') {
      return (
        <div
          ref={ref}
          className={classes}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          data-discussion-id={id}
          {...props}
        >
          <div className="oc-discussion-item__avatar">{author.avatar}</div>
          <div className="oc-discussion-item__content">
            <h3 className="oc-discussion-item__title">{title}</h3>
            <span className="oc-discussion-item__byline">
              {author.name} {createdAt && <span className="oc-discussion-item__time">{createdAt}</span>}
            </span>
          </div>
          {replyCount > 0 && (
            <span className="oc-discussion-item__replies">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
              </svg>
              {replyCount}
            </span>
          )}
        </div>
      );
    }

    // Default card variant (like Reddit/GitHub Discussions)
    return (
      <article
        ref={ref}
        className={classes}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        data-discussion-id={id}
        {...props}
      >
        {/* Vote column */}
        <div className="oc-discussion-item__votes">
          <button
            type="button"
            className={`oc-discussion-item__vote-btn ${hasVoted ? 'oc-discussion-item__vote-btn--active' : ''}`}
            onClick={handleVote}
            aria-label={hasVoted ? 'Remove vote' : 'Upvote'}
            aria-pressed={hasVoted}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2.5l5 5H9.5V13h-3V7.5H3l5-5z" />
            </svg>
          </button>
          <span className="oc-discussion-item__vote-count">{voteCount}</span>
        </div>

        {/* Main content */}
        <div className="oc-discussion-item__main">
          <header className="oc-discussion-item__header">
            <div className="oc-discussion-item__header-left">
              <StatusIcon />
              {category && <CategoryBadge category={category} />}
              {tags && tags.length > 0 && (
                <div className="oc-discussion-item__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="oc-discussion-item__tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            {lastActivity && (
              <span className="oc-discussion-item__activity">
                {lastActivity}
              </span>
            )}
          </header>

          <h3 className="oc-discussion-item__title">{title}</h3>

          {preview && (
            <p className="oc-discussion-item__preview">{preview}</p>
          )}

          <footer className="oc-discussion-item__footer">
            <div className="oc-discussion-item__author">
              {author.avatar}
              <span className="oc-discussion-item__author-name">{author.name}</span>
              {author.badge && (
                <span className="oc-discussion-item__author-badge">{author.badge}</span>
              )}
              {createdAt && (
                <span className="oc-discussion-item__created">{createdAt}</span>
              )}
            </div>

            <div className="oc-discussion-item__stats">
              {viewCount !== undefined && (
                <span className="oc-discussion-item__stat">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M7 4c-2.5 0-4.5 1.5-5.5 3 1 1.5 3 3 5.5 3s4.5-1.5 5.5-3c-1-1.5-3-3-5.5-3z" />
                    <circle cx="7" cy="7" r="1.5" />
                  </svg>
                  {viewCount}
                </span>
              )}
              <span className="oc-discussion-item__stat">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
                {replyCount}
              </span>
              {participants}
            </div>
          </footer>
        </div>
      </article>
    );
  }
);

DiscussionItem.displayName = 'DiscussionItem';

// ============ Discussion List ============

export interface DiscussionListProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'card' | 'compact' | 'minimal';
  /** Handler when item is clicked */
  onItemClick?: (id: string) => void;
  /** Empty state content */
  emptyState?: ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Children (DiscussionItem components) */
  children?: ReactNode;
}

export const DiscussionList = forwardRef<HTMLDivElement, DiscussionListProps>(
  (
    {
      variant = 'card',
      onItemClick,
      emptyState,
      loading = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-discussion-list',
      `oc-discussion-list--${variant}`,
      loading && 'oc-discussion-list--loading',
      className,
    ].filter(Boolean).join(' ');

    const hasChildren = React.Children.count(children) > 0;

    return (
      <DiscussionListContext.Provider value={{ variant, onItemClick }}>
        <div ref={ref} className={classes} role="list" {...props}>
          {loading ? (
            <div className="oc-discussion-list__loading">
              <div className="oc-discussion-list__skeleton" />
              <div className="oc-discussion-list__skeleton" />
              <div className="oc-discussion-list__skeleton" />
            </div>
          ) : hasChildren ? (
            children
          ) : (
            emptyState
          )}
        </div>
      </DiscussionListContext.Provider>
    );
  }
);

DiscussionList.displayName = 'DiscussionList';

// ============ Discussion Filters ============

export interface DiscussionFilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface DiscussionFiltersProps extends HTMLAttributes<HTMLDivElement> {
  /** Category filter options */
  categories?: DiscussionFilterOption[];
  /** Active category ID */
  activeCategory?: string;
  /** Category change handler */
  onCategoryChange?: (id: string) => void;
  /** Sort options */
  sortOptions?: { id: DiscussionSortOption; label: string }[];
  /** Active sort option */
  activeSort?: DiscussionSortOption;
  /** Sort change handler */
  onSortChange?: (sort: DiscussionSortOption) => void;
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Search placeholder */
  searchPlaceholder?: string;
}

export const DiscussionFilters = forwardRef<HTMLDivElement, DiscussionFiltersProps>(
  (
    {
      categories,
      activeCategory,
      onCategoryChange,
      sortOptions,
      activeSort,
      onSortChange,
      searchValue,
      onSearchChange,
      searchPlaceholder = 'Search discussions...',
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = ['oc-discussion-filters', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {categories && categories.length > 0 && (
          <div className="oc-discussion-filters__categories" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`oc-discussion-filters__category ${activeCategory === cat.id ? 'oc-discussion-filters__category--active' : ''}`}
                onClick={() => onCategoryChange?.(cat.id)}
              >
                {cat.label}
                {cat.count !== undefined && (
                  <span className="oc-discussion-filters__count">{cat.count}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="oc-discussion-filters__actions">
          {onSearchChange && (
            <div className="oc-discussion-filters__search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="oc-discussion-filters__search-icon">
                <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l2.79 2.79a.75.75 0 11-1.06 1.06l-2.79-2.79z" clipRule="evenodd" />
              </svg>
              <input
                type="search"
                className="oc-discussion-filters__search-input"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}

          {sortOptions && sortOptions.length > 0 && (
            <select
              className="oc-discussion-filters__sort"
              value={activeSort}
              onChange={(e) => onSortChange?.(e.target.value as DiscussionSortOption)}
              aria-label="Sort discussions"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  }
);

DiscussionFilters.displayName = 'DiscussionFilters';

// ============ New Discussion Button ============

export interface NewDiscussionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon to display */
  icon?: ReactNode;
  /** Button text */
  children?: ReactNode;
}

export const NewDiscussionButton = forwardRef<HTMLButtonElement, NewDiscussionButtonProps>(
  ({ icon, className = '', children = 'New Discussion', ...props }, ref) => {
    const classes = ['oc-new-discussion-btn', className].filter(Boolean).join(' ');

    return (
      <button ref={ref} type="button" className={classes} {...props}>
        {icon || (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z" />
          </svg>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

NewDiscussionButton.displayName = 'NewDiscussionButton';

// ============ Discussion Stats Summary ============

export interface DiscussionStatsProps extends HTMLAttributes<HTMLDivElement> {
  /** Total discussion count */
  totalCount?: number;
  /** Open/active count */
  openCount?: number;
  /** Answered/resolved count */
  answeredCount?: number;
  /** Participants count */
  participantCount?: number;
}

export const DiscussionStats = forwardRef<HTMLDivElement, DiscussionStatsProps>(
  (
    { totalCount, openCount, answeredCount, participantCount, className = '', ...props },
    ref
  ) => {
    const classes = ['oc-discussion-stats', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {totalCount !== undefined && (
          <div className="oc-discussion-stats__item">
            <span className="oc-discussion-stats__value">{totalCount}</span>
            <span className="oc-discussion-stats__label">discussions</span>
          </div>
        )}
        {openCount !== undefined && (
          <div className="oc-discussion-stats__item">
            <span className="oc-discussion-stats__value">{openCount}</span>
            <span className="oc-discussion-stats__label">open</span>
          </div>
        )}
        {answeredCount !== undefined && (
          <div className="oc-discussion-stats__item oc-discussion-stats__item--answered">
            <span className="oc-discussion-stats__value">{answeredCount}</span>
            <span className="oc-discussion-stats__label">answered</span>
          </div>
        )}
        {participantCount !== undefined && (
          <div className="oc-discussion-stats__item">
            <span className="oc-discussion-stats__value">{participantCount}</span>
            <span className="oc-discussion-stats__label">participants</span>
          </div>
        )}
      </div>
    );
  }
);

DiscussionStats.displayName = 'DiscussionStats';
