import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Banner } from './Alert';
import { alertStyles } from './Alert.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'New features available',
    children: 'Check out the latest updates to your corpus.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Document saved',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Review required',
    children: 'This document needs your approval before it can be finalized.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Upload failed',
    children: 'There was an error uploading your file. Please try again.',
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'info',
    title: 'Your subscription will renew in 3 days',
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'warning',
    children: 'You have unsaved changes. Make sure to save your work.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Pro tip',
    children: 'Use keyboard shortcuts to speed up your workflow.',
    dismissible: true,
  },
};

export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Subscription expiring',
    children: 'Your trial ends in 3 days.',
    action: (
      <button
        style={{
          padding: '4px 8px',
          background: 'transparent',
          border: '1px solid #F59E0B',
          borderRadius: '4px',
          color: '#F59E0B',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Upgrade
      </button>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert variant="info" title="Information">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Your action was completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please be aware of this important notice.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong. Please try again.
      </Alert>
    </div>
  ),
};

export const BannerInfo: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner variant="info">
        New features are available! Check out what's new.
      </Banner>
    </div>
  ),
};

export const BannerSuccess: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner variant="success">
        Your changes have been published successfully.
      </Banner>
    </div>
  ),
};

export const BannerWarning: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner variant="warning">
        Scheduled maintenance: The system will be unavailable tomorrow from 2-4 AM.
      </Banner>
    </div>
  ),
};

export const BannerError: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner variant="error">
        Service disruption: Some features may be temporarily unavailable.
      </Banner>
    </div>
  ),
};

export const BannerDismissible: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner variant="info" dismissible>
        Try our new AI-powered document analysis feature!
      </Banner>
    </div>
  ),
};

export const BannerWithAction: Story = {
  render: () => (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 200px)' }}>
      <Banner
        variant="info"
        action={
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              textDecoration: 'underline',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Learn more
          </button>
        }
        dismissible
      >
        Version 2.0 is here with major improvements!
      </Banner>
    </div>
  ),
};
