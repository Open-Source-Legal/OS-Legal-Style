import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SourcesPanel,
  PanelTabs,
  PanelTab,
  PanelSearch,
  PanelActionList,
  PanelAction,
  PanelSection,
  UploadIcon,
  FilesIcon,
  PromptsIcon,
  PlusIcon,
} from './SourcesPanel';

const meta: Meta<typeof SourcesPanel> = {
  title: 'Chat/SourcesPanel',
  component: SourcesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SourcesPanel>;

// Custom integration icons
const DocVaultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="4" fill="#E85B5B" />
    <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D</text>
  </svg>
);

const FileNexusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="4" fill="#1B4F72" />
    <text x="10" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">FN</text>
  </svg>
);

const CloudDriveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <rect width="20" height="20" rx="4" fill="#038387" />
    <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C</text>
  </svg>
);

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('files');

    return (
      <div style={{ width: 380 }}>
        <SourcesPanel>
          <PanelTabs value={activeTab} onChange={setActiveTab}>
            <PanelTab value="files" icon={<PlusIcon />}>
              Files and Sources
            </PanelTab>
            <PanelTab value="prompts" icon={<PromptsIcon />}>
              Prompts
            </PanelTab>
          </PanelTabs>

          {activeTab === 'files' && (
            <>
              <PanelSearch placeholder="Search files and sources" />
              <PanelActionList>
                <PanelAction
                  icon={<UploadIcon />}
                  label="Upload files"
                  onClick={() => console.log('Upload clicked')}
                />
                <PanelAction
                  icon={<DocVaultIcon />}
                  label="Add from DocVault"
                  onClick={() => console.log('DocVault clicked')}
                />
                <PanelAction
                  icon={<FileNexusIcon />}
                  label="Add from FileNexus"
                  onClick={() => console.log('NetDocs clicked')}
                />
                <PanelAction
                  icon={<CloudDriveIcon />}
                  label="Add from CloudDrive"
                  onClick={() => console.log('CloudDrive clicked')}
                />
              </PanelActionList>
            </>
          )}

          {activeTab === 'prompts' && (
            <>
              <PanelSearch placeholder="Search prompts" />
              <PanelActionList>
                <PanelAction
                  icon={<PlusIcon />}
                  label="Create new prompt"
                  onClick={() => console.log('Create prompt clicked')}
                />
                <PanelAction
                  label="Contract Analysis"
                  description="Analyze contract terms and conditions"
                />
                <PanelAction
                  label="Due Diligence Checklist"
                  description="Standard M&A due diligence items"
                />
                <PanelAction
                  label="Risk Assessment"
                  description="Identify potential legal risks"
                />
              </PanelActionList>
            </>
          )}
        </SourcesPanel>
      </div>
    );
  },
};

export const WithSections: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('files');

    return (
      <div style={{ width: 380 }}>
        <SourcesPanel>
          <PanelTabs value={activeTab} onChange={setActiveTab}>
            <PanelTab value="files" icon={<PlusIcon />}>
              Files and Sources
            </PanelTab>
            <PanelTab value="prompts" icon={<PromptsIcon />}>
              Prompts
            </PanelTab>
          </PanelTabs>

          <PanelSearch placeholder="Search files and sources" />

          <PanelSection title="Quick Actions">
            <PanelActionList>
              <PanelAction
                icon={<UploadIcon />}
                label="Upload files"
              />
            </PanelActionList>
          </PanelSection>

          <PanelSection title="Integrations">
            <PanelActionList>
              <PanelAction
                icon={<DocVaultIcon />}
                label="Add from DocVault"
              />
              <PanelAction
                icon={<FileNexusIcon />}
                label="Add from FileNexus"
              />
              <PanelAction
                icon={<CloudDriveIcon />}
                label="Add from CloudDrive"
              />
            </PanelActionList>
          </PanelSection>
        </SourcesPanel>
      </div>
    );
  },
};

export const TabsOnly: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('files');

    return (
      <div style={{ width: 380 }}>
        <PanelTabs value={activeTab} onChange={setActiveTab}>
          <PanelTab value="files" icon={<FilesIcon />}>
            Files and Sources
          </PanelTab>
          <PanelTab value="prompts" icon={<PromptsIcon />}>
            Prompts
          </PanelTab>
        </PanelTabs>
      </div>
    );
  },
};

export const ActionsOnly: Story = {
  render: () => (
    <div style={{ width: 380, background: 'white', borderRadius: 8 }}>
      <PanelActionList>
        <PanelAction
          icon={<UploadIcon />}
          label="Upload files"
          description="Drag and drop or click to browse"
        />
        <PanelAction
          icon={<DocVaultIcon />}
          label="Add from DocVault"
          description="Connect to your DocVault corpus"
        />
        <PanelAction
          icon={<FileNexusIcon />}
          label="Add from FileNexus"
          description="Import from FileNexus cabinet"
        />
        <PanelAction
          icon={<CloudDriveIcon />}
          label="Add from CloudDrive"
          description="Browse CloudDrive libraries"
        />
      </PanelActionList>
    </div>
  ),
};

export const DisabledActions: Story = {
  render: () => (
    <div style={{ width: 380, background: 'white', borderRadius: 8 }}>
      <PanelActionList>
        <PanelAction
          icon={<UploadIcon />}
          label="Upload files"
        />
        <PanelAction
          icon={<DocVaultIcon />}
          label="Add from DocVault"
          description="Not configured"
          disabled
        />
        <PanelAction
          icon={<FileNexusIcon />}
          label="Add from FileNexus"
          description="Not configured"
          disabled
        />
        <PanelAction
          icon={<CloudDriveIcon />}
          label="Add from CloudDrive"
        />
      </PanelActionList>
    </div>
  ),
};
