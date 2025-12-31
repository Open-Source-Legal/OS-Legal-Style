import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { tooltipStyles } from './Tooltip.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = tooltipStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
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
        Hover me
      </button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '64px' }}>
      <Tooltip content="Top tooltip" placement="top">
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
          Top
        </button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
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
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
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
          Left
        </button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
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
          Right
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip content="More information">
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
          <path fillRule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </button>
    </Tooltip>
  ),
};
