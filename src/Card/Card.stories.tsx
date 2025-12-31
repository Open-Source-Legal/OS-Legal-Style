import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { cardStyles } from './Card.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cardStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'flat', 'outlined'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
  },
  render: (args) => (
    <Card {...args} style={{ width: 320 }}>
      <CardHeader title="Card Title" subtitle="Supporting text goes here" />
      <CardBody>
        <p style={{ margin: 0 }}>
          This is the card body content. It can contain any elements you need.
        </p>
      </CardBody>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader
        title="Contract Analysis"
        subtitle="3 contradictions found"
        action={
          <span style={{
            background: '#FFFBEB',
            color: '#B45309',
            padding: '4px 8px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: 500,
          }}>
            Review
          </span>
        }
      />
      <CardBody>
        <p style={{ margin: 0 }}>
          Analysis of the witness statements reveals potential inconsistencies.
        </p>
      </CardBody>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader title="Document Review" subtitle="Last updated 2 hours ago" />
      <CardBody>
        <p style={{ margin: 0 }}>
          Review the attached documents and provide feedback.
        </p>
      </CardBody>
      <CardFooter>
        <button style={{
          padding: '8px 16px',
          background: '#E85A4F',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 500,
        }}>
          Accept
        </button>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          color: '#1A1A1A',
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          cursor: 'pointer',
        }}>
          Decline
        </button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card variant="elevated" style={{ width: 200 }}>
        <CardHeader title="Elevated" />
        <CardBody>Default shadow styling</CardBody>
      </Card>
      <Card variant="flat" style={{ width: 200 }}>
        <CardHeader title="Flat" />
        <CardBody>No shadow or border</CardBody>
      </Card>
      <Card variant="outlined" style={{ width: 200 }}>
        <CardHeader title="Outlined" />
        <CardBody>Subtle border only</CardBody>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card interactive style={{ width: 320 }} onClick={() => alert('Card clicked!')}>
      <CardHeader title="Click Me" subtitle="Interactive card with hover effects" />
      <CardBody>
        <p style={{ margin: 0 }}>
          This card responds to hover and click events.
        </p>
      </CardBody>
    </Card>
  ),
};
