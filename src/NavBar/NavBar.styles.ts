export const navBarStyles = `
  /* ═══════════════════════════════════════════════════════════════
     NAVBAR - Top Navigation Bar
     ═══════════════════════════════════════════════════════════════ */

  .oc-navbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 12px 24px;
    background: var(--oc-bg-sidebar, #0F172A);
    color: white;
    font-family: var(--oc-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  .oc-navbar__left {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  /* Brand */
  .oc-navbar__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
  }

  .oc-navbar__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .oc-navbar__brand-name {
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
  }

  .oc-navbar__version.oc-chip {
    --chip-bg: rgba(255, 255, 255, 0.1);
    --chip-border: rgba(255, 255, 255, 0.2);
    --chip-text: rgba(255, 255, 255, 0.8);
  }

  /* Desktop Navigation */
  .oc-navbar__nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .oc-navbar__link {
    padding: 8px 12px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.15s ease;
  }

  .oc-navbar__link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .oc-navbar__link--active {
    color: white;
    background: rgba(255, 255, 255, 0.15);
  }

  /* Right Side */
  .oc-navbar__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .oc-navbar__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* User Dropdown */
  .oc-navbar-user {
    position: relative;
  }

  .oc-navbar-user__trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px 6px 6px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: inherit;
  }

  .oc-navbar-user__trigger:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .oc-navbar-user__name {
    font-size: 14px;
    font-weight: 500;
  }

  .oc-navbar-user__chevron {
    transition: transform 0.2s ease;
    opacity: 0.7;
  }

  .oc-navbar-user__chevron--open {
    transform: rotate(180deg);
  }

  .oc-navbar-user__backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--oc-z-dropdown, 100);
  }

  .oc-navbar-user__menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 180px;
    padding: 6px;
    background: var(--oc-bg-surface, white);
    border-radius: 10px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: calc(var(--oc-z-dropdown, 100) + 1);
    animation: oc-navbar-dropdown-slide 0.15s ease;
  }

  @keyframes oc-navbar-dropdown-slide {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .oc-navbar-user__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--oc-fg-secondary, #475569);
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .oc-navbar-user__item:hover {
    background: var(--oc-bg-surface-hover, #F1F5F9);
    color: var(--oc-fg-primary, #0F172A);
  }

  .oc-navbar-user__item--danger {
    color: var(--oc-error, #DC2626);
  }

  .oc-navbar-user__item--danger:hover {
    background: var(--oc-error-bg, #FEF2F2);
    color: var(--oc-error, #DC2626);
  }

  .oc-navbar-user__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  }

  .oc-navbar-user__divider {
    height: 1px;
    margin: 6px 0;
    background: var(--oc-border-default, #E2E8F0);
  }

  /* Mobile Menu Toggle */
  .oc-navbar__mobile-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .oc-navbar__mobile-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  /* Mobile Menu */
  .oc-navbar__mobile-menu {
    display: none;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    padding: 16px 0 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 12px;
  }

  .oc-navbar__mobile-link {
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.15s ease;
  }

  .oc-navbar__mobile-link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .oc-navbar__mobile-link--active {
    color: white;
    background: rgba(255, 255, 255, 0.15);
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .oc-navbar__nav {
      display: none;
    }

    .oc-navbar__mobile-toggle {
      display: flex;
    }

    .oc-navbar__mobile-menu {
      display: flex;
    }
  }

  @media (max-width: 768px) {
    .oc-navbar {
      padding: 12px 16px;
    }

    .oc-navbar-user__name,
    .oc-navbar-user__chevron {
      display: none;
    }

    .oc-navbar-user__trigger {
      padding: 4px;
    }

    .oc-navbar__version {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .oc-navbar__brand-name {
      display: none;
    }
  }
`;
