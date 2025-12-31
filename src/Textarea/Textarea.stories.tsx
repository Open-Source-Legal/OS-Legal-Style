import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { textareaStyles } from './Textarea.styles';

const styleSheet = document.createElement('style');
styleSheet.textContent = textareaStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    rows: { control: 'number' },
    maxRows: { control: 'number' },
    autoResize: { control: 'boolean' },
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
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    error: 'This field is required',
    rows: 4,
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-resize textarea',
    placeholder: 'Type to see it grow...',
    autoResize: true,
    rows: 2,
    maxRows: 8,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit...',
    disabled: true,
    rows: 4,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width',
    placeholder: 'Stretches to container',
    fullWidth: true,
    rows: 4,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Notes',
    defaultValue: 'This is some pre-filled content that you can edit. The textarea will show this text when first rendered.',
    rows: 4,
  },
};
