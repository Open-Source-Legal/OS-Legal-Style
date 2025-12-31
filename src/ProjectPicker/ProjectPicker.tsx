import React, { forwardRef, ReactNode, HTMLAttributes, useState } from 'react';

export type ProjectType = 'knowledge-base' | 'folder' | 'corpus' | 'extract';

// ============ ProjectPicker Container ============

export interface ProjectPickerProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title */
  title?: string;
  /** Subtitle (e.g., "3 projects available") */
  subtitle?: string;
  /** Is the picker open/expanded */
  open?: boolean;
  /** Toggle handler */
  onToggle?: () => void;
  /** Controlled open state */
  defaultOpen?: boolean;
  /** Children (ProjectItem components) */
  children: ReactNode;
}

export const ProjectPicker = forwardRef<HTMLDivElement, ProjectPickerProps>(
  (
    {
      title = 'Choose Project',
      subtitle,
      open,
      onToggle,
      defaultOpen = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = open !== undefined ? open : internalOpen;

    const handleToggle = () => {
      setInternalOpen(!isOpen);
      onToggle?.();
    };

    const classes = [
      'oc-project-picker',
      isOpen && 'oc-project-picker--open',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <button
          className="oc-project-picker__header"
          onClick={handleToggle}
          type="button"
          aria-expanded={isOpen}
        >
          <div className="oc-project-picker__header-content">
            <span className="oc-project-picker__title">{title}</span>
            {subtitle && (
              <span className="oc-project-picker__subtitle">{subtitle}</span>
            )}
          </div>
          <svg
            className="oc-project-picker__chevron"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" />
          </svg>
        </button>
        {isOpen && (
          <div className="oc-project-picker__list" role="listbox">
            {children}
          </div>
        )}
      </div>
    );
  }
);

ProjectPicker.displayName = 'ProjectPicker';

// ============ Project Item ============

export interface ProjectItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Project ID */
  id: string;
  /** Project name */
  name: string;
  /** Description or metadata (e.g., "3,902 files" or "Internal knowledge base") */
  description?: string;
  /** Project type for icon */
  type?: ProjectType;
  /** Custom icon */
  icon?: ReactNode;
  /** Is this item selected/active */
  selected?: boolean;
  /** Selection handler */
  onSelect?: (id: string) => void;
}

const ProjectIcon = ({ type }: { type: ProjectType }) => {
  switch (type) {
    case 'knowledge-base':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      );
    case 'corpus':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
        </svg>
      );
    case 'extract':
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'folder':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
          <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
        </svg>
      );
  }
};

export const ProjectItem = forwardRef<HTMLDivElement, ProjectItemProps>(
  (
    {
      id,
      name,
      description,
      type = 'folder',
      icon,
      selected = false,
      onSelect,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      'oc-project-item',
      selected && 'oc-project-item--selected',
      className,
    ].filter(Boolean).join(' ');

    const handleClick = () => {
      onSelect?.(id);
    };

    return (
      <div
        ref={ref}
        className={classes}
        role="option"
        aria-selected={selected}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        {...props}
      >
        <div className="oc-project-item__content">
          <span className="oc-project-item__name">{name}</span>
          {description && (
            <span className="oc-project-item__desc">{description}</span>
          )}
        </div>
        <div className="oc-project-item__icon">
          {icon || <ProjectIcon type={type} />}
        </div>
      </div>
    );
  }
);

ProjectItem.displayName = 'ProjectItem';

// ============ Project Search ============

export interface ProjectSearchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Search value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
}

export const ProjectSearch = forwardRef<HTMLInputElement, ProjectSearchProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Search projects...',
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const classes = ['oc-project-search', className].filter(Boolean).join(' ');

    return (
      <div className={classes} {...props}>
        <svg
          className="oc-project-search__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 111.06-1.06l2.755 2.754a.75.75 0 11-1.06 1.06l-2.755-2.754zM10.5 7a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" clipRule="evenodd" />
        </svg>
        <input
          ref={ref}
          type="text"
          className="oc-project-search__input"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

ProjectSearch.displayName = 'ProjectSearch';
