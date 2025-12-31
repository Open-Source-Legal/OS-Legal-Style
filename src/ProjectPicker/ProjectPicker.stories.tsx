import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectPicker, ProjectItem, ProjectSearch } from './ProjectPicker';

const meta: Meta<typeof ProjectPicker> = {
  title: 'Chat/ProjectPicker',
  component: ProjectPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectPicker>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('kb-1');

    return (
      <div style={{ width: 400 }}>
        <ProjectPicker
          title="Choose Extract Project"
          subtitle="3 projects available"
        >
          <ProjectItem
            id="kb-1"
            name="Riverside Knowledge Base"
            description="Internal knowledge base"
            type="knowledge-base"
            selected={selected === 'kb-1'}
            onSelect={setSelected}
          />
          <ProjectItem
            id="folder-1"
            name="Merger Agreements"
            description="3,902 files"
            type="folder"
            selected={selected === 'folder-1'}
            onSelect={setSelected}
          />
          <ProjectItem
            id="folder-2"
            name="Commercial Contracts"
            type="folder"
            selected={selected === 'folder-2'}
            onSelect={setSelected}
          />
        </ProjectPicker>
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    const [search, setSearch] = useState('');

    const projects = [
      { id: 'kb-1', name: 'Riverside Knowledge Base', description: 'Internal knowledge base', type: 'knowledge-base' as const },
      { id: 'folder-1', name: 'Merger Agreements', description: '3,902 files', type: 'folder' as const },
      { id: 'folder-2', name: 'Commercial Contracts', description: '1,247 files', type: 'folder' as const },
      { id: 'extract-1', name: 'Client Confidential', description: 'Restricted access', type: 'extract' as const },
      { id: 'corpus-1', name: 'Due Diligence Corpus', description: '45 active matters', type: 'corpus' as const },
    ];

    const filteredProjects = projects.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div style={{ width: 400 }}>
        <ProjectPicker
          title="Choose Extract Project"
          subtitle={`${projects.length} projects available`}
        >
          <ProjectSearch
            value={search}
            onChange={setSearch}
            placeholder="Search projects..."
          />
          {filteredProjects.map(project => (
            <ProjectItem
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              type={project.type}
              selected={selected === project.id}
              onSelect={setSelected}
            />
          ))}
        </ProjectPicker>
      </div>
    );
  },
};

export const Closed: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProjectPicker
        title="Choose Extract Project"
        subtitle="3 projects available"
        defaultOpen={false}
      >
        <ProjectItem
          id="kb-1"
          name="Riverside Knowledge Base"
          description="Internal knowledge base"
          type="knowledge-base"
        />
        <ProjectItem
          id="folder-1"
          name="Merger Agreements"
          description="3,902 files"
          type="folder"
        />
        <ProjectItem
          id="folder-2"
          name="Commercial Contracts"
          type="folder"
        />
      </ProjectPicker>
    </div>
  ),
};

export const AllProjectTypes: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div style={{ width: 400 }}>
        <ProjectPicker
          title="All Project Types"
          subtitle="4 projects available"
        >
          <ProjectItem
            id="kb"
            name="Knowledge Base"
            description="Shared team knowledge"
            type="knowledge-base"
            selected={selected === 'kb'}
            onSelect={setSelected}
          />
          <ProjectItem
            id="folder"
            name="Document Folder"
            description="1,234 files"
            type="folder"
            selected={selected === 'folder'}
            onSelect={setSelected}
          />
          <ProjectItem
            id="corpus"
            name="Active Corpus"
            description="Current matters"
            type="corpus"
            selected={selected === 'corpus'}
            onSelect={setSelected}
          />
          <ProjectItem
            id="extract"
            name="Secure Extract"
            description="Encrypted storage"
            type="extract"
            selected={selected === 'extract'}
            onSelect={setSelected}
          />
        </ProjectPicker>
      </div>
    );
  },
};

export const SingleItem: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProjectItem
        id="kb-1"
        name="Riverside Knowledge Base"
        description="Internal knowledge base"
        type="knowledge-base"
        selected
      />
    </div>
  ),
};
