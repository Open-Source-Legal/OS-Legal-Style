import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  DiscussionList,
  DiscussionItem,
  DiscussionFilters,
  DiscussionStats,
  NewDiscussionButton,
  CategoryBadge,
  DiscussionSortOption,
} from './Discussion';
import { Avatar, AvatarGroup } from '../Avatar';
// Note: EmptyState component not needed here - we use custom empty content

const meta: Meta<typeof DiscussionList> = {
  title: 'Discussion/DiscussionList',
  component: DiscussionList,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DiscussionList>;

// Sample discussion data
const sampleDiscussions = [
  {
    id: '1',
    title: 'Question about Section 4.2 - Indemnification Clause scope',
    author: {
      name: 'Sarah Chen',
      avatar: <Avatar fallback="SC" size="sm" />,
      badge: 'Attorney',
    },
    category: 'question' as const,
    status: 'open' as const,
    preview: 'I\'m reviewing the indemnification clause and have concerns about the scope of coverage. Can someone clarify if we intended to cover third-party IP claims?',
    tags: ['contract-review', 'urgent'],
    replyCount: 12,
    viewCount: 234,
    voteCount: 8,
    participants: (
      <AvatarGroup max={3} size="xs">
        <Avatar fallback="SC" />
        <Avatar fallback="MJ" />
        <Avatar fallback="AR" />
        <Avatar fallback="ED" />
      </AvatarGroup>
    ),
    createdAt: '2 hours ago',
    lastActivity: '15 min ago',
  },
  {
    id: '2',
    title: 'IMPORTANT: New document naming convention effective January 2025',
    author: {
      name: 'Emma Davis',
      avatar: <Avatar fallback="ED" size="sm" />,
      badge: 'Senior Partner',
    },
    category: 'announcement' as const,
    status: 'pinned' as const,
    preview: 'Please review the updated naming convention for all matter documents. Format: [ClientCode]-[MatterID]-[DocType]-[Version]',
    tags: ['policy', 'documentation'],
    replyCount: 5,
    viewCount: 892,
    voteCount: 24,
    pinned: true,
    createdAt: 'Dec 20',
    lastActivity: '1 day ago',
  },
  {
    id: '3',
    title: 'Best practices for handling multi-jurisdictional contracts',
    author: {
      name: 'Mike Johnson',
      avatar: <Avatar fallback="MJ" size="sm" />,
    },
    category: 'idea' as const,
    status: 'answered' as const,
    preview: 'I\'ve compiled a list of best practices based on our recent cross-border transactions. Sharing for team knowledge.',
    tags: ['best-practices', 'international'],
    replyCount: 23,
    viewCount: 456,
    voteCount: 31,
    hasVoted: true,
    createdAt: 'Dec 18',
    lastActivity: '3 days ago',
  },
  {
    id: '4',
    title: 'Help needed: Extracting metadata from legacy PDF contracts',
    author: {
      name: 'Alex Rivera',
      avatar: <Avatar fallback="AR" size="sm" />,
    },
    category: 'help' as const,
    preview: 'We have a batch of 200+ legacy contracts that need metadata extraction. Has anyone done this at scale?',
    replyCount: 7,
    viewCount: 89,
    voteCount: 4,
    createdAt: 'Dec 22',
    lastActivity: '5 hours ago',
  },
  {
    id: '5',
    title: 'Show & Tell: New annotation workflow I developed',
    author: {
      name: 'Jordan Lee',
      avatar: <Avatar fallback="JL" size="sm" />,
    },
    category: 'show' as const,
    preview: 'Created a streamlined annotation workflow that cuts review time by 40%. Demo video inside!',
    tags: ['workflow', 'efficiency'],
    replyCount: 18,
    viewCount: 312,
    voteCount: 42,
    hasVoted: true,
    createdAt: 'Dec 15',
    lastActivity: '1 week ago',
  },
];

// Default filter categories
const defaultCategories = [
  { id: 'all', label: 'All', count: 47 },
  { id: 'question', label: 'Questions', count: 12 },
  { id: 'announcement', label: 'Announcements', count: 3 },
  { id: 'idea', label: 'Ideas', count: 8 },
  { id: 'help', label: 'Help Wanted', count: 5 },
  { id: 'show', label: 'Show & Tell', count: 19 },
];

const defaultSortOptions = [
  { id: 'recentActivity' as const, label: 'Recent Activity' },
  { id: 'newest' as const, label: 'Newest' },
  { id: 'mostReplies' as const, label: 'Most Replies' },
  { id: 'mostVotes' as const, label: 'Most Votes' },
];

// ============ Stories ============

export const Default: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState<DiscussionSortOption>('recentActivity');
    const [searchValue, setSearchValue] = useState('');

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1E293B' }}>Discussions</h1>
          <NewDiscussionButton />
        </div>

        <DiscussionStats
          totalCount={47}
          openCount={32}
          answeredCount={15}
          participantCount={28}
        />

        <DiscussionFilters
          categories={defaultCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortOptions={defaultSortOptions}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <DiscussionList onItemClick={(id) => console.log('Clicked:', id)}>
          {sampleDiscussions.map((discussion) => (
            <DiscussionItem
              key={discussion.id}
              {...discussion}
              onVote={() => console.log('Vote:', discussion.id)}
            />
          ))}
        </DiscussionList>
      </div>
    );
  },
};

