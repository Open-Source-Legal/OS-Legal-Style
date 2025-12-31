import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarHeader,
  SidebarNav,
  SidebarItem,
  SidebarSection,
  SidebarFooter,
} from './Sidebar';
import { sidebarStyles } from './Sidebar.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = sidebarStyles;
document.head.appendChild(styleSheet);

// Simple icon components for demo
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const LogoIcon = () => (
  <div style={{
    width: 32,
    height: 32,
    background: '#E85A4F',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  }}>
    OC
  </div>
);

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collapsed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SidebarDemo = ({ collapsed = false }: { collapsed?: boolean }) => {
  const [activeId, setActiveId] = useState('dashboard');

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <Sidebar collapsed={collapsed} activeId={activeId} onNavigate={setActiveId}>
        <SidebarHeader logo={<LogoIcon />} title="OpenContracts" />
        <SidebarNav>
          <SidebarSection title="Main">
            <SidebarItem id="dashboard" icon={<HomeIcon />} label="Dashboard" />
            <SidebarItem id="documents" icon={<FileIcon />} label="Documents" badge="12" />
            <SidebarItem id="team" icon={<UsersIcon />} label="Team" />
          </SidebarSection>
          <SidebarSection title="Settings">
            <SidebarItem id="settings" icon={<SettingsIcon />} label="Settings" />
          </SidebarSection>
        </SidebarNav>
        <SidebarFooter>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
            }} />
            {!collapsed && (
              <div>
                <div style={{ fontSize: '14px' }}>Jane Doe</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>Admin</div>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      <main style={{ flex: 1, padding: '24px', background: '#F8F8F8' }}>
        <h1 style={{ margin: 0, color: '#1A1A1A' }}>Main Content</h1>
        <p style={{ color: '#6B6B6B' }}>Active section: {activeId}</p>
      </main>
    </div>
  );
};

export const Default: Story = {
  render: () => <SidebarDemo />,
};

export const Collapsed: Story = {
  render: () => <SidebarDemo collapsed />,
};

export const WithBadges: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('documents');

    return (
      <div style={{ height: '400px', display: 'flex' }}>
        <Sidebar activeId={activeId} onNavigate={setActiveId}>
          <SidebarHeader logo={<LogoIcon />} title="OpenContracts" />
          <SidebarNav>
            <SidebarItem id="dashboard" icon={<HomeIcon />} label="Dashboard" />
            <SidebarItem id="documents" icon={<FileIcon />} label="Documents" badge="12" />
            <SidebarItem id="team" icon={<UsersIcon />} label="Team" badge="3" />
          </SidebarNav>
        </Sidebar>
      </div>
    );
  },
};
