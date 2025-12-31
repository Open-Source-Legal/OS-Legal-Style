import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, HStack, VStack, Spacer, Divider } from './Stack';
import { stackStyles } from './Stack.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = stackStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children, color = '#E5E5E5' }: { children: React.ReactNode; color?: string }) => (
  <div style={{
    padding: '16px 24px',
    background: color,
    borderRadius: '8px',
    fontWeight: 500,
  }}>
    {children}
  </div>
);

export const Default: Story = {
  args: {
    gap: 'md',
    direction: 'column',
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <HStack gap="md">
      <Box color="#E85A4F">One</Box>
      <Box color="#F59E0B">Two</Box>
      <Box color="#10B981">Three</Box>
    </HStack>
  ),
};

export const VerticalStack: Story = {
  render: () => (
    <VStack gap="sm">
      <Box>First</Box>
      <Box>Second</Box>
      <Box>Third</Box>
    </VStack>
  ),
};

export const WithSpacer: Story = {
  render: () => (
    <HStack gap="md" style={{ width: '100%' }}>
      <Box>Logo</Box>
      <Spacer />
      <Box color="#E85A4F">Action</Box>
    </HStack>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <VStack gap="md">
      <div>Section 1 content</div>
      <Divider />
      <div>Section 2 content</div>
      <Divider />
      <div>Section 3 content</div>
    </VStack>
  ),
};

export const NestedStacks: Story = {
  render: () => (
    <VStack gap="lg">
      <HStack gap="md" justify="between" style={{ width: '100%' }}>
        <div style={{ fontWeight: 600, fontSize: '18px' }}>Page Title</div>
        <HStack gap="sm">
          <button style={{
            padding: '8px 16px',
            border: '1px solid #E5E5E5',
            borderRadius: '6px',
            background: 'white',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            background: '#E85A4F',
            color: 'white',
            cursor: 'pointer',
          }}>
            Save
          </button>
        </HStack>
      </HStack>
      <Divider />
      <HStack gap="lg" align="start">
        <VStack gap="md" style={{ flex: 1 }}>
          <Box>Main Content Area</Box>
          <Box>More Content</Box>
        </VStack>
        <VStack gap="md" style={{ width: '300px' }}>
          <Box color="#F8F8F8">Sidebar Item 1</Box>
          <Box color="#F8F8F8">Sidebar Item 2</Box>
        </VStack>
      </HStack>
    </VStack>
  ),
};

export const AlignmentExamples: Story = {
  render: () => (
    <VStack gap="lg">
      <div style={{ fontWeight: 600 }}>Align: start</div>
      <HStack gap="sm" align="start" style={{ height: '80px', background: '#F8F8F8', padding: '8px' }}>
        <Box color="#E85A4F">Short</Box>
        <Box color="#F59E0B">Taller<br/>Item</Box>
        <Box color="#10B981">Short</Box>
      </HStack>

      <div style={{ fontWeight: 600 }}>Align: center</div>
      <HStack gap="sm" align="center" style={{ height: '80px', background: '#F8F8F8', padding: '8px' }}>
        <Box color="#E85A4F">Short</Box>
        <Box color="#F59E0B">Taller<br/>Item</Box>
        <Box color="#10B981">Short</Box>
      </HStack>

      <div style={{ fontWeight: 600 }}>Align: end</div>
      <HStack gap="sm" align="end" style={{ height: '80px', background: '#F8F8F8', padding: '8px' }}>
        <Box color="#E85A4F">Short</Box>
        <Box color="#F59E0B">Taller<br/>Item</Box>
        <Box color="#10B981">Short</Box>
      </HStack>
    </VStack>
  ),
};
