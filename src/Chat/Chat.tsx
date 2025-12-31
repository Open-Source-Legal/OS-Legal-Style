import React, { forwardRef, ReactNode, HTMLAttributes, TextareaHTMLAttributes, useState, useRef, useEffect } from 'react';

export type MessageRole = 'user' | 'assistant' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'error';

// ============ Chat Message ============

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Message role determines styling */
  role: MessageRole;
  /** Avatar element */
  avatar?: ReactNode;
  /** Sender name */
  name?: string;
  /** Timestamp */
  timestamp?: string;
  /** Message status */
  status?: MessageStatus;
  /** Actions (copy, regenerate, etc.) */
  actions?: ReactNode;
  /** Is this message currently streaming? */
  streaming?: boolean;
  /** Message content */
  children: ReactNode;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      role,
      avatar,
      name,
      timestamp,
      status,
      actions,
      streaming = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-chat-message',
      `oc-chat-message--${role}`,
      streaming && 'oc-chat-message--streaming',
      status && `oc-chat-message--${status}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {avatar && <div className="oc-chat-message__avatar">{avatar}</div>}
        <div className="oc-chat-message__container">
          {(name || timestamp) && (
            <div className="oc-chat-message__header">
              {name && <span className="oc-chat-message__name">{name}</span>}
              {timestamp && <span className="oc-chat-message__time">{timestamp}</span>}
            </div>
          )}
          <div className="oc-chat-message__bubble">
            <div className="oc-chat-message__content">{children}</div>
            {streaming && <span className="oc-chat-message__cursor" />}
          </div>
          {actions && <div className="oc-chat-message__actions">{actions}</div>}
          {status === 'error' && (
            <div className="oc-chat-message__error">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path fillRule="evenodd" d="M7 14A7 7 0 107 0a7 7 0 000 14zM6 4a1 1 0 112 0v3a1 1 0 11-2 0V4zm1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Failed to send
            </div>
          )}
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';

// ============ Thinking Block ============

export interface ThinkingBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** Title for the thinking section */
  title?: string;
  /** Is it currently expanded? */
  expanded?: boolean;
  /** Toggle expand handler */
  onToggle?: () => void;
  /** Content of thinking */
  children?: ReactNode;
}

export const ThinkingBlock = forwardRef<HTMLDivElement, ThinkingBlockProps>(
  ({ title = 'Thinking...', expanded = false, onToggle, className = '', children, ...props }, ref) => {
    const classes = [
      'oc-thinking-block',
      expanded && 'oc-thinking-block--expanded',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <button className="oc-thinking-block__header" onClick={onToggle} type="button">
          <div className="oc-thinking-block__indicator">
            <span className="oc-thinking-block__dot" />
            <span className="oc-thinking-block__dot" />
            <span className="oc-thinking-block__dot" />
          </div>
          <span className="oc-thinking-block__title">{title}</span>
          <svg
            className="oc-thinking-block__chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
          </svg>
        </button>
        {expanded && children && (
          <div className="oc-thinking-block__content">{children}</div>
        )}
      </div>
    );
  }
);

ThinkingBlock.displayName = 'ThinkingBlock';

// ============ Typing Indicator ============

export interface TypingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Who is typing */
  label?: string;
}

export const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ label, className = '', ...props }, ref) => {
    const classes = ['oc-typing-indicator', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-typing-indicator__dots">
          <span className="oc-typing-indicator__dot" />
          <span className="oc-typing-indicator__dot" />
          <span className="oc-typing-indicator__dot" />
        </div>
        {label && <span className="oc-typing-indicator__label">{label}</span>}
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';

// ============ Task Card ============

export type TaskStatus = 'pending' | 'running' | 'completed' | 'error';

export interface TaskCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Task title */
  title: string;
  /** Task description */
  description?: string;
  /** Task status */
  status?: TaskStatus;
  /** Progress (0-100) */
  progress?: number;
  /** Icon */
  icon?: ReactNode;
}

export const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ title, description, status = 'pending', progress, icon, className = '', ...props }, ref) => {
    const classes = [
      'oc-task-card',
      `oc-task-card--${status}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="oc-task-card__icon">
          {icon || (
            status === 'completed' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm3.78-9.72a.75.75 0 00-1.06-1.06L7 8.94 5.28 7.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l4.25-4.25z" clipRule="evenodd" />
              </svg>
            ) : status === 'error' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zM6.28 5.22a.75.75 0 00-1.06 1.06L6.94 8l-1.72 1.72a.75.75 0 101.06 1.06L8 9.06l1.72 1.72a.75.75 0 101.06-1.06L9.06 8l1.72-1.72a.75.75 0 00-1.06-1.06L8 6.94 6.28 5.22z" clipRule="evenodd" />
              </svg>
            ) : status === 'running' ? (
              <div className="oc-task-card__spinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z" clipRule="evenodd" />
              </svg>
            )
          )}
        </div>
        <div className="oc-task-card__content">
          <div className="oc-task-card__title">{title}</div>
          {description && <div className="oc-task-card__desc">{description}</div>}
          {progress !== undefined && status === 'running' && (
            <div className="oc-task-card__progress">
              <div
                className="oc-task-card__progress-bar"
                style={{ '--progress': `${progress}%` } as React.CSSProperties}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TaskCard.displayName = 'TaskCard';

// ============ Message Actions ============

export interface MessageActionsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const MessageActions = forwardRef<HTMLDivElement, MessageActionsProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-message-actions', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} role="group" {...props}>
        {children}
      </div>
    );
  }
);

