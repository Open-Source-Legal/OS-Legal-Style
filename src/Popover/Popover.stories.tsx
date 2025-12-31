import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { popoverStyles } from './Popover.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = popoverStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    placement: 'bottom',
    trigger: 'click',
    content: (
      <div>
        <div style={{ fontWeight: 500, marginBottom: 8, color: '#1A1A1A' }}>Popover Title</div>
        <p style={{ margin: 0, color: '#6B6B6B', fontSize: 14 }}>
          This is a popover with more detailed content.
        </p>
      </div>
    ),
  },
  render: (args) => (
    <Popover {...args}>
      <button
        style={{
          padding: '10px 20px',
          background: '#E85A4F',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Click me
      </button>
    </Popover>
  ),
};

export const HoverTrigger: Story = {
  render: () => (
    <Popover
      trigger="hover"
      content={
        <div>
          <div style={{ fontWeight: 500, marginBottom: 8, color: '#1A1A1A' }}>Quick Info</div>
          <p style={{ margin: 0, color: '#6B6B6B', fontSize: 14 }}>
            Hover over elements to see more information.
          </p>
        </div>
      }
    >
      <button
        style={{
          padding: '10px 20px',
          background: '#1A1A1A',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Hover me
      </button>
    </Popover>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Popover
      content={
        <div>
          <div style={{ fontWeight: 500, marginBottom: 8, color: '#1A1A1A' }}>Share this document</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={{
                padding: '6px 12px',
                background: '#E85A4F',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Copy Link
            </button>
            <button
              style={{
                padding: '6px 12px',
                background: 'transparent',
                color: '#1A1A1A',
                border: '1px solid #E5E5E5',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Email
            </button>
          </div>
        </div>
      }
    >
      <button
        style={{
          padding: '10px 20px',
          background: 'transparent',
          color: '#1A1A1A',
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5zm-8.5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        </svg>
        Share
      </button>
    </Popover>
  ),
};

export const Menu: Story = {
  render: () => (
    <Popover
      content={
        <div style={{ margin: '-16px', minWidth: 180 }}>
          {['View', 'Edit', 'Duplicate', 'Delete'].map((item, i) => (
            <button
              key={item}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                color: item === 'Delete' ? '#EF4444' : '#1A1A1A',
                fontSize: 14,
                borderTop: i > 0 ? '1px solid #E5E5E5' : 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8F8F8')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {item}
            </button>
          ))}
        </div>
      }
    >
      <button
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          cursor: 'pointer',
          color: '#6B6B6B',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      </button>
    </Popover>
  ),
};
