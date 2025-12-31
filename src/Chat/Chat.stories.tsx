import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ChatMessage,
  ChatContainer,
  ChatMessages,
  ChatInput,
  ThinkingBlock,
  TypingIndicator,
  TaskCard,
  MessageActions,
  ActionButton,
} from './Chat';
import { chatStyles } from './Chat.styles';
import { Avatar, AIAvatar, avatarStyles } from '../Avatar';
import { SourceCard, SourcePill, SourceList, Citation, sourceCardStyles } from '../SourceCard';
import { Chip, ChipGroup, SuggestionChip, chipStyles } from '../Chip';

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = chatStyles + avatarStyles + sourceCardStyles + chipStyles;
document.head.appendChild(styleSheet);

const meta: Meta<typeof ChatMessage> = {
  title: 'Chat/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

// Icons for actions
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V2z" />
    <path d="M2 6a2 2 0 012-2v10h8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const RegenerateIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M8 3a5 5 0 104.546 2.914.5.5 0 01.908-.418A6 6 0 118 2v1z" clipRule="evenodd" />
    <path d="M8 4.466V.534a.25.25 0 01.41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 018 4.466z" />
  </svg>
);

const ThumbUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 00.254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 00-.138-.362 1.9 1.9 0 00.234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 00-.443.05 9.365 9.365 0 00-.062-4.509A1.38 1.38 0 008.864.046z" />
  </svg>
);

const ThumbDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.864 15.954C7.908 16.193 7.02 15.47 6.956 14.534c-.072-1.051-.23-2.016-.428-2.59-.125-.36-.479-1.013-1.04-1.639-.557-.623-1.282-1.178-2.131-1.41C2.685 8.712 2 8.13 2 7.28V3.279c0-.845.682-1.464 1.448-1.545 1.07-.114 1.564-.415 2.068-.723l.048-.03c.272-.165.578-.348.97-.484.397-.136.861-.217 1.466-.217h3.5c.937 0 1.599.477 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.263.38.578.488.901.11.33.172.762.004 1.149.069.13.12.269.159.403.077.27.113.568.113.857 0 .288-.036.585-.113.856a2.144 2.144 0 01-.138.362 1.9 1.9 0 01.234 1.734c-.206.592-.682 1.1-1.2 1.272-.847.282-1.803.276-2.516.211a9.84 9.84 0 01-.443-.05 9.365 9.365 0 01-.062 4.509 1.38 1.38 0 01-1.326.918z" />
  </svg>
);

export const UserMessage: Story = {
  render: () => (
    <ChatMessage
      role="user"
      avatar={<Avatar fallback="AK" />}
      name="Alex Kim"
      timestamp="2:34 PM"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt?
    </ChatMessage>
  ),
};

export const AssistantMessage: Story = {
  render: () => (
    <ChatMessage
      role="assistant"
      avatar={<AIAvatar />}
      name="Claude"
      timestamp="2:35 PM"
      actions={
        <MessageActions>
          <ActionButton icon={<CopyIcon />} label="Copy" />
          <ActionButton icon={<RegenerateIcon />} label="Regenerate" />
          <ActionButton icon={<ThumbUpIcon />} label="Good response" />
          <ActionButton icon={<ThumbDownIcon />} label="Bad response" />
        </MessageActions>
      }
    >
      <p>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
      </p>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
      </p>
    </ChatMessage>
  ),
};

export const MessageWithSources: Story = {
  render: () => (
    <ChatMessage
      role="assistant"
      avatar={<AIAvatar />}
      name="Claude"
      timestamp="2:36 PM"
    >
      <p>
        Lorem ipsum dolor sit amet<Citation number={1} /> consectetur adipiscing elit sed do
        eiusmod tempor incididunt<Citation number={2} />. Ut labore et dolore:
      </p>
      <ul style={{ margin: '12px 0', paddingLeft: '20px' }}>
        <li>Magna aliqua enim ad minim veniam<Citation number={1} /></li>
        <li>Quis nostrud exercitation ullamco laboris<Citation number={2} /></li>
      </ul>
      <SourceList title="Sources" count={3}>
        <SourcePill name="Document A" type="pdf" reference="p. 12" />
        <SourcePill name="Document B" type="docx" reference="¶ 34" />
        <SourcePill name="Document C" type="doc" reference="p. 3" />
      </SourceList>
    </ChatMessage>
  ),
};

