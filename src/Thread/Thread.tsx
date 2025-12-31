import React, { forwardRef, ReactNode, HTMLAttributes, createContext, useContext } from 'react';

// ============ Types ============

export type ThreadStatus = 'open' | 'resolved' | 'closed' | 'archived';
export type ResourceType = 'document' | 'collection' | 'annotation' | 'comment' | 'clause' | 'user';
export type ReactionType = 'thumbsUp' | 'thumbsDown' | 'heart' | 'celebrate' | 'thinking' | 'eyes';

// ============ Context ============

interface ThreadContextValue {
  depth: number;
  maxDepth: number;
  collapsed: Set<string>;
  onToggleCollapse?: (id: string) => void;
}

const ThreadContext = createContext<ThreadContextValue>({
  depth: 0,
  maxDepth: 4,
  collapsed: new Set(),
});

// ============ Thread View Container ============

export interface ThreadViewProps extends HTMLAttributes<HTMLDivElement> {
  /** Thread title */
  title?: string;
  /** Thread status */
  status?: ThreadStatus;
  /** Whether thread is pinned */
  pinned?: boolean;
  /** Whether thread is locked (no new replies) */
  locked?: boolean;
  /** Max nesting depth for replies */
  maxDepth?: number;
  /** Set of collapsed reply IDs */
  collapsed?: Set<string>;
  /** Collapse toggle handler */
  onToggleCollapse?: (id: string) => void;
  children: ReactNode;
}

export const ThreadView = forwardRef<HTMLDivElement, ThreadViewProps>(
  (
    {
      title,
      status = 'open',
      pinned = false,
      locked = false,
      maxDepth = 4,
      collapsed = new Set(),
      onToggleCollapse,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-thread-view',
      `oc-thread-view--${status}`,
      pinned && 'oc-thread-view--pinned',
      locked && 'oc-thread-view--locked',
      className,
    ].filter(Boolean).join(' ');

    return (
      <ThreadContext.Provider value={{ depth: 0, maxDepth, collapsed, onToggleCollapse }}>
        <div ref={ref} className={classes} {...props}>
          {(title || pinned || status !== 'open') && (
            <div className="oc-thread-view__header">
              {pinned && (
                <span className="oc-thread-view__pin">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M9.828 1.172a2 2 0 012.828 2.828L9.9 6.757l.778 2.335a1 1 0 01-.253 1.03l-1.415 1.414a1 1 0 01-1.414 0L5.11 9.05l-2.94 2.94a.5.5 0 01-.707-.707l2.94-2.94-2.486-2.486a1 1 0 010-1.414l1.414-1.415a1 1 0 011.03-.253l2.335.778 2.757-2.757z" />
                  </svg>
                  Pinned
                </span>
              )}
              {status !== 'open' && (
                <span className={`oc-thread-view__status oc-thread-view__status--${status}`}>
                  {status === 'resolved' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zm3.354-8.646a.5.5 0 00-.708-.708L6.5 7.793 4.854 6.146a.5.5 0 10-.708.708l2 2a.5.5 0 00.708 0l3.5-3.5z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status === 'closed' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zM5.354 4.646a.5.5 0 10-.708.708L6.293 7l-1.647 1.646a.5.5 0 00.708.708L7 7.707l1.646 1.647a.5.5 0 00.708-.708L7.707 7l1.647-1.646a.5.5 0 00-.708-.708L7 6.293 5.354 4.646z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status === 'archived' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h8a1 1 0 011 1v1H2V3z" />
                      <path fillRule="evenodd" d="M2 5h10v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 2a.5.5 0 000 1h4a.5.5 0 000-1H5z" clipRule="evenodd" />
                    </svg>
                  )}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              )}
              {title && <h2 className="oc-thread-view__title">{title}</h2>}
              {locked && (
                <span className="oc-thread-view__locked">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5V4a3 3 0 116 0v1h.5A1.5 1.5 0 0112 6.5v5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 012 11.5v-5A1.5 1.5 0 013.5 5H4zm2-1a1 1 0 112 0v1H6V4z" clipRule="evenodd" />
                  </svg>
                  Locked
                </span>
              )}
            </div>
          )}
          <div className="oc-thread-view__content">{children}</div>
        </div>
      </ThreadContext.Provider>
    );
  }
);

