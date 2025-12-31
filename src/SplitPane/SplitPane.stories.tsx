import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplitPane } from './SplitPane';
import { splitPaneStyles } from './SplitPane.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = splitPaneStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof SplitPane> = {
  title: 'Layout/SplitPane',
  component: SplitPane,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    resizable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplitPane>;

const PanelContent = ({ title, color }: { title: string; color: string }) => (
  <div style={{
    height: '100%',
    padding: '16px',
    background: color,
    display: 'flex',
    flexDirection: 'column',
  }}>
    <div style={{ fontWeight: 600, marginBottom: '8px' }}>{title}</div>
    <p style={{ margin: 0, fontSize: '14px', color: '#6B6B6B' }}>
      Drag the handle to resize this panel.
    </p>
  </div>
);

export const Horizontal: Story = {
  render: () => (
    <div style={{ height: '400px', border: '1px solid #E5E5E5' }}>
      <SplitPane direction="horizontal" defaultSize={300} minSize={150}>
        <PanelContent title="Left Panel" color="#F8F8F8" />
        <PanelContent title="Right Panel" color="#FFFFFF" />
      </SplitPane>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: '400px', border: '1px solid #E5E5E5' }}>
      <SplitPane direction="vertical" defaultSize={200} minSize={100}>
        <PanelContent title="Top Panel" color="#F8F8F8" />
        <PanelContent title="Bottom Panel" color="#FFFFFF" />
      </SplitPane>
    </div>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <div style={{ height: '400px', border: '1px solid #E5E5E5' }}>
      <SplitPane direction="horizontal" defaultSize={200} minSize={150}>
        <PanelContent title="Sidebar" color="#1A1A1A" />
        <SplitPane direction="horizontal" defaultSize="60%" minSize={200}>
          <PanelContent title="Content" color="#FFFFFF" />
          <PanelContent title="Details" color="#F8F8F8" />
        </SplitPane>
      </SplitPane>
    </div>
  ),
};

export const DocumentView: Story = {
  render: () => (
    <div style={{ height: '500px', border: '1px solid #E5E5E5' }}>
      <SplitPane direction="horizontal" defaultSize={260} minSize={200}>
        {/* File tree sidebar */}
        <div style={{ height: '100%', background: '#F8F8F8', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E5E5', fontWeight: 600, fontSize: '14px' }}>
            All Documents
          </div>
          <div style={{ padding: '8px', flex: 1, overflow: 'auto' }}>
            {['Witness Statements', 'Contracts', 'Exhibits', 'Correspondence'].map((folder) => (
              <div key={folder} style={{
                padding: '8px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: '#E85A4F' }}>📁</span>
                {folder}
              </div>
            ))}
          </div>
        </div>

        {/* Main content with chat */}
        <SplitPane direction="horizontal" defaultSize="60%" minSize={300}>
          {/* Document content */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E5E5', fontWeight: 500 }}>
              Contract_Draft_v2.pdf
            </div>
            <div style={{ flex: 1, padding: '24px', overflow: 'auto', background: '#FAFAFA' }}>
              <div style={{
                background: 'white',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                minHeight: '400px',
              }}>
                Document content preview area
              </div>
            </div>
          </div>

          {/* Chat/Analysis panel */}
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFFFFF' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #E5E5E5', fontWeight: 500 }}>
              Analysis
            </div>
            <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
              <div style={{
                padding: '12px',
                background: '#F8F8F8',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '12px',
              }}>
                AI analysis results will appear here...
              </div>
            </div>
            <div style={{ padding: '12px', borderTop: '1px solid #E5E5E5' }}>
              <input
                placeholder="Ask a question..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #E5E5E5',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        </SplitPane>
      </SplitPane>
    </div>
  ),
};
