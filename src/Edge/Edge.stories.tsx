import type { Meta, StoryObj } from '@storybook/react';
import { Edge } from './Edge';

const meta: Meta<typeof Edge> = {
  title: 'Graph/Edge',
  component: Edge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <svg width="300" height="150" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
        <Story />
      </svg>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Edge>;

export const Default: Story = {
  args: {
    x1: 50,
    y1: 75,
    x2: 250,
    y2: 75,
  },
};

export const Variants: Story = {
  render: () => (
    <svg width="300" height="200" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
      <Edge x1={50} y1={40} x2={250} y2={40} variant="solid" />
      <text x={260} y={44} fontSize={12} fill="#64748B">solid</text>

      <Edge x1={50} y1={100} x2={250} y2={100} variant="dashed" />
      <text x={260} y={104} fontSize={12} fill="#64748B">dashed</text>

      <Edge x1={50} y1={160} x2={250} y2={160} variant="dotted" />
      <text x={260} y={164} fontSize={12} fill="#64748B">dotted</text>
    </svg>
  ),
};

export const WithArrow: Story = {
  args: {
    x1: 50,
    y1: 75,
    x2: 250,
    y2: 75,
    arrow: true,
  },
};

export const WithLabel: Story = {
  args: {
    x1: 50,
    y1: 75,
    x2: 250,
    y2: 75,
    label: 'cites',
    active: true,
  },
};

export const Curved: Story = {
  render: () => (
    <svg width="300" height="200" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
      <Edge x1={50} y1={100} x2={250} y2={100} curve={-40} arrow label="references" />
      <Edge x1={50} y1={100} x2={250} y2={100} curve={40} arrow label="cites" variant="dashed" />

      {/* Node indicators */}
      <circle cx={50} cy={100} r={6} fill="#0F766E" />
      <circle cx={250} cy={100} r={6} fill="#0F766E" />
    </svg>
  ),
};

export const States: Story = {
  render: () => (
    <svg width="300" height="200" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
      <Edge x1={50} y1={40} x2={250} y2={40} />
      <text x={260} y={44} fontSize={12} fill="#64748B">default</text>

      <Edge x1={50} y1={100} x2={250} y2={100} active arrow label="cites" />
      <text x={260} y={104} fontSize={12} fill="#64748B">active</text>

      <Edge x1={50} y1={160} x2={250} y2={160} muted />
      <text x={260} y={164} fontSize={12} fill="#64748B">muted</text>
    </svg>
  ),
};

export const Animated: Story = {
  args: {
    x1: 50,
    y1: 75,
    x2: 250,
    y2: 75,
    animated: true,
    arrow: true,
  },
};

export const CustomColor: Story = {
  render: () => (
    <svg width="300" height="200" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
      <Edge x1={50} y1={40} x2={250} y2={40} color="#0F766E" arrow />
      <Edge x1={50} y1={80} x2={250} y2={80} color="#0284C7" arrow />
      <Edge x1={50} y1={120} x2={250} y2={120} color="#7C3AED" arrow />
      <Edge x1={50} y1={160} x2={250} y2={160} color="#DC2626" arrow />
    </svg>
  ),
};

export const GraphExample: Story = {
  render: () => (
    <svg width="400" height="300" style={{ background: '#FAFAFA', borderRadius: '8px' }}>
      {/* Edges */}
      <Edge x1={200} y1={150} x2={80} y2={60} arrow label="cites" />
      <Edge x1={200} y1={150} x2={320} y2={60} arrow label="references" variant="dashed" />
      <Edge x1={200} y1={150} x2={80} y2={240} arrow label="amends" />
      <Edge x1={200} y1={150} x2={320} y2={240} arrow label="supersedes" variant="dotted" />

      {/* Nodes */}
      <circle cx={200} cy={150} r={10} fill="#0F766E" />
      <circle cx={80} cy={60} r={8} fill="#0F766E" opacity={0.7} />
      <circle cx={320} cy={60} r={8} fill="#0F766E" opacity={0.7} />
      <circle cx={80} cy={240} r={8} fill="#0F766E" opacity={0.7} />
      <circle cx={320} cy={240} r={8} fill="#0F766E" opacity={0.7} />

      {/* Labels */}
      <text x={200} y={175} fontSize={11} fill="#1E293B" textAnchor="middle" fontWeight={500}>MSA 2024</text>
      <text x={80} y={85} fontSize={10} fill="#64748B" textAnchor="middle">NDA.docx</text>
      <text x={320} y={85} fontSize={10} fill="#64748B" textAnchor="middle">Vendor.pdf</text>
      <text x={80} y={220} fontSize={10} fill="#64748B" textAnchor="middle">MSA 2023</text>
      <text x={320} y={220} fontSize={10} fill="#64748B" textAnchor="middle">Contract.pdf</text>
    </svg>
  ),
};
