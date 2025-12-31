import React, { forwardRef, ReactNode, HTMLAttributes, useState, useCallback } from 'react';
import { Avatar } from '../Avatar';
import { Chip } from '../Chip';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  /** Logo/brand element */
  logo?: ReactNode;
  /** Brand name text */
  brandName?: string;
  /** Version badge text */
  version?: string;
  /** Navigation items */
  items?: NavItem[];
  /** Currently active nav item id */
  activeId?: string;
  /** Callback when nav item is clicked */
  onNavigate?: (id: string) => void;
  /** User name for the dropdown */
  userName?: string;
  /** User avatar URL */
  userAvatarUrl?: string;
  /** User menu items */
  userMenuItems?: UserMenuItem[];
  /** Right-side actions (before user menu) */
  actions?: ReactNode;
  /** Hide user menu */
  hideUserMenu?: boolean;
}

const DefaultLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="2" />
    <circle cx="14" cy="14" r="6" fill="currentColor" />
  </svg>
);

const ChevronIcon = ({ open }: { open?: boolean }) => (
  <svg
    className={`oc-navbar-user__chevron ${open ? 'oc-navbar-user__chevron--open' : ''}`}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M4.22 6.22a.75.75 0 011.06 0L8 8.94l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
  </svg>
);

export const NavBar = forwardRef<HTMLElement, NavBarProps>(
  (
    {
      logo,
      brandName = 'Open Contracts',
      version,
      items = [],
      activeId,
      onNavigate,
      userName,
      userAvatarUrl,
      userMenuItems = [],
      actions,
      hideUserMenu = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleNavClick = useCallback(
      (item: NavItem) => {
        if (item.onClick) {
          item.onClick();
        } else if (onNavigate) {
          onNavigate(item.id);
        }
        setMobileMenuOpen(false);
      },
      [onNavigate]
    );

    const classes = ['oc-navbar', className].filter(Boolean).join(' ');

    return (
      <header ref={ref} className={classes} {...props}>
        <div className="oc-navbar__left">
          {/* Logo & Brand */}
          <div className="oc-navbar__brand">
            <span className="oc-navbar__logo">{logo || <DefaultLogo />}</span>
            {brandName && <span className="oc-navbar__brand-name">{brandName}</span>}
            {version && (
              <Chip size="sm" variant="outlined" className="oc-navbar__version">
                {version}
              </Chip>
            )}
          </div>

          {/* Desktop Navigation */}
          {items.length > 0 && (
            <nav className="oc-navbar__nav">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href || '#'}
                  className={[
                    'oc-navbar__link',
                    activeId === item.id && 'oc-navbar__link--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={(e) => {
                    if (!item.href) e.preventDefault();
                    handleNavClick(item);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="oc-navbar__right">
          {/* Custom Actions */}
          {actions && <div className="oc-navbar__actions">{actions}</div>}

          {/* User Menu */}
          {!hideUserMenu && userName && (
            <div className="oc-navbar-user">
              <button
                className="oc-navbar-user__trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <Avatar
                  fallback={userName?.charAt(0)}
                  src={userAvatarUrl}
                  size="sm"
                />
                <span className="oc-navbar-user__name">{userName}</span>
                <ChevronIcon open={userMenuOpen} />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="oc-navbar-user__backdrop"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="oc-navbar-user__menu">
                    {userMenuItems.map((item) =>
                      item.divider ? (
                        <div key={item.id} className="oc-navbar-user__divider" />
                      ) : (
                        <button
                          key={item.id}
                          className={[
                            'oc-navbar-user__item',
                            item.danger && 'oc-navbar-user__item--danger',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => {
                            item.onClick?.();
                            setUserMenuOpen(false);
                          }}
                        >
                          {item.icon && (
                            <span className="oc-navbar-user__item-icon">{item.icon}</span>
                          )}
                          <span>{item.label}</span>
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {items.length > 0 && (
            <button
              className="oc-navbar__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && items.length > 0 && (
          <nav className="oc-navbar__mobile-menu">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href || '#'}
                className={[
                  'oc-navbar__mobile-link',
                  activeId === item.id && 'oc-navbar__mobile-link--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={(e) => {
                  if (!item.href) e.preventDefault();
                  handleNavClick(item);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    );
  }
);

NavBar.displayName = 'NavBar';
