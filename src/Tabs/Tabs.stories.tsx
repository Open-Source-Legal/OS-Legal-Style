import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import { tabsStyles } from './Tabs.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = tabsStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'pills'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="line">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="documents">Documents</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="overview">
          <p>Overview content goes here.</p>
        </TabPanel>
        <TabPanel value="documents">
          <p>Documents content goes here.</p>
        </TabPanel>
        <TabPanel value="activity">
          <p>Activity content goes here.</p>
        </TabPanel>
        <TabPanel value="settings">
          <p>Settings content goes here.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Enclosed: Story = {
  render: () => (
    <Tabs defaultValue="all" variant="enclosed">
      <TabList>
        <Tab value="all">All</Tab>
        <Tab value="contracts">Contracts</Tab>
        <Tab value="agreements">Agreements</Tab>
        <Tab value="briefs">Briefs</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="all">All documents displayed here.</TabPanel>
        <TabPanel value="contracts">Contract documents.</TabPanel>
        <TabPanel value="agreements">Agreement documents.</TabPanel>
        <TabPanel value="briefs">Legal briefs.</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="day" variant="pills">
      <TabList>
        <Tab value="day">Day</Tab>
        <Tab value="week">Week</Tab>
        <Tab value="month">Month</Tab>
        <Tab value="year">Year</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="day">Daily view</TabPanel>
        <TabPanel value="week">Weekly view</TabPanel>
        <TabPanel value="month">Monthly view</TabPanel>
        <TabPanel value="year">Yearly view</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" variant="line" orientation="vertical">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="account">Account</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="notifications">Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="profile">
          <h3 style={{ margin: '0 0 8px' }}>Profile Settings</h3>
          <p style={{ margin: 0, color: '#6B6B6B' }}>Manage your public profile information.</p>
        </TabPanel>
        <TabPanel value="account">
          <h3 style={{ margin: '0 0 8px' }}>Account Settings</h3>
          <p style={{ margin: 0, color: '#6B6B6B' }}>Update your account preferences.</p>
        </TabPanel>
        <TabPanel value="security">
          <h3 style={{ margin: '0 0 8px' }}>Security Settings</h3>
          <p style={{ margin: 0, color: '#6B6B6B' }}>Manage passwords and two-factor auth.</p>
        </TabPanel>
        <TabPanel value="notifications">
          <h3 style={{ margin: '0 0 8px' }}>Notification Preferences</h3>
          <p style={{ margin: 0, color: '#6B6B6B' }}>Control how and when you receive notifications.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '600px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => {
    const DocumentIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    );

    const ActivityIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );

    const SettingsIcon = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    );

    return (
      <Tabs defaultValue="documents" variant="line">
        <TabList>
          <Tab value="documents" icon={<DocumentIcon />}>Documents</Tab>
          <Tab value="activity" icon={<ActivityIcon />}>Activity</Tab>
          <Tab value="settings" icon={<SettingsIcon />}>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="documents">Documents tab content</TabPanel>
          <TabPanel value="activity">Activity tab content</TabPanel>
          <TabPanel value="settings">Settings tab content</TabPanel>
        </TabPanels>
      </Tabs>
    );
  },
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="line">
      <TabList>
        <Tab value="tab1">Available</Tab>
        <Tab value="tab2">Also Available</Tab>
        <Tab value="tab3" disabled>Disabled</Tab>
        <Tab value="tab4">Another Available</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="tab1">First tab content</TabPanel>
        <TabPanel value="tab2">Second tab content</TabPanel>
        <TabPanel value="tab3">Third tab content (disabled)</TabPanel>
        <TabPanel value="tab4">Fourth tab content</TabPanel>
      </TabPanels>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Tabs value={activeTab} onChange={setActiveTab} variant="enclosed">
          <TabList>
            <Tab value="tab1">First</Tab>
            <Tab value="tab2">Second</Tab>
            <Tab value="tab3">Third</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="tab1">Content for first tab</TabPanel>
            <TabPanel value="tab2">Content for second tab</TabPanel>
            <TabPanel value="tab3">Content for third tab</TabPanel>
          </TabPanels>
        </Tabs>
        <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Active tab: {activeTab}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('tab1')}
            style={{ padding: '4px 8px', cursor: 'pointer' }}
          >
            Go to First
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            style={{ padding: '4px 8px', cursor: 'pointer' }}
          >
            Go to Second
          </button>
          <button
            onClick={() => setActiveTab('tab3')}
            style={{ padding: '4px 8px', cursor: 'pointer' }}
          >
            Go to Third
          </button>
        </div>
      </div>
    );
  },
};
