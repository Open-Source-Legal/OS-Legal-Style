import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { inputStyles } from './Input.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = inputStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    placeholder: 'Enter password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    leftIcon: <MailIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Search...',
    rightIcon: <SearchIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    leftIcon: <LockIcon />,
    rightIcon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

export const WithLeftAddon: Story = {
  args: {
    label: 'Website',
    placeholder: 'example.com',
    leftAddon: 'https://',
  },
};

export const WithRightAddon: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
    rightAddon: 'USD',
    type: 'number',
  },
};

export const WithBothAddons: Story = {
  args: {
    label: 'Username',
    placeholder: 'username',
    leftAddon: '@',
    rightAddon: '.com',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
      <Input size="lg" placeholder="Large input" label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width',
    placeholder: 'Stretches to container',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="Full Name"
        placeholder="John Doe"
        fullWidth
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        leftIcon={<MailIcon />}
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        leftIcon={<LockIcon />}
        helperText="Minimum 8 characters"
        fullWidth
      />
    </form>
  ),
};
