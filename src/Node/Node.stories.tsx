import type { Meta, StoryObj } from '@storybook/react';
import { Node } from './Node';

const meta: Meta<typeof Node> = {
  title: 'Graph/Node',
  component: Node,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'active', 'muted', 'connected'],
    },
    pulse: {
      control: 'boolean',
    },
    count: {
      control: 'number',
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Node>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Node size="xs" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>xs (6px)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Node size="sm" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>sm (8px)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Node size="md" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>md (12px)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Node size="lg" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>lg (16px)</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Node size="md" variant="default" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Node size="md" variant="active" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>active</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Node size="md" variant="muted" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>muted</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Node size="md" variant="connected" />
        <span style={{ fontSize: '12px', color: '#64748B' }}>connected</span>
      </div>
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
      <Node size="sm" count={3} />
      <Node size="md" count={12} />
      <Node size="lg" count={99} />
      <Node size="lg" count={150} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <Node size="sm" interactive count={3} />
      <Node size="md" interactive count={7} />
      <Node size="lg" interactive count={12} />
    </div>
  ),
};

export const Pulse: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <Node size="sm" pulse />
      <Node size="md" pulse variant="active" />
      <Node size="lg" pulse interactive />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <span style={{ flex: 1, fontSize: '14px', color: '#1E293B' }}>
        Master Services Agreement 2024.pdf
      </span>
      <Node size="sm" interactive count={3} />
    </div>
  ),
};