MessageActions.displayName = 'MessageActions';

export interface ActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /** Icon */
  icon: ReactNode;
  /** Tooltip label */
  label: string;
  /** Active state */
  active?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, active = false, className = '', ...props }, ref) => {
    const classes = [
      'oc-action-button',
      active && 'oc-action-button--active',
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        type="button"
        aria-label={label}
        title={label}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

// ============ Chat Input ============

export interface ChatInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onSubmit'> {
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Is submitting/loading */
  loading?: boolean;
  /** Left side actions (attach, etc.) */
  leftActions?: ReactNode;
  /** Right side actions (send, etc.) */
  rightActions?: ReactNode;
  /** Suggestion chips above input */
  suggestions?: ReactNode;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      value = '',
      onChange,
      onSubmit,
      placeholder = 'Type a message...',
      loading = false,
      leftActions,
      rightActions,
      suggestions,
      className = '',
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const currentValue = value !== undefined ? value : internalValue;

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
      }
    }, [currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (currentValue.trim() && !loading) {
          onSubmit?.(currentValue);
          setInternalValue('');
          onChange?.('');
        }
      }
      onKeyDown?.(e);
    };

    const handleSubmit = () => {
      if (currentValue.trim() && !loading) {
        onSubmit?.(currentValue);
        setInternalValue('');
        onChange?.('');
      }
    };

    const classes = [
      'oc-chat-input',
      loading && 'oc-chat-input--loading',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={classes}>
        {suggestions && <div className="oc-chat-input__suggestions">{suggestions}</div>}
        <div className="oc-chat-input__container">
          {leftActions && <div className="oc-chat-input__left">{leftActions}</div>}
          <textarea
            ref={(node) => {
              (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            }}
            className="oc-chat-input__textarea"
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={loading}
            {...props}
          />
          <div className="oc-chat-input__right">
            {rightActions || (
              <button
                className="oc-chat-input__send"
                onClick={handleSubmit}
                disabled={!currentValue.trim() || loading}
                type="button"
                aria-label="Send message"
              >
                {loading ? (
                  <div className="oc-chat-input__spinner" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';

// ============ Chat Container ============

export interface ChatContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-chat-container', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export const ChatMessages = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-chat-messages', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ChatMessages.displayName = 'ChatMessages';
