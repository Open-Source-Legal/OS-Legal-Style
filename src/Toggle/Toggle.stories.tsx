import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, Switch } from './Toggle';
import { toggleStyles } from './Toggle.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = toggleStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive email alerts for important updates',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Toggle size="sm" label="Small toggle" defaultChecked />
      <Toggle size="md" label="Medium toggle" defaultChecked />
      <Toggle size="lg" label="Large toggle" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and on',
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Error state',
    error: true,
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const ControlledExample: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          label={enabled ? 'Enabled' : 'Disabled'}
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
          Status: {enabled ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
};

export const SettingsExample: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emails: false,
      darkMode: false,
      autoSave: true,
    });

    const handleToggle = (key: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => ({ ...prev, [key]: e.target.checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <Toggle
          label="Push notifications"
          description="Receive notifications in your browser"
          checked={settings.notifications}
          onChange={handleToggle('notifications')}
        />
        <Toggle
          label="Email updates"
          description="Get weekly digest emails"
          checked={settings.emails}
          onChange={handleToggle('emails')}
        />
        <Toggle
          label="Dark mode"
          description="Use dark theme across the app"
          checked={settings.darkMode}
          onChange={handleToggle('darkMode')}
        />
        <Toggle
          label="Auto-save"
          description="Automatically save changes"
          checked={settings.autoSave}
          onChange={handleToggle('autoSave')}
        />
      </div>
    );
  },
};

export const SwitchAlias: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ fontSize: '14px', color: '#6B6B6B' }}>
        Switch is an alias for Toggle:
      </p>
      <Switch label="Using Switch component" defaultChecked />
    </div>
  ),
};
