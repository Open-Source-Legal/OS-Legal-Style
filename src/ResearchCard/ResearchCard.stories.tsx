import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ResearchCard,
  UserQuestion,
  AIResponse,
  SourcesBadge,
  ResearchSection,
  StepsList,
} from './ResearchCard';
import type { StepItem } from './ResearchCard';

const meta: Meta<typeof ResearchCard> = {
  title: 'Chat/ResearchCard',
  component: ResearchCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResearchCard>;

const LexiconIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="9" fill="#E85B5B" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <ResearchCard
        title="Analysis of Contract Indemnification Standards"
        onBack={() => console.log('Back clicked')}
      >
        <UserQuestion>
          What are the key factors in evaluating indemnification clause scope in commercial agreements?
        </UserQuestion>

        <AIResponse
          stepsCompleted={5}
          status="completed"
          expandable
          sourcesBadge={
            <SourcesBadge
              count={8}
              provider="Lexicon"
              icon={<LexiconIcon />}
              onClick={() => console.log('Sources clicked')}
            />
          }
        >
          <ResearchSection heading="Key Principles for Indemnification Analysis">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </ResearchSection>
        </AIResponse>
      </ResearchCard>
    </div>
  ),
};

export const Researching: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <ResearchCard
        title="Contract Clause Analysis"
        onBack={() => console.log('Back clicked')}
      >
        <UserQuestion>
          What are the key elements of a force majeure clause in commercial contracts?
        </UserQuestion>

        <AIResponse
          status="researching"
          stepsCompleted={3}
          totalSteps={5}
          expandable
        />
      </ResearchCard>
    </div>
  ),
};

export const WithExpandedSteps: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);

    const steps: StepItem[] = [
      { id: '1', label: 'Searching legal databases', status: 'completed' },
      { id: '2', label: 'Analyzing relevant case law', status: 'completed' },
      { id: '3', label: 'Extracting key principles', status: 'completed' },
      { id: '4', label: 'Cross-referencing statutes', status: 'completed' },
      { id: '5', label: 'Generating summary', status: 'completed' },
    ];

    return (
      <div style={{ width: 600 }}>
        <ResearchCard
          title="Analysis of Contract Indemnification Standards"
          onBack={() => console.log('Back clicked')}
        >
          <UserQuestion>
            What are the key factors in evaluating indemnification clause scope in commercial agreements?
          </UserQuestion>

          <AIResponse
            stepsCompleted={5}
            status="completed"
            expandable
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            sourcesBadge={
              <SourcesBadge
                count={8}
                provider="Lexicon"
                icon={<LexiconIcon />}
                onClick={() => console.log('Sources clicked')}
              />
            }
          >
            {expanded && <StepsList steps={steps} />}

            <ResearchSection heading="Key Principles for Indemnification Analysis">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </ResearchSection>
          </AIResponse>
        </ResearchCard>
      </div>
    );
  },
};

export const InProgressSteps: Story = {
  render: () => {
    const steps: StepItem[] = [
      { id: '1', label: 'Searching legal databases', status: 'completed', description: 'Found 127 relevant documents' },
      { id: '2', label: 'Analyzing relevant case law', status: 'completed', description: 'Analyzed 24 key cases' },
      { id: '3', label: 'Extracting key principles', status: 'running' },
      { id: '4', label: 'Cross-referencing statutes', status: 'pending' },
      { id: '5', label: 'Generating summary', status: 'pending' },
    ];

    return (
      <div style={{ width: 600 }}>
        <ResearchCard
          title="Contract Analysis"
          onBack={() => console.log('Back clicked')}
        >
          <UserQuestion>
            What are the standard indemnification provisions in M&A agreements?
          </UserQuestion>

          <AIResponse
            status="researching"
            stepsCompleted={2}
            totalSteps={5}
            expandable
            expanded
          >
            <StepsList steps={steps} />
          </AIResponse>
        </ResearchCard>
      </div>
    );
  },
};

export const SourcesBadgeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SourcesBadge count={8} provider="Lexicon" icon={<LexiconIcon />} />
      <SourcesBadge count={12} provider="DocuSearch" />
      <SourcesBadge count={3} />
      <SourcesBadge count={1} />
    </div>
  ),
};
