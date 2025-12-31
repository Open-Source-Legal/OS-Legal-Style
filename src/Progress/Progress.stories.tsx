import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress, ProgressCircle, Spinner } from './Progress';
import { progressStyles } from './Progress.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = progressStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['accent', 'success', 'warning', 'error'],
    },
    showLabel: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 45,
    showLabel: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>Small</p>
        <Progress size="sm" value={60} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>Medium</p>
        <Progress size="md" value={60} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6B6B6B' }}>Large</p>
        <Progress size="lg" value={60} />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Progress color="accent" value={70} showLabel />
      <Progress color="success" value={100} showLabel />
      <Progress color="warning" value={45} showLabel />
      <Progress color="error" value={25} showLabel />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 5));
      }, 200);
      return () => clearInterval(timer);
    }, []);

    return <Progress value={progress} showLabel />;
  },
};

export const Circle: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <ProgressCircle value={25} showLabel />
      <ProgressCircle value={50} showLabel />
      <ProgressCircle value={75} showLabel />
      <ProgressCircle value={100} showLabel />
    </div>
  ),
};

export const CircleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <ProgressCircle size="sm" value={65} />
      <ProgressCircle size="md" value={65} showLabel />
      <ProgressCircle size="lg" value={65} showLabel />
      <ProgressCircle size={80} value={65} showLabel />
    </div>
  ),
};

export const CircleColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <ProgressCircle color="accent" value={70} showLabel />
      <ProgressCircle color="success" value={100} showLabel />
      <ProgressCircle color="warning" value={45} showLabel />
      <ProgressCircle color="error" value={25} showLabel />
    </div>
  ),
};

export const Spinners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size={40} />
    </div>
  ),
};

export const SpinnerColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spinner color="#E85A4F" />
      <Spinner color="#10B981" />
      <Spinner color="#F59E0B" />
      <Spinner color="#6B6B6B" />
    </div>
  ),
};

export const UploadProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const startUpload = () => {
      setUploading(true);
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            setUploading(false);
            return 100;
          }
          return p + Math.random() * 15;
        });
      }, 200);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            padding: '16px',
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#F8F8F8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>contract_v2.pdf</div>
              <div style={{ fontSize: '12px', color: '#6B6B6B' }}>2.4 MB</div>
            </div>
            {uploading && <Spinner size="sm" />}
          </div>
          <Progress value={Math.min(progress, 100)} showLabel color={progress >= 100 ? 'success' : 'accent'} />
        </div>
        <button
          onClick={startUpload}
          disabled={uploading}
          style={{
            padding: '8px 16px',
            background: uploading ? '#E5E5E5' : '#E85A4F',
            color: uploading ? '#6B6B6B' : 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : progress >= 100 ? 'Upload Again' : 'Start Upload'}
        </button>
      </div>
    );
  },
};
