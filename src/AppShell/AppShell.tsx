import React, { forwardRef, ReactNode, HTMLAttributes, createContext, useContext, useState, useCallback } from 'react';

interface AppShellContextValue {
  sidebarOpen: boolean;
  sidebarWidth: number;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const AppShellContext = createContext<AppShellContextValue>({
  sidebarOpen: true,
  sidebarWidth: 256,
  toggleSidebar: () => {},
  setSidebarOpen: () => {},
});

export const useAppShell = () => useContext(AppShellContext);

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Default sidebar open state */
  defaultSidebarOpen?: boolean;
  /** Sidebar width in pixels */
  sidebarWidth?: number;
  /** Fixed viewport height (100vh) */
  fixed?: boolean;
  children?: ReactNode;
}

export interface AppShellSidebarProps extends HTMLAttributes<HTMLElement> {
  /** Width of the sidebar (overrides context) */
  width?: number;
  /** Show border on the right */
  bordered?: boolean;
  children?: ReactNode;
}

export interface AppShellMainProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface AppShellHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Fixed to top of viewport */
  fixed?: boolean;
  /** Height of header */
  height?: number;
  /** Show border on bottom */
  bordered?: boolean;
  children?: ReactNode;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ defaultSidebarOpen = true, sidebarWidth = 256, fixed = true, className = '', children, ...props }, ref) => {
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);

    const toggleSidebar = useCallback(() => {
      setSidebarOpen((prev) => !prev);
    }, []);

    const classes = [
      'oc-app-shell',
      fixed && 'oc-app-shell--fixed',
      className,
    ].filter(Boolean).join(' ');

    return (
      <AppShellContext.Provider value={{ sidebarOpen, sidebarWidth, toggleSidebar, setSidebarOpen }}>
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      </AppShellContext.Provider>
    );
  }
);

AppShell.displayName = 'AppShell';

export const AppShellSidebar = forwardRef<HTMLElement, AppShellSidebarProps>(
  ({ width, bordered = true, className = '', children, style, ...props }, ref) => {
    const { sidebarOpen, sidebarWidth } = useAppShell();
    const actualWidth = width ?? sidebarWidth;

    const classes = [
      'oc-app-shell-sidebar',
      !sidebarOpen && 'oc-app-shell-sidebar--closed',
      bordered && 'oc-app-shell-sidebar--bordered',
      className,
    ].filter(Boolean).join(' ');

    return (
      <aside
        ref={ref}
        className={classes}
        style={{ '--sidebar-width': `${actualWidth}px`, ...style } as React.CSSProperties}
        {...props}
      >
        <div className="oc-app-shell-sidebar__content">{children}</div>
      </aside>
    );
  }
);

AppShellSidebar.displayName = 'AppShellSidebar';

export const AppShellMain = forwardRef<HTMLElement, AppShellMainProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['oc-app-shell-main', className].filter(Boolean).join(' ');

    return (
      <main ref={ref} className={classes} {...props}>
        {children}
      </main>
    );
  }
);

AppShellMain.displayName = 'AppShellMain';

export const AppShellHeader = forwardRef<HTMLElement, AppShellHeaderProps>(
  ({ fixed = false, height = 56, bordered = true, className = '', children, style, ...props }, ref) => {
    const classes = [
      'oc-app-shell-header',
      fixed && 'oc-app-shell-header--fixed',
      bordered && 'oc-app-shell-header--bordered',
      className,
    ].filter(Boolean).join(' ');

    return (
      <header
        ref={ref}
        className={classes}
        style={{ '--header-height': `${height}px`, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </header>
    );
  }
);

AppShellHeader.displayName = 'AppShellHeader';
