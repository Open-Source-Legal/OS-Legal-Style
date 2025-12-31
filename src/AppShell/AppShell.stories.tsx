import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell, AppShellSidebar, AppShellMain, AppShellHeader, useAppShell } from './AppShell';
import { appShellStyles } from './AppShell.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = appShellStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

// Sidebar toggle button component
const SidebarToggle = () => {
  const { toggleSidebar, sidebarOpen } = useAppShell();
  return (
    <button
      onClick={toggleSidebar}
      style={{
        padding: '8px',
        background: 'transparent',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

// Sample nav items
const navItems = [
  { id: 'documents', label: 'Documents', count: 12 },
  { id: 'analysis', label: 'Analysis' },
  { id: 'team', label: 'Team' },
  { id: 'settings', label: 'Settings' },
];

export const Default: Story = {
  render: () => {
    const [activeNav, setActiveNav] = useState('documents');

    return (
      <AppShell style={{ height: '500px' }}>
        <AppShellSidebar>
          <div style={{ padding: '16px', borderBottom: '1px solid #E5E5E5' }}>
            <div style={{ fontWeight: 600, fontSize: '16px' }}>OpenContracts</div>
          </div>
          <nav style={{ padding: '8px', flex: 1 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeNav === item.id ? '#E85A4F' : 'transparent',
                  color: activeNav === item.id ? 'white' : '#1A1A1A',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textAlign: 'left',
                  marginBottom: '2px',
                }}
              >
                {item.label}
                {item.count && (
                  <span style={{
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: activeNav === item.id ? 'rgba(255,255,255,0.2)' : '#E5E5E5',
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <SidebarToggle />
            <span style={{ marginLeft: '16px', fontWeight: 500 }}>
              {navItems.find(n => n.id === activeNav)?.label}
            </span>
          </AppShellHeader>
          <div style={{ padding: '24px', flex: 1, overflow: 'auto' }}>
            <h2 style={{ margin: '0 0 16px' }}>Main Content Area</h2>
            <p style={{ color: '#6B6B6B' }}>
              This is the main content area. The sidebar can be toggled using the menu button.
            </p>
          </div>
        </AppShellMain>
      </AppShell>
    );
  },
};

export const DarkSidebar: Story = {
  render: () => (
    <AppShell style={{ height: '500px' }}>
      <AppShellSidebar
        className="oc-app-shell-sidebar--dark"
        style={{ background: '#1A1A1A', color: 'white' }}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{
            width: 32,
            height: 32,
            background: '#E85A4F',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}>
            OC
          </div>
        </div>
        <nav style={{ padding: '8px', flex: 1 }}>
          {['Dashboard', 'Documents', 'Analysis'].map((item, i) => (
            <button
              key={item}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                borderRadius: '8px',
                background: i === 1 ? '#E85A4F' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                marginBottom: '2px',
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </AppShellSidebar>
      <AppShellMain>
        <div style={{ padding: '24px' }}>
          <h1 style={{ margin: 0 }}>Documents</h1>
        </div>
      </AppShellMain>
    </AppShell>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <AppShell style={{ height: '500px' }}>
      <AppShellHeader bordered>
        <div style={{ fontWeight: 600 }}>OpenContracts</div>
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '8px 16px',
          background: '#E85A4F',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}>
          New Project
        </button>
      </AppShellHeader>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AppShellSidebar width={200}>
          <nav style={{ padding: '8px' }}>
            {['Projects', 'Documents', 'Team'].map((item) => (
              <div key={item} style={{ padding: '10px 12px', fontSize: '14px' }}>
                {item}
              </div>
            ))}
          </nav>
        </AppShellSidebar>
        <AppShellMain>
          <div style={{ padding: '24px' }}>
            <h2 style={{ margin: 0 }}>Content with top header</h2>
          </div>
        </AppShellMain>
      </div>
    </AppShell>
  ),
};
