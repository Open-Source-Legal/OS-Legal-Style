import React, { forwardRef, ReactNode, HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';

// ============ Hero Container ============

export type HeroVariant = 'default' | 'centered' | 'split';
export type HeroSize = 'sm' | 'md' | 'lg';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: HeroVariant;
  /** Size controls padding */
  size?: HeroSize;
  /** Show floating background decorations */
  showDecorations?: boolean;
  /** Custom background gradient or color */
  background?: string;
  /** Content */
  children: ReactNode;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      variant = 'centered',
      size = 'md',
      showDecorations = false,
      background,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-hero',
      `oc-hero--${variant}`,
      `oc-hero--${size}`,
      showDecorations && 'oc-hero--with-decorations',
      className,
    ].filter(Boolean).join(' ');

    return (
      <section
        ref={ref}
        className={classes}
        style={{ ...style, ...(background ? { background } : {}) }}
        {...props}
      >
        {showDecorations && <HeroDecorations />}
        <div className="oc-hero__inner">
          {children}
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

// ============ Hero Decorations ============

const HeroDecorations = () => (
  <div className="oc-hero__decorations" aria-hidden="true">
    <div className="oc-hero__decoration oc-hero__decoration--1">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
        <path d="M8 8a4 4 0 014-4h16l12 12v24a4 4 0 01-4 4H12a4 4 0 01-4-4V8z" />
      </svg>
    </div>
    <div className="oc-hero__decoration oc-hero__decoration--2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M6 6a2 2 0 012-2h10l8 8v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
      </svg>
    </div>
    <div className="oc-hero__decoration oc-hero__decoration--3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
        <path d="M6 6a3 3 0 013-3h14l10 10v18a3 3 0 01-3 3H9a3 3 0 01-3-3V6z" />
      </svg>
    </div>
    <div className="oc-hero__decoration oc-hero__decoration--4">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="currentColor">
        <path d="M5 5a2 2 0 012-2h12l9 9v17a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
      </svg>
    </div>
  </div>
);

// ============ Hero Badge ============

export interface HeroBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Icon to display before text */
  icon?: ReactNode;
  /** Badge text */
  children: ReactNode;
}

export const HeroBadge = forwardRef<HTMLDivElement, HeroBadgeProps>(
  ({ icon, className = '', children, ...props }, ref) => {
    const classes = ['oc-hero-badge', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {icon && <span className="oc-hero-badge__icon">{icon}</span>}
        <span className="oc-hero-badge__text">{children}</span>
      </div>
    );
  }
);

HeroBadge.displayName = 'HeroBadge';

// ============ Hero Title ============

export interface HeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Use gradient text */
  gradient?: boolean;
  /** Heading level */
  as?: 'h1' | 'h2' | 'h3';
  /** Title text */
  children: ReactNode;
}

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ gradient = true, as: Component = 'h1', className = '', children, ...props }, ref) => {
    const classes = [
      'oc-hero-title',
      gradient && 'oc-hero-title--gradient',
      className,
    ].filter(Boolean).join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

HeroTitle.displayName = 'HeroTitle';

// ============ Hero Subtitle ============

export interface HeroSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Subtitle text */
  children: ReactNode;
}

export const HeroSubtitle = forwardRef<HTMLParagraphElement, HeroSubtitleProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-hero-subtitle', className].filter(Boolean).join(' ');

    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);

HeroSubtitle.displayName = 'HeroSubtitle';

// ============ Hero Search ============

export interface HeroSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  /** Input placeholder */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Button text */
  buttonText?: string;
  /** Button icon */
  buttonIcon?: ReactNode;
  /** Loading state */
  loading?: boolean;
}

export const HeroSearch = forwardRef<HTMLDivElement, HeroSearchProps>(
  (
    {
      placeholder = 'Search...',
      value = '',
      onChange,
      onSubmit,
      buttonText = 'Search',
      buttonIcon,
      loading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (currentValue.trim() && !loading) {
        onSubmit?.(currentValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    };

    const classes = [
      'oc-hero-search',
      loading && 'oc-hero-search--loading',
      className,
    ].filter(Boolean).join(' ');

    const defaultIcon = (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path fillRule="evenodd" d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" clipRule="evenodd" />
      </svg>
    );

    return (
      <div ref={ref} className={classes} {...props}>
        <input
          type="text"
          className="oc-hero-search__input"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className="oc-hero-search__button"
          onClick={handleSubmit}
          disabled={loading || !currentValue.trim()}
          type="button"
        >
          {loading ? (
            <span className="oc-hero-search__spinner" />
          ) : (
            <>
              {buttonIcon || defaultIcon}
              {buttonText && <span>{buttonText}</span>}
            </>
          )}
        </button>
      </div>
    );
  }
);

HeroSearch.displayName = 'HeroSearch';

// ============ Hero Actions ============

export interface HeroActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Action buttons/links */
  children: ReactNode;
}

export const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-hero-actions', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

HeroActions.displayName = 'HeroActions';

// ============ Hero Action Button ============

export interface HeroActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display */
  icon?: ReactNode;
  /** Button text */
  children: ReactNode;
}

export const HeroAction = forwardRef<HTMLButtonElement, HeroActionProps>(
  ({ icon, className = '', children, ...props }, ref) => {
    const classes = ['oc-hero-action', className].filter(Boolean).join(' ');

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {icon && <span className="oc-hero-action__icon">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);

HeroAction.displayName = 'HeroAction';

// ============ Hero Content (for split layout) ============

export interface HeroContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Content alignment */
  align?: 'left' | 'center' | 'right';
  /** Content */
  children: ReactNode;
}

export const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  ({ align = 'left', className = '', children, ...props }, ref) => {
    const classes = [
      'oc-hero-content',
      `oc-hero-content--${align}`,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

HeroContent.displayName = 'HeroContent';

// ============ Hero Media (for split layout) ============

export interface HeroMediaProps extends HTMLAttributes<HTMLDivElement> {
  /** Media content (image, illustration, etc.) */
  children: ReactNode;
}

export const HeroMedia = forwardRef<HTMLDivElement, HeroMediaProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-hero-media', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

HeroMedia.displayName = 'HeroMedia';

// ============ Common Icons ============

export const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a1 1 0 011 1v1.5a1 1 0 11-2 0V1a1 1 0 011-1zm4.95 2.636a1 1 0 010 1.414l-1.06 1.06a1 1 0 11-1.415-1.414l1.06-1.06a1 1 0 011.415 0zM15 7a1 1 0 110 2h-1.5a1 1 0 110-2H15zM2.5 7a1 1 0 110 2H1a1 1 0 110-2h1.5zm9.89 5.303a1 1 0 011.414 0l1.06 1.061a1 1 0 01-1.414 1.414l-1.06-1.06a1 1 0 010-1.415zM3.111 12.303a1 1 0 010 1.415l-1.06 1.06a1 1 0 11-1.415-1.414l1.06-1.06a1 1 0 011.415 0zM8 13.5a1 1 0 011 1V16a1 1 0 11-2 0v-1.5a1 1 0 011-1z" />
  </svg>
);

export const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.752.752a.75.75 0 00-1.06 0L6.504 2.94a.75.75 0 00-.22.53v1.06L2.22 8.593a.75.75 0 000 1.061l4.125 4.125a.75.75 0 001.06 0l4.063-4.063h1.06a.75.75 0 00.531-.22l2.188-2.188a.75.75 0 000-1.06L9.752.752zM6.94 11.44L4.56 9.06l2.69-2.69h1.19l2.69 2.69-2.69 2.69-.19-.19-.19.19-.12-.12z" />
  </svg>
);