export const CompactVariant: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Recent Discussions</h2>
      <DiscussionList variant="compact" onItemClick={(id) => console.log('Clicked:', id)}>
        {sampleDiscussions.map((discussion) => (
          <DiscussionItem
            key={discussion.id}
            {...discussion}
          />
        ))}
      </DiscussionList>
    </div>
  ),
};

export const MinimalVariant: Story = {
  render: () => (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Activity</h2>
      <DiscussionList variant="minimal" onItemClick={(id) => console.log('Clicked:', id)}>
        {sampleDiscussions.slice(0, 4).map((discussion) => (
          <DiscussionItem
            key={discussion.id}
            {...discussion}
          />
        ))}
      </DiscussionList>
    </div>
  ),
};

export const Empty: Story = {
  name: 'Empty State',
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1E293B' }}>Discussions</h1>
        <NewDiscussionButton />
      </div>

      <DiscussionList
        emptyState={
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, margin: '0 auto 16px', color: '#94A3B8' }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="8" y="12" width="48" height="40" rx="4" />
                <path d="M8 24h48" />
                <path d="M20 34h24M20 42h16" strokeLinecap="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B', margin: '0 0 8px' }}>
              No discussions yet
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 24px', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
              Start a conversation about documents, annotations, or legal interpretations in this corpus.
            </p>
            <NewDiscussionButton>Start a Discussion</NewDiscussionButton>
          </div>
        }
      />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Loading...</h2>
      <DiscussionList loading />
    </div>
  ),
};

export const WithFiltersOnly: Story = {
  render: () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchValue, setSearchValue] = useState('');

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <DiscussionFilters
          categories={defaultCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search discussions..."
        />
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          Category: {activeCategory}, Search: "{searchValue}"
        </p>
      </div>
    );
  },
};

export const CategoryBadges: Story = {
  name: 'Category Badges',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '20px' }}>
      <CategoryBadge category="general" />
      <CategoryBadge category="question" />
      <CategoryBadge category="announcement" />
      <CategoryBadge category="idea" />
      <CategoryBadge category="help" />
      <CategoryBadge category="show" />
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <DiscussionList>
        <DiscussionItem
          id="single"
          title="How do I extract specific clauses from uploaded contracts?"
          author={{
            name: 'New User',
            avatar: <Avatar fallback="NU" size="sm" />,
          }}
          category="question"
          preview="I'm new to the platform and trying to understand how to extract indemnification clauses from my uploaded contracts. Is there an automated way to do this?"
          tags={['getting-started', 'extraction']}
          replyCount={0}
          viewCount={12}
          voteCount={1}
          createdAt="Just now"
          lastActivity="Just now"
          unread
        />
      </DiscussionList>
    </div>
  ),
};

export const AnsweredDiscussion: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <DiscussionList>
        <DiscussionItem
          id="answered"
          title="What's the difference between annotations and extracts?"
          author={{
            name: 'Mike Johnson',
            avatar: <Avatar fallback="MJ" size="sm" />,
          }}
          category="question"
          status="answered"
          preview="I'm trying to understand the difference between these two features. When should I use annotations vs extracts?"
          replyCount={8}
          viewCount={156}
          voteCount={12}
          hasVoted
          createdAt="3 days ago"
          lastActivity="1 day ago"
          participants={
            <AvatarGroup max={3} size="xs">
              <Avatar fallback="MJ" />
              <Avatar fallback="SC" />
              <Avatar fallback="ED" />
            </AvatarGroup>
          }
        />
      </DiscussionList>
    </div>
  ),
};

export const PinnedAnnouncement: Story = {
  render: () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <DiscussionList>
        <DiscussionItem
          id="pinned"
          title="System maintenance scheduled for December 31st"
          author={{
            name: 'System Admin',
            avatar: <Avatar fallback="SA" size="sm" accent />,
            badge: 'Admin',
          }}
          category="announcement"
          status="pinned"
          pinned
          preview="Open Contracts will undergo scheduled maintenance on December 31st from 2:00 AM to 6:00 AM EST. Please save your work beforehand."
          tags={['maintenance', 'system']}
          replyCount={3}
          viewCount={1024}
          voteCount={0}
          createdAt="Dec 28"
          lastActivity="Dec 28"
        />
      </DiscussionList>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [discussions, setDiscussions] = useState(sampleDiscussions.map(d => ({
      ...d,
      hasVoted: d.hasVoted || false,
      voteCount: d.voteCount,
    })));
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeSort, setActiveSort] = useState<DiscussionSortOption>('recentActivity');

    const handleVote = (id: string) => {
      setDiscussions(prev => prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            hasVoted: !d.hasVoted,
            voteCount: d.hasVoted ? d.voteCount - 1 : d.voteCount + 1,
          };
        }
        return d;
      }));
    };

    const filteredDiscussions = activeCategory === 'all'
      ? discussions
      : discussions.filter(d => d.category === activeCategory);

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1E293B' }}>
            Interactive Demo
          </h1>
          <NewDiscussionButton onClick={() => alert('New discussion clicked!')} />
        </div>

        <DiscussionFilters
          categories={defaultCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortOptions={defaultSortOptions}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />

        <DiscussionList onItemClick={(id) => alert(`Navigate to discussion: ${id}`)}>
          {filteredDiscussions.map((discussion) => (
            <DiscussionItem
              key={discussion.id}
              {...discussion}
              onVote={() => handleVote(discussion.id)}
            />
          ))}
        </DiscussionList>
      </div>
    );
  },
};