export const MessageWithThinking: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <ChatMessage
        role="assistant"
        avatar={<AIAvatar />}
        name="Claude"
      >
        <ThinkingBlock
          title="Processing request..."
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        >
          <p style={{ margin: 0 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit... Sed do eiusmod tempor
            incididunt ut labore... Ut enim ad minim veniam quis nostrud exercitation...
          </p>
        </ThinkingBlock>
        <p style={{ marginTop: '12px' }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </p>
      </ChatMessage>
    );
  },
};

export const MessageWithTasks: Story = {
  render: () => (
    <ChatMessage
      role="assistant"
      avatar={<AIAvatar />}
      name="Claude"
    >
      <p>Lorem ipsum dolor sit amet. Consectetur adipiscing elit:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
        <TaskCard title="Sed do eiusmod tempor" status="completed" />
        <TaskCard title="Ut labore et dolore" status="running" progress={65} />
        <TaskCard title="Magna aliqua enim" status="pending" />
      </div>
    </ChatMessage>
  ),
};

export const StreamingMessage: Story = {
  render: () => (
    <ChatMessage
      role="assistant"
      avatar={<AIAvatar />}
      name="Claude"
      streaming
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
    </ChatMessage>
  ),
};

export const SystemMessage: Story = {
  render: () => (
    <ChatMessage role="system">
      Processing 3 documents...
    </ChatMessage>
  ),
};

export const TypingIndicatorStory: Story = {
  name: 'Typing Indicator',
  render: () => <TypingIndicator label="Claude is typing..." />,
};

export const FullConversation: Story = {
  render: () => (
    <ChatContainer style={{ height: '600px', border: '1px solid #E5E5E5', borderRadius: '12px' }}>
      <ChatMessages>
        <ChatMessage
          role="user"
          avatar={<Avatar fallback="AK" />}
          name="Alex Kim"
          timestamp="2:30 PM"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua?
        </ChatMessage>

        <ChatMessage
          role="assistant"
          avatar={<AIAvatar />}
          name="Claude"
          timestamp="2:31 PM"
        >
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            Nisi ut aliquip ex ea commodo consequat.
          </p>
          <SourceList title="Reading" count={3}>
            <SourceCard
              title="Document A - Section 1"
              type="pdf"
              reference="Pages 1-15"
              inline
            />
            <SourceCard
              title="Document B - Appendix"
              type="docx"
              reference="Revision 3"
              inline
            />
            <SourceCard
              title="Document C - Summary"
              type="pdf"
              reference="Final draft"
              inline
            />
          </SourceList>
        </ChatMessage>

        <ChatMessage
          role="assistant"
          avatar={<AIAvatar />}
          name="Claude"
          timestamp="2:32 PM"
          actions={
            <MessageActions>
              <ActionButton icon={<CopyIcon />} label="Copy" />
              <ActionButton icon={<ThumbUpIcon />} label="Good response" />
              <ActionButton icon={<ThumbDownIcon />} label="Bad response" />
            </MessageActions>
          }
        >
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur:
          </p>
          <p><strong>1. Excepteur sint occaecat</strong><Citation number={1} /></p>
          <p>
            Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum. Sed ut perspiciatis unde omnis iste natus.
          </p>
          <p><strong>2. Error sit voluptatem</strong><Citation number={2} /></p>
          <p>
            Accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae.
          </p>
        </ChatMessage>

        <ChatMessage
          role="user"
          avatar={<Avatar fallback="AK" />}
          timestamp="2:33 PM"
        >
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur?
        </ChatMessage>

        <TypingIndicator label="Claude is typing..." />
      </ChatMessages>

      <ChatInput
        placeholder="Ask a follow up..."
        suggestions={
          <ChipGroup>
            <SuggestionChip>Generate summary</SuggestionChip>
            <SuggestionChip>Export to document</SuggestionChip>
            <SuggestionChip>Continue analysis</SuggestionChip>
          </ChipGroup>
        }
      />
    </ChatContainer>
  ),
};

export const ChatInputStory: Story = {
  name: 'Chat Input',
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ maxWidth: '600px' }}>
        <ChatInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => {
            console.log('Submitted:', v);
            setValue('');
          }}
          placeholder="Type your message..."
          suggestions={
            <ChipGroup>
              <Chip variant="outlined" size="sm" icon={
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0a6 6 0 100 12A6 6 0 006 0zm.5 9a.5.5 0 01-1 0V6.5H3a.5.5 0 010-1h2.5V3a.5.5 0 011 0v2.5H9a.5.5 0 010 1H6.5V9z"/>
                </svg>
              }>Legal research</Chip>
              <Chip variant="outlined" size="sm">Database</Chip>
              <Chip variant="outlined" size="sm">Web</Chip>
            </ChipGroup>
          }
        />
      </div>
    );
  },
};
