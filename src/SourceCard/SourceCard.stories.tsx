import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SourceCard, SourcePill, SourceList, Citation } from './SourceCard';
import { sourceCardStyles } from './SourceCard.styles';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = sourceCardStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof SourceCard> = {
  title: 'Chat/SourceCard',
  component: SourceCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SourceCard>;

export const Default: Story = {
  args: {
    title: 'Witness Statement - Exhibit C5',
    type: 'pdf',
    reference: 'Pages 12-15',
    onOpen: () => alert('Opening document...'),
  },
};

export const WithExcerpt: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SourceCard
        title="Contract Agreement v2"
        type="docx"
        reference="Section 4.2"
        excerpt="The parties agree that all disputes arising from this agreement shall be resolved through binding arbitration..."
        onOpen={() => alert('Opening...')}
      />
    </div>
  ),
};

export const WithScore: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SourceCard
        title="Deposition Transcript"
        type="pdf"
        reference="p. 45-52"
        excerpt="During cross-examination, the witness stated that they were not present at the meeting..."
        score={87}
        onOpen={() => alert('Opening...')}
      />
    </div>
  ),
};

export const DocumentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <SourceCard title="Legal Brief.pdf" type="pdf" reference="Full document" />
      <SourceCard title="Contract Draft.docx" type="docx" reference="Pages 1-10" />
      <SourceCard title="Financial Report.xlsx" type="xlsx" reference="Sheet 1" />
      <SourceCard title="Meeting Notes.txt" type="txt" reference="Lines 1-50" />
      <SourceCard title="Evidence Photo.jpg" type="img" reference="Exhibit A" />
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <SourceCard title="Exhibit C5" type="pdf" inline onOpen={() => {}} />
      <SourceCard title="Deposition" type="docx" inline onOpen={() => {}} />
      <SourceCard title="Email Thread" type="doc" inline onOpen={() => {}} />
    </div>
  ),
};

export const SourcePills: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <SourcePill name="Exhibit C5" type="pdf" reference="p. 12" onOpen={() => {}} />
      <SourcePill name="Contract.docx" type="docx" reference="¶ 4.2" onOpen={() => {}} />
      <SourcePill name="Financials.xlsx" type="xlsx" onOpen={() => {}} />
    </div>
  ),
};

export const SourceListExample: Story = {
  name: 'Source List',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <SourceList title="Referenced Documents" count={4}>
        <SourceCard
          title="Witness Statement - Exhibit C5"
          type="pdf"
          reference="Pages 12-15"
          score={95}
          onOpen={() => {}}
        />
        <SourceCard
          title="R2 Witness Statement"
          type="docx"
          reference="August deposition"
          score={88}
          onOpen={() => {}}
        />
        <SourceCard
          title="Email Correspondence"
          type="doc"
          reference="Thread #4521"
          score={72}
          onOpen={() => {}}
        />
        <SourceCard
          title="Meeting Minutes"
          type="pdf"
          reference="Nov 15, 2024"
          score={65}
          onOpen={() => {}}
        />
      </SourceList>
    </div>
  ),
};

export const Citations: Story = {
  render: () => (
    <div style={{ maxWidth: '500px', lineHeight: 1.8 }}>
      <p style={{ margin: 0 }}>
        The witness testimony states that the meeting occurred at approximately 3:00 PM
        <Citation number={1} onClick={() => alert('Citation 1')} />, which directly contradicts
        the timeline presented in the original deposition
        <Citation number={2} onClick={() => alert('Citation 2')} />. Furthermore, the email
        correspondence
        <Citation number={3} onClick={() => alert('Citation 3')} /> suggests a completely different
        sequence of events.
      </p>
    </div>
  ),
};

export const ReadingSources: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: '#6B6B6B',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#E85A4F',
          animation: 'pulse 1.5s ease infinite',
        }} />
        Reading 3 sources
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SourceCard title="Matter 2024-001 - Exhibit C5" type="pdf" reference="PDF document" inline />
        <SourceCard title="Matter 2024-001 - R2 Witness" type="docx" reference="Word document" inline />
        <SourceCard title="Matter 2024-001 - R3 Statement" type="pdf" reference="PDF document" inline />
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  ),
};
