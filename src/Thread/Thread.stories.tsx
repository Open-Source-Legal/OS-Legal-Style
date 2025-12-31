import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  ThreadView,
  ThreadPost,
  ThreadReply,
  Mention,
  LinkedResource,
  ResourceList,
  ReactionButton,
  ReactionBar,
  ThreadAction,
  ThreadInput,
  ThreadMeta,
} from './Thread';
import { Avatar, AvatarGroup } from '../Avatar';
import { ChatInput } from '../Chat';
import { SourceCard, SourcePill } from '../SourceCard';

const meta: Meta<typeof ThreadView> = {
  title: 'Discussion/Thread',
  component: ThreadView,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ThreadView>;

// Icons for actions
const ReplyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M4 3a2 2 0 00-2 2v4a2 2 0 002 2h1v2l3-2h2a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M10.586 1.586a2 2 0 012.828 2.828l-7.5 7.5a1 1 0 01-.39.242l-3 1a.5.5 0 01-.632-.632l1-3a1 1 0 01.242-.39l7.5-7.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1H3a1 1 0 000 2v6a2 2 0 002 2h4a2 2 0 002-2V5a1 1 0 000-2h-1a1 1 0 00-1-1H5zm1 1h2v1H6V3zm-1 3a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 015 6zm3 0a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 6z" clipRule="evenodd" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3.5 4A1.5 1.5 0 002 5.5v2A1.5 1.5 0 003.5 9H4v1.5a.5.5 0 001 0V9h.5A1.5 1.5 0 007 7.5v-2A1.5 1.5 0 005.5 4h-2zm5 0A1.5 1.5 0 007 5.5v2A1.5 1.5 0 008.5 9H9v1.5a.5.5 0 001 0V9h.5a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 0010.5 4h-2z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3 2.5A1.5 1.5 0 014.5 1h5A1.5 1.5 0 0111 2.5v10a.5.5 0 01-.765.424L7 10.882l-3.235 2.042A.5.5 0 013 12.5v-10z" />
  </svg>
);

// Sample data
const users = {
  sarah: {
    name: 'Sarah Chen',
    avatar: <Avatar fallback="SC" size="md" />,
    smallAvatar: <Avatar fallback="SC" size="xs" />,
    badge: 'Attorney',
  },
  mike: {
    name: 'Mike Johnson',
    avatar: <Avatar fallback="MJ" size="md" />,
    smallAvatar: <Avatar fallback="MJ" size="xs" />,
    badge: 'Paralegal',
  },
  alex: {
    name: 'Alex Rivera',
    avatar: <Avatar fallback="AR" size="sm" />,
    smallAvatar: <Avatar fallback="AR" size="xs" />,
  },
  emma: {
    name: 'Emma Davis',
    avatar: <Avatar fallback="ED" size="sm" />,
    smallAvatar: <Avatar fallback="ED" size="xs" />,
    badge: 'Senior Partner',
  },
};

// ============ Stories ============

