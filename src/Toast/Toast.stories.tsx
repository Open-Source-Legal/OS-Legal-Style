import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from './Toast';
import { toastStyles } from './Toast.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    id: '1',
    variant: 'success',
    title: 'Document uploaded successfully',
  },
};

export const Error: Story = {
  args: {
    id: '2',
    variant: 'error',
    title: 'Failed to save changes',
    description: 'Please check your connection and try again.',
  },
};

export const Warning: Story = {
  args: {
    id: '3',
    variant: 'warning',
    title: 'Your session is about to expire',
    description: 'Please save your work.',
  },
};

export const Info: Story = {
  args: {
    id: '4',
    variant: 'info',
    title: 'New version available',
    description: 'Refresh to get the latest updates.',
  },
};

export const WithAction: Story = {
  args: {
    id: '5',
    variant: 'info',
    title: 'Document archived',
    action: (
      <button
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#E85A4F',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Undo
      </button>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '380px' }}>
      <Toast id="1" variant="success" title="Operation completed" />
      <Toast id="2" variant="error" title="Something went wrong" description="Please try again later." />
      <Toast id="3" variant="warning" title="Heads up!" description="This action cannot be undone." />
      <Toast id="4" variant="info" title="Did you know?" description="You can use keyboard shortcuts." />
    </div>
  ),
};

const ToastDemo = () => {
  const { success, error, warning, info } = useToast();

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button
        onClick={() => success('Document saved successfully')}
        style={{
          padding: '8px 16px',
          background: '#10B981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Success Toast
      </button>
      <button
        onClick={() => error('Failed to upload file', { description: 'The file is too large.' })}
        style={{
          padding: '8px 16px',
          background: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Error Toast
      </button>
      <button
        onClick={() => warning('Session expiring soon')}
        style={{
          padding: '8px 16px',
          background: '#F59E0B',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Warning Toast
      </button>
      <button
        onClick={() => info('New features available', { description: 'Check out what\'s new!' })}
        style={{
          padding: '8px 16px',
          background: '#E85A4F',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Info Toast
      </button>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  ),
};

const PositionDemo = () => {
  const { info } = useToast();
  return (
    <button
      onClick={() => info('Toast notification', { description: 'This toast appears in the configured position.' })}
      style={{
        padding: '8px 16px',
        background: '#E85A4F',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    >
      Show Toast
    </button>
  );
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <PositionDemo />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <PositionDemo />
    </ToastProvider>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <ToastProvider position="bottom-center">
      <PositionDemo />
    </ToastProvider>
  ),
};
