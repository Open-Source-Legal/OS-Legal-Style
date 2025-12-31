import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Hero,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroSearch,
  HeroActions,
  HeroAction,
  HeroContent,
  HeroMedia,
  SparkleIcon,
} from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Layout/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hero>;

// Icons for actions
const CollectionsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
  </svg>
);

const DiscussionIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M14 4v6a2 2 0 01-2 2H6l-4 3V4a2 2 0 012-2h8a2 2 0 012 2zM5 6H3v2h2V6zm2 0h2v2H7V6zm6 0h-2v2h2V6z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Hero size="md" showDecorations>
      <HeroBadge icon={<SparkleIcon />}>
        Open Source Document Analytics Platform
      </HeroBadge>
      <HeroTitle>
        Discover, Analyze &<br />
        Collaborate on Documents
      </HeroTitle>
      <HeroSubtitle>
        Welcome back! Explore trending collections, join discussions, and discover insights from the community.
      </HeroSubtitle>
      <HeroSearch
        placeholder="Search discussions, documents, collections..."
        onSubmit={(value) => console.log('Search:', value)}
      />
      <HeroActions>
        <HeroAction icon={<CollectionsIcon />}>Browse Collections</HeroAction>
        <HeroAction icon={<DiscussionIcon />}>All Discussions</HeroAction>
        <HeroAction icon={<UsersIcon />}>Top Contributors</HeroAction>
      </HeroActions>
    </Hero>
  ),
};

export const Small: Story = {
  render: () => (
    <Hero size="sm">
      <HeroBadge>New Feature</HeroBadge>
      <HeroTitle as="h2">
        Get Started Quickly
      </HeroTitle>
      <HeroSubtitle>
        Start exploring documents and collaborating with your team.
      </HeroSubtitle>
      <HeroActions>
        <HeroAction>Learn More</HeroAction>
        <HeroAction>View Demo</HeroAction>
      </HeroActions>
    </Hero>
  ),
};

export const Large: Story = {
  render: () => (
    <Hero size="lg" showDecorations>
      <HeroBadge icon={<SparkleIcon />}>
        Enterprise Ready
      </HeroBadge>
      <HeroTitle>
        Document Intelligence<br />
        for Modern Teams
      </HeroTitle>
      <HeroSubtitle>
        Harness the power of AI to analyze contracts, extract insights, and streamline your legal workflows. Built for security-conscious enterprises.
      </HeroSubtitle>
      <HeroSearch
        placeholder="What would you like to analyze?"
        buttonText="Get Started"
        onSubmit={(value) => console.log('Search:', value)}
      />
    </Hero>
  ),
};

export const WithoutGradient: Story = {
  render: () => (
    <Hero size="md">
      <HeroBadge>Documentation</HeroBadge>
      <HeroTitle gradient={false}>
        Component Library
      </HeroTitle>
      <HeroSubtitle>
        Build beautiful, consistent interfaces with our design system.
      </HeroSubtitle>
      <HeroActions>
        <HeroAction>Get Started</HeroAction>
        <HeroAction>View Components</HeroAction>
      </HeroActions>
    </Hero>
  ),
};

export const SplitLayout: Story = {
  render: () => (
    <Hero variant="split" size="lg">
      <HeroContent align="left">
        <HeroBadge icon={<SparkleIcon />}>
          AI-Powered
        </HeroBadge>
        <HeroTitle>
          Smart Contract Analysis
        </HeroTitle>
        <HeroSubtitle>
          Upload your contracts and let our AI extract key terms, identify risks, and provide actionable insights in seconds.
        </HeroSubtitle>
        <HeroActions>
          <HeroAction>Upload Contract</HeroAction>
          <HeroAction>See Examples</HeroAction>
        </HeroActions>
      </HeroContent>
      <HeroMedia>
        <div style={{
          width: 400,
          height: 300,
          background: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 14,
          fontWeight: 500,
        }}>
          [Illustration / Screenshot]
        </div>
      </HeroMedia>
    </Hero>
  ),
};

export const CustomBackground: Story = {
  render: () => (
    <Hero
      size="md"
      background="linear-gradient(135deg, #0F172A 0%, #1E293B 100%)"
      style={{ color: 'white' }}
    >
      <HeroBadge style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
        <span style={{ color: '#0891B2' }}>●</span> Now Available
      </HeroBadge>
      <HeroTitle style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text' }}>
        Dark Mode Support
      </HeroTitle>
      <HeroSubtitle style={{ color: 'rgba(255,255,255,0.7)' }}>
        Our components now fully support dark mode out of the box.
      </HeroSubtitle>
      <HeroSearch
        placeholder="Search documentation..."
        onSubmit={(value) => console.log('Search:', value)}
      />
    </Hero>
  ),
};

export const MinimalWithSearch: Story = {
  render: () => (
    <Hero size="sm">
      <HeroTitle as="h2" gradient={false}>
        Search Documents
      </HeroTitle>
      <HeroSearch
        placeholder="Enter keywords, phrases, or questions..."
        buttonText="Search"
        onSubmit={(value) => console.log('Search:', value)}
      />
    </Hero>
  ),
};

export const LoadingSearch: Story = {
  render: () => (
    <Hero size="md">
      <HeroTitle>
        Searching...
      </HeroTitle>
      <HeroSubtitle>
        Finding relevant documents across your corpus.
      </HeroSubtitle>
      <HeroSearch
        placeholder="contract indemnification clauses"
        value="contract indemnification clauses"
        loading
      />
    </Hero>
  ),
};
