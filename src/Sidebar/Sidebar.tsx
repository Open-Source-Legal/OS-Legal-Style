import React, { forwardRef, ReactNode, HTMLAttributes, createContext, useContext } from 'react';

interface SidebarContextValue {
  collapsed: boolean;
  activeId?: string;
  onNavigate?: (id: string) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
});

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  activeId?: string;
  onNavigate?: (id: string) => void;
  children?: ReactNode;
}

export interface SidebarHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  logo?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}

export interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  id: string;
  icon?: ReactNode;
  label: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
}

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: ReactNode;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed = false, activeId, onNavigate, className = '', children, ...props }, ref) => {
    const classes = [
      'oc-sidebar',
      collapsed && 'oc-sidebar--collapsed',
      className,
    ].filter(Boolean).join(' ');

    return (
      <SidebarContext.Provider value={{ collapsed, activeId, onNavigate }}>
        <aside ref={ref} className={classes} {...props}>
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ logo, title, className = '', children, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);
    const classes = ['oc-sidebar-header', className].filter(Boolean).join(' ');

    if (children) {
      return (
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {logo && <div className="oc-sidebar-header__logo">{logo}</div>}
        {!collapsed && title && <div className="oc-sidebar-header__title">{title}</div>}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';

export const SidebarNav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-sidebar-nav', className].filter(Boolean).join(' ');

    return (
      <nav ref={ref} className={classes} {...props}>
        {children}
      </nav>
    );
  }
);

SidebarNav.displayName = 'SidebarNav';

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className = '', children, ...props }, ref) => {
    const { collapsed } = useContext(SidebarContext);
    const classes = ['oc-sidebar-section', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {!collapsed && title && <div className="oc-sidebar-section__title">{title}</div>}
        <div className="oc-sidebar-section__items">{children}</div>
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ id, icon, label, badge, disabled = false, className = '', ...props }, ref) => {
    const { collapsed, activeId, onNavigate } = useContext(SidebarContext);
    const isActive = activeId === id;

    const classes = [
      'oc-sidebar-item',
      isActive && 'oc-sidebar-item--active',
      disabled && 'oc-sidebar-item--disabled',
      className,
    ].filter(Boolean).join(' ');

    const handleClick = () => {
      if (!disabled && onNavigate) {
        onNavigate(id);
      }
    };

    return (
      <button
        ref={ref}
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {icon && <span className="oc-sidebar-item__icon">{icon}</span>}
        {!collapsed && <span className="oc-sidebar-item__label">{label}</span>}
        {!collapsed && badge && <span className="oc-sidebar-item__badge">{badge}</span>}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

export const SidebarFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-sidebar-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';