export const Default: Story = {
  render: () => (
    <ThreadView title="Question about Section 4.2 - Indemnification Clause">
      <ThreadMeta
        views={234}
        replies={12}
        participants={
          <AvatarGroup max={3} size="xs">
            <Avatar fallback="SC" />
            <Avatar fallback="MJ" />
            <Avatar fallback="AR" />
            <Avatar fallback="ED" />
          </AvatarGroup>
        }
        lastActivity="2 hours ago"
      />

      <ThreadPost
        isRoot
        avatar={users.sarah.avatar}
        author={users.sarah.name}
        authorBadge={users.sarah.badge}
        timestamp="Dec 28, 2024 at 2:15 PM"
        replyCount={12}
        resources={
          <ResourceList label="Linked Resources">
            <LinkedResource
              type="document"
              title="Master Services Agreement"
              reference="Section 4.2"
              onClick={() => {}}
            />
            <LinkedResource
              type="annotation"
              title="Indemnification review note"
              onClick={() => {}}
            />
          </ResourceList>
        }
        reactions={
          <ReactionBar onAddReaction={() => {}}>
            <ReactionButton reaction="thumbsUp" count={5} active />
            <ReactionButton reaction="thinking" count={2} />
          </ReactionBar>
        }
        actions={
          <>
            <ThreadAction icon={<ReplyIcon />} label="Reply" />
            <ThreadAction icon={<QuoteIcon />} label="Quote" />
            <ThreadAction icon={<BookmarkIcon />} label="Bookmark" />
          </>
        }
      >
        <p>
          I'm reviewing the indemnification clause in <Mention name="Mike Johnson" /> 's latest draft and I have
          some concerns about the scope of coverage. The current language seems overly broad.
        </p>
        <p>
          Can someone clarify if we intended to cover third-party IP claims here? I think we need to
          narrow this down before sending to the client.
        </p>
      </ThreadPost>

      <ThreadReply
        id="reply-1"
        avatar={users.mike.avatar}
        author={users.mike.name}
        authorBadge={users.mike.badge}
        timestamp="Dec 28, 2:45 PM"
        reactions={
          <ReactionBar>
            <ReactionButton reaction="thumbsUp" count={3} />
          </ReactionBar>
        }
        actions={
          <>
            <ThreadAction icon={<ReplyIcon />} label="Reply" />
            <ThreadAction icon={<QuoteIcon />} label="Quote" />
          </>
        }
        replies={
          <>
            <ThreadReply
              id="reply-1-1"
              avatar={users.alex.avatar}
              author={users.alex.name}
              timestamp="Dec 28, 3:00 PM"
              actions={
                <>
                  <ThreadAction icon={<ReplyIcon />} label="Reply" />
                </>
              }
            >
              <p>
                Agreed with Mike. The carve-out language from the prior deal worked well.
                <Mention name="Emma Davis" /> might have that template handy.
              </p>
            </ThreadReply>

            <ThreadReply
              id="reply-1-2"
              avatar={users.emma.avatar}
              author={users.emma.name}
              authorBadge={users.emma.badge}
              timestamp="Dec 28, 3:15 PM"
              reactions={
                <ReactionBar>
                  <ReactionButton reaction="heart" count={2} active />
                </ReactionBar>
              }
              resources={
                <ResourceList>
                  <LinkedResource
                    type="clause"
                    title="Standard IP Carve-out"
                    reference="v2.1"
                    onClick={() => {}}
                  />
                </ResourceList>
              }
            >
              <p>
                Here's the template we used. It explicitly excludes pre-existing IP and limits
                coverage to direct infringement only. Should address your concerns.
              </p>
            </ThreadReply>
          </>
        }
      >
        <p>
          Good catch, Sarah. The current draft does include third-party IP claims. This was
          intentional based on the client's request, but I agree we should add a carve-out
          for pre-existing IP.
        </p>
      </ThreadReply>

      <ThreadInput>
        <ChatInput
          placeholder="Add a reply..."
          leftActions={
            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
              </svg>
            </button>
          }
        />
      </ThreadInput>
    </ThreadView>
  ),
};

export const WithSourceCards: Story = {
  name: 'With Source Documents',
  render: () => (
    <ThreadView title="Research findings for merger due diligence">
      <ThreadPost
        isRoot
        avatar={users.emma.avatar}
        author={users.emma.name}
        authorBadge={users.emma.badge}
        timestamp="Dec 27, 2024 at 10:00 AM"
        resources={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <SourceCard
              title="Target Company Financials"
              type="xlsx"
              reference="Q3 2024"
              excerpt="Revenue projections and EBITDA analysis for the target acquisition"
              score={95}
              onOpen={() => {}}
            />
            <SourceCard
              title="Due Diligence Report"
              type="pdf"
              reference="Draft v3"
              excerpt="Comprehensive due diligence findings including risk assessment"
              score={88}
              onOpen={() => {}}
            />
          </div>
        }
        reactions={
          <ReactionBar onAddReaction={() => {}}>
            <ReactionButton reaction="thumbsUp" count={8} active />
            <ReactionButton reaction="celebrate" count={3} />
          </ReactionBar>
        }
      >
        <p>
          Team, I've completed the initial due diligence review. Please see the attached documents
          for the financial analysis and risk assessment.
        </p>
        <p>
          Key concerns: <Mention name="Sarah Chen" /> please review Section 3 regarding the pending
          litigation disclosure. <Mention name="Mike Johnson" /> can you verify the IP assignments?
        </p>
      </ThreadPost>
    </ThreadView>
  ),
};