ThreadView.displayName = 'ThreadView';

// ============ Thread Post (Main Post) ============

export interface ThreadPostProps extends HTMLAttributes<HTMLDivElement> {
  /** Post ID for collapse tracking */
  id?: string;
  /** Author avatar */
  avatar?: ReactNode;
  /** Author name */
  author: string;
  /** Author role/badge (e.g., "Attorney", "Moderator") */
  authorBadge?: string;
  /** Timestamp */
  timestamp?: string;
  /** Edited timestamp */
  editedAt?: string;
  /** Post content */
  children: ReactNode;
  /** Linked resources displayed below content */
  resources?: ReactNode;
  /** Reactions bar */
  reactions?: ReactNode;
  /** Action buttons (reply, edit, delete, etc.) */
  actions?: ReactNode;
  /** Reply count */
  replyCount?: number;
  /** Whether this post is highlighted/focused */
  highlighted?: boolean;
  /** Whether this post is the original/root post */
  isRoot?: boolean;
}

export const ThreadPost = forwardRef<HTMLDivElement, ThreadPostProps>(
  (
    {
      id,
      avatar,
      author,
      authorBadge,
      timestamp,
      editedAt,
      resources,
      reactions,
      actions,
      replyCount,
      highlighted = false,
      isRoot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-thread-post',
      highlighted && 'oc-thread-post--highlighted',
      isRoot && 'oc-thread-post--root',
      className,
    ].filter(Boolean).join(' ');

    return (
      <article ref={ref} className={classes} data-post-id={id} {...props}>
        <div className="oc-thread-post__avatar">{avatar}</div>
        <div className="oc-thread-post__main">
          <header className="oc-thread-post__header">
            <span className="oc-thread-post__author">{author}</span>
            {authorBadge && (
              <span className="oc-thread-post__badge">{authorBadge}</span>
            )}
            {timestamp && (
              <time className="oc-thread-post__time">{timestamp}</time>
            )}
            {editedAt && (
              <span className="oc-thread-post__edited" title={`Edited ${editedAt}`}>
                (edited)
              </span>
            )}
          </header>
          <div className="oc-thread-post__body">{children}</div>
          {resources && (
            <div className="oc-thread-post__resources">{resources}</div>
          )}
          <footer className="oc-thread-post__footer">
            {reactions && (
              <div className="oc-thread-post__reactions">{reactions}</div>
            )}
            {actions && (
              <div className="oc-thread-post__actions">{actions}</div>
            )}
            {replyCount !== undefined && replyCount > 0 && (
              <span className="oc-thread-post__reply-count">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </footer>
        </div>
      </article>
    );
  }
);

ThreadPost.displayName = 'ThreadPost';

// ============ Thread Reply (Nested Reply) ============

export interface ThreadReplyProps extends Omit<ThreadPostProps, 'isRoot' | 'replyCount'> {
  /** Nested replies */
  replies?: ReactNode;
  /** Whether replies are collapsed */
  collapsed?: boolean;
  /** Collapse toggle handler */
  onToggleCollapse?: () => void;
}

export const ThreadReply = forwardRef<HTMLDivElement, ThreadReplyProps>(
  (
    {
      id,
      avatar,
      author,
      authorBadge,
      timestamp,
      editedAt,
      resources,
      reactions,
      actions,
      highlighted = false,
      replies,
      collapsed: propCollapsed,
      onToggleCollapse: propOnToggle,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const ctx = useContext(ThreadContext);
    const depth = ctx.depth;
    const isCollapsed = propCollapsed ?? ctx.collapsed.has(id || '');
    const canNest = depth < ctx.maxDepth;
    const handleToggle = propOnToggle || (id ? () => ctx.onToggleCollapse?.(id) : undefined);

    const classes = [
      'oc-thread-reply',
      `oc-thread-reply--depth-${Math.min(depth, 4)}`,
      highlighted && 'oc-thread-reply--highlighted',
      isCollapsed && 'oc-thread-reply--collapsed',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} data-reply-id={id} {...props}>
        <div className="oc-thread-reply__connector">
          <div className="oc-thread-reply__line" />
        </div>
        <article className="oc-thread-reply__content">
          <div className="oc-thread-reply__avatar">{avatar}</div>
          <div className="oc-thread-reply__main">
            <header className="oc-thread-reply__header">
              <span className="oc-thread-reply__author">{author}</span>
              {authorBadge && (
                <span className="oc-thread-reply__badge">{authorBadge}</span>
              )}
              {timestamp && (
                <time className="oc-thread-reply__time">{timestamp}</time>
              )}
              {editedAt && (
                <span className="oc-thread-reply__edited">(edited)</span>
              )}
            </header>
            {!isCollapsed && (
              <>
                <div className="oc-thread-reply__body">{children}</div>
                {resources && (
                  <div className="oc-thread-reply__resources">{resources}</div>
                )}
              </>
            )}
            <footer className="oc-thread-reply__footer">
              {!isCollapsed && reactions && (
                <div className="oc-thread-reply__reactions">{reactions}</div>
              )}
              {!isCollapsed && actions && (
                <div className="oc-thread-reply__actions">{actions}</div>
              )}
              {replies && handleToggle && (
                <button
                  type="button"
                  className="oc-thread-reply__toggle"
                  onClick={handleToggle}
                  aria-expanded={!isCollapsed}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    className="oc-thread-reply__toggle-icon"
                  >
                    <path d="M3.22 4.22a.75.75 0 011.06 0L6 5.94l1.72-1.72a.75.75 0 111.06 1.06l-2.25 2.25a.75.75 0 01-1.06 0L3.22 5.28a.75.75 0 010-1.06z" />
                  </svg>
                  {isCollapsed ? 'Show replies' : 'Hide replies'}
                </button>
              )}
            </footer>
          </div>
        </article>
        {replies && !isCollapsed && canNest && (
          <ThreadContext.Provider value={{ ...ctx, depth: depth + 1 }}>
            <div className="oc-thread-reply__replies">{replies}</div>
          </ThreadContext.Provider>
        )}
      </div>
    );
  }
);

ThreadReply.displayName = 'ThreadReply';

// ============ Mention (Inline @mention) ============

export interface MentionProps extends HTMLAttributes<HTMLButtonElement> {
  /** User name */
  name: string;
  /** User ID for link/action */
  userId?: string;
  /** Avatar (small) */
  avatar?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export const Mention = forwardRef<HTMLButtonElement, MentionProps>(
  ({ name, userId, avatar, onClick, className = '', ...props }, ref) => {
    const classes = ['oc-mention', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        onClick={onClick}
        data-user-id={userId}
        {...props}
      >
        {avatar && <span className="oc-mention__avatar">{avatar}</span>}
        <span className="oc-mention__at">@</span>
        <span className="oc-mention__name">{name}</span>
      </button>
    );
  }
);

Mention.displayName = 'Mention';

// ============ Linked Resource (Inline resource link) ============

export interface LinkedResourceProps extends HTMLAttributes<HTMLButtonElement> {
  /** Resource type */
  type: ResourceType;
  /** Resource title/name */
  title: string;
  /** Resource ID */
  resourceId?: string;
  /** Reference (e.g., "Section 2.1", "Page 5") */
  reference?: string;
  /** Click handler */
  onClick?: () => void;
}

const resourceIcons: Record<ResourceType, ReactNode> = {
  document: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2 2a1 1 0 011-1h3.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V10a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" />
    </svg>
  ),
  collection: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M1 3.5A1.5 1.5 0 012.5 2h2.764a1.5 1.5 0 011.342.83L7 4h2.5A1.5 1.5 0 0111 5.5v4a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 011 9.5v-6z" />
    </svg>
  ),
  annotation: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M3 2a1 1 0 00-1 1v6a1 1 0 001 1h.5l1 2 1-2H9a1 1 0 001-1V3a1 1 0 00-1-1H3z" />
    </svg>
  ),
  comment: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h6a1 1 0 011 1v5a1 1 0 01-1 1H5.5l-2 2V9H3a1 1 0 01-1-1V3z" />
    </svg>
  ),
  clause: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M3 1.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1zM2 4.5A.5.5 0 012.5 4h7a.5.5 0 01.5.5v6a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-6zM4 6h4M4 8h2" />
    </svg>
  ),
  user: (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 6a2 2 0 100-4 2 2 0 000 4zM2 10.5c0-2 1.79-3.5 4-3.5s4 1.5 4 3.5a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5z" />
    </svg>
  ),
};