export const ResolvedThread: Story = {
  render: () => (
    <ThreadView
      title="Clarification needed on payment terms"
      status="resolved"
    >
      <ThreadMeta
        views={89}
        replies={4}
        lastActivity="Dec 26, 2024"
      />

      <ThreadPost
        isRoot
        avatar={users.alex.avatar}
        author={users.alex.name}
        timestamp="Dec 25, 2024 at 4:30 PM"
        replyCount={4}
      >
        <p>
          The payment terms in Section 7.1 seem inconsistent with what we discussed in the
          last meeting. Can someone confirm if Net 30 or Net 45 is correct?
        </p>
      </ThreadPost>

      <ThreadReply
        highlighted
        avatar={users.sarah.avatar}
        author={users.sarah.name}
        authorBadge="Attorney"
        timestamp="Dec 26, 9:00 AM"
        reactions={
          <ReactionBar>
            <ReactionButton reaction="thumbsUp" count={4} active />
          </ReactionBar>
        }
      >
        <p>
          Confirmed with the client - it should be Net 45. I've updated the document and
          marked this as resolved. Thanks for catching this!
        </p>
      </ThreadReply>
    </ThreadView>
  ),
};

export const PinnedThread: Story = {
  render: () => (
    <ThreadView
      title="IMPORTANT: New document naming convention"
      pinned
    >
      <ThreadPost
        isRoot
        avatar={users.emma.avatar}
        author={users.emma.name}
        authorBadge="Senior Partner"
        timestamp="Dec 20, 2024"
        resources={
          <ResourceList label="References">
            <LinkedResource
              type="collection"
              title="Document Standards"
              onClick={() => {}}
            />
          </ResourceList>
        }
      >
        <p>
          Please note the updated naming convention for all matter documents effective
          January 1, 2025. Format: [ClientCode]-[MatterID]-[DocType]-[Version]
        </p>
        <p>
          Example: ABC-2024-001-MSA-v2.docx
        </p>
      </ThreadPost>
    </ThreadView>
  ),
};

export const LockedThread: Story = {
  render: () => (
    <ThreadView
      title="Archived discussion - Q2 compliance review"
      status="archived"
      locked
    >
      <ThreadPost
        isRoot
        avatar={users.mike.avatar}
        author={users.mike.name}
        timestamp="Jun 15, 2024"
      >
        <p>
          This thread has been archived following the completion of Q2 compliance review.
          For Q3 discussions, please start a new thread.
        </p>
      </ThreadPost>
    </ThreadView>
  ),
};

export const MentionExamples: Story = {
  name: 'Mentions & Resources',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <section>
        <h3 style={{ marginBottom: '16px', color: '#1E293B' }}>Mentions</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Mention name="Sarah Chen" />
          <Mention name="Mike Johnson" avatar={users.mike.smallAvatar} />
          <Mention name="Legal Team" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: '#1E293B' }}>Linked Resources</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <LinkedResource type="document" title="Contract Draft" reference="v2" />
          <LinkedResource type="collection" title="Q4 Contracts" />
          <LinkedResource type="annotation" title="Review comment" />
          <LinkedResource type="comment" title="Team discussion" />
          <LinkedResource type="clause" title="Liability cap" reference="Sec 5.1" />
          <LinkedResource type="user" title="Assigned to Alex" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: '#1E293B' }}>Reactions</h3>
        <ReactionBar onAddReaction={() => {}}>
          <ReactionButton reaction="thumbsUp" count={12} active />
          <ReactionButton reaction="thumbsDown" count={2} />
          <ReactionButton reaction="heart" count={5} />
          <ReactionButton reaction="celebrate" count={3} />
          <ReactionButton reaction="thinking" count={1} />
          <ReactionButton reaction="eyes" count={4} />
        </ReactionBar>
      </section>
    </div>
  ),
};

export const WithReplyContext: Story = {
  render: () => {
    const [replyingTo, setReplyingTo] = useState<string | null>('Sarah Chen');

    return (
      <ThreadView title="Contract review discussion">
        <ThreadPost
          isRoot
          avatar={users.sarah.avatar}
          author={users.sarah.name}
          timestamp="Today at 2:00 PM"
          actions={
            <ThreadAction
              icon={<ReplyIcon />}
              label="Reply"
              onClick={() => setReplyingTo('Sarah Chen')}
            />
          }
        >
          <p>Please review the attached amendments before EOD.</p>
        </ThreadPost>

        <ThreadInput
          replyingTo={replyingTo ? <Mention name={replyingTo} /> : undefined}
          onCancelReply={() => setReplyingTo(null)}
        >
          <ChatInput placeholder="Write your reply..." />
        </ThreadInput>
      </ThreadView>
    );
  },
};

export const CollapsibleReplies: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

    const toggleCollapse = (id: string) => {
      setCollapsed(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <ThreadView
        title="Long discussion thread"
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      >
        <ThreadPost
          isRoot
          avatar={users.emma.avatar}
          author={users.emma.name}
          authorBadge="Senior Partner"
          timestamp="Dec 20, 2024"
          replyCount={25}
        >
          <p>This is the root post with many nested replies to demonstrate collapsing.</p>
        </ThreadPost>

        <ThreadReply
          id="reply-1"
          avatar={users.sarah.avatar}
          author={users.sarah.name}
          timestamp="Dec 20, 2024"
          replies={
            <>
              <ThreadReply
                id="reply-1-1"
                avatar={users.mike.avatar}
                author={users.mike.name}
                timestamp="Dec 20, 2024"
                replies={
                  <ThreadReply
                    id="reply-1-1-1"
                    avatar={users.alex.avatar}
                    author={users.alex.name}
                    timestamp="Dec 20, 2024"
                  >
                    <p>This is a deeply nested reply demonstrating the depth limits.</p>
                  </ThreadReply>
                }
              >
                <p>Second level reply with its own nested content.</p>
              </ThreadReply>
            </>
          }
        >
          <p>First level reply. Click "Hide replies" to collapse the nested content.</p>
        </ThreadReply>

        <ThreadReply
          id="reply-2"
          avatar={users.alex.avatar}
          author={users.alex.name}
          timestamp="Dec 21, 2024"
        >
          <p>Another top-level reply without nested content.</p>
        </ThreadReply>
      </ThreadView>
    );
  },
};

export const InlineContent: Story = {
  name: 'Rich Inline Content',
  render: () => (
    <ThreadView title="Example with inline mentions and resources">
      <ThreadPost
        isRoot
        avatar={users.sarah.avatar}
        author={users.sarah.name}
        authorBadge="Attorney"
        timestamp="Today at 3:00 PM"
      >
        <p>
          Hey <Mention name="Mike" />, I reviewed the <LinkedResource type="document" title="MSA Draft" reference="v3" onClick={() => {}} /> you
          shared yesterday. The <LinkedResource type="clause" title="limitation of liability" onClick={() => {}} /> needs revision
          per <Mention name="Emma" />'s feedback.
        </p>
        <p>
          I've added my comments as <LinkedResource type="annotation" title="annotations" onClick={() => {}} /> directly in
          the <LinkedResource type="collection" title="Q4 Reviews" onClick={() => {}} /> folder. Please check and let me know
          if you have questions.
        </p>
      </ThreadPost>
    </ThreadView>
  ),
};