const resourceColors: Record<ResourceType, string> = {
  document: 'var(--oc-info, #0891B2)',
  collection: 'var(--oc-warning, #D97706)',
  annotation: 'var(--oc-accent, #0F766E)',
  comment: 'var(--oc-fg-secondary, #475569)',
  clause: 'var(--oc-success, #059669)',
  user: 'var(--oc-accent, #0F766E)',
};

export const LinkedResource = forwardRef<HTMLButtonElement, LinkedResourceProps>(
  ({ type, title, resourceId, reference, onClick, className = '', ...props }, ref) => {
    const classes = [
      'oc-linked-resource',
      `oc-linked-resource--${type}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        onClick={onClick}
        data-resource-id={resourceId}
        style={{ '--resource-color': resourceColors[type] } as React.CSSProperties}
        {...props}
      >
        <span className="oc-linked-resource__icon">{resourceIcons[type]}</span>
        <span className="oc-linked-resource__title">{title}</span>
        {reference && (
          <span className="oc-linked-resource__ref">{reference}</span>
        )}
      </button>
    );
  }
);

LinkedResource.displayName = 'LinkedResource';

// ============ Resource List (Attached resources) ============

export interface ResourceListProps extends HTMLAttributes<HTMLDivElement> {
  /** Section label */
  label?: string;
  children: ReactNode;
}

export const ResourceList = forwardRef<HTMLDivElement, ResourceListProps>(
  ({ label, className = '', children, ...props }, ref) => {
    const classes = ['oc-resource-list', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {label && <span className="oc-resource-list__label">{label}</span>}
        <div className="oc-resource-list__items">{children}</div>
      </div>
    );
  }
);

ResourceList.displayName = 'ResourceList';

// ============ Reaction Button ============

export interface ReactionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Reaction type */
  reaction: ReactionType;
  /** Count */
  count?: number;
  /** Whether current user has reacted */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
}

const reactionEmojis: Record<ReactionType, string> = {
  thumbsUp: '\uD83D\uDC4D',
  thumbsDown: '\uD83D\uDC4E',
  heart: '\u2764\uFE0F',
  celebrate: '\uD83C\uDF89',
  thinking: '\uD83E\uDD14',
  eyes: '\uD83D\uDC40',
};

export const ReactionButton = forwardRef<HTMLButtonElement, ReactionButtonProps>(
  ({ reaction, count = 0, active = false, onClick, className = '', ...props }, ref) => {
    const classes = [
      'oc-reaction-button',
      active && 'oc-reaction-button--active',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        onClick={onClick}
        aria-pressed={active}
        {...props}
      >
        <span className="oc-reaction-button__emoji">{reactionEmojis[reaction]}</span>
        {count > 0 && <span className="oc-reaction-button__count">{count}</span>}
      </button>
    );
  }
);

ReactionButton.displayName = 'ReactionButton';

// ============ Reaction Bar ============

export interface ReactionBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Add reaction button */
  onAddReaction?: () => void;
  children?: ReactNode;
}

export const ReactionBar = forwardRef<HTMLDivElement, ReactionBarProps>(
  ({ onAddReaction, className = '', children, ...props }, ref) => {
    const classes = ['oc-reaction-bar', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="group" aria-label="Reactions" {...props}>
        {children}
        {onAddReaction && (
          <button
            type="button"
            className="oc-reaction-bar__add"
            onClick={onAddReaction}
            aria-label="Add reaction"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zM7 1a6 6 0 100 12A6 6 0 007 1z" clipRule="evenodd" />
              <path d="M4.5 5.5a.75.75 0 100 1.5.75.75 0 000-1.5zM8.75 6.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM4.75 9a.5.5 0 000 1c.83 0 1.5.34 2 .75.5-.41 1.17-.75 2-.75a.5.5 0 000-1c-1.06 0-1.87.47-2.25.97-.38-.5-1.19-.97-2.25-.97z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

ReactionBar.displayName = 'ReactionBar';

// ============ Thread Actions (Reply, Edit, Delete, etc.) ============

export interface ThreadActionProps extends HTMLAttributes<HTMLButtonElement> {
  /** Action icon */
  icon: ReactNode;
  /** Action label */
  label: string;
  /** Whether action is destructive */
  destructive?: boolean;
}

export const ThreadAction = forwardRef<HTMLButtonElement, ThreadActionProps>(
  ({ icon, label, destructive = false, className = '', ...props }, ref) => {
    const classes = [
      'oc-thread-action',
      destructive && 'oc-thread-action--destructive',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        aria-label={label}
        {...props}
      >
        {icon}
        <span className="oc-thread-action__label">{label}</span>
      </button>
    );
  }
);

ThreadAction.displayName = 'ThreadAction';

// ============ Thread Input (Reuses ChatInput pattern) ============

export interface ThreadInputProps extends HTMLAttributes<HTMLDivElement> {
  /** Placeholder text */
  placeholder?: string;
  /** Reply-to context */
  replyingTo?: ReactNode;
  /** Cancel reply handler */
  onCancelReply?: () => void;
  /** Input element (render prop or ChatInput) */
  children: ReactNode;
}

export const ThreadInput = forwardRef<HTMLDivElement, ThreadInputProps>(
  ({ placeholder, replyingTo, onCancelReply, className = '', children, ...props }, ref) => {
    const classes = ['oc-thread-input', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {replyingTo && (
          <div className="oc-thread-input__replying">
            <span className="oc-thread-input__replying-label">Replying to</span>
            {replyingTo}
            {onCancelReply && (
              <button
                type="button"
                className="oc-thread-input__cancel"
                onClick={onCancelReply}
                aria-label="Cancel reply"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L7 5.586l1.293-1.293a1 1 0 111.414 1.414L8.414 7l1.293 1.293a1 1 0 01-1.414 1.414L7 8.414l-1.293 1.293a1 1 0 01-1.414-1.414L5.586 7 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

ThreadInput.displayName = 'ThreadInput';

// ============ Thread Metadata ============

export interface ThreadMetaProps extends HTMLAttributes<HTMLDivElement> {
  /** View count */
  views?: number;
  /** Reply count */
  replies?: number;
  /** Participant avatars */
  participants?: ReactNode;
  /** Last activity timestamp */
  lastActivity?: string;
}

export const ThreadMeta = forwardRef<HTMLDivElement, ThreadMetaProps>(
  ({ views, replies, participants, lastActivity, className = '', ...props }, ref) => {
    const classes = ['oc-thread-meta', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {views !== undefined && (
          <span className="oc-thread-meta__item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 4c-2.5 0-4.5 1.5-5.5 3 1 1.5 3 3 5.5 3s4.5-1.5 5.5-3c-1-1.5-3-3-5.5-3z" />
              <circle cx="7" cy="7" r="1.5" />
            </svg>
            {views.toLocaleString()}
          </span>
        )}
        {replies !== undefined && (
          <span className="oc-thread-meta__item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
            </svg>
            {replies}
          </span>
        )}
        {participants && (
          <div className="oc-thread-meta__participants">{participants}</div>
        )}
        {lastActivity && (
          <span className="oc-thread-meta__activity">
            Last activity {lastActivity}
          </span>
        )}
      </div>
    );
  }
);

ThreadMeta.displayName = 'ThreadMeta';
