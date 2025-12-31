# OpenContracts UI Component Plan

A comprehensive plan for building out the component library to support a modern document collaboration and search SaaS.

---

## Current Status

### ✅ Completed Components

**Layout**
- `AppShell` - Main app container with sidebar + content
- `PageHeader` - Title, breadcrumbs, actions
- `SplitPane` - Resizable panels
- `Stack` / `HStack` / `VStack` - Flexbox primitives
- `ScrollArea` - Styled scrollable container
- `Card` - Container with header/body/footer
- `Sidebar` - Navigation sidebar

**Overlay**
- `Modal` - Dialog with header/body/footer
- `Tooltip` - Hover hints
- `Popover` - Click/hover content panels

**Chat**
- `ChatMessage` - User/assistant/system messages
- `ChatInput` - Auto-resize input with suggestions
- `ThinkingBlock` - Collapsible AI reasoning
- `TypingIndicator` - Animated typing dots
- `TaskCard` - Task status with progress
- `MessageActions` / `ActionButton` - Message toolbar

**Data Display**
- `Avatar` / `AvatarGroup` / `AIAvatar` - User avatars
- `Chip` / `ChipGroup` - Tags, filters, suggestions
- `SourceCard` / `SourcePill` - Document citations
- `Citation` - Inline reference markers

**Forms (Phase 1)**
- `Button` / `IconButton` / `ButtonGroup` - Primary interactive elements
- `Input` - Text input with icons and addons
- `Textarea` - Multi-line input with auto-resize
- `Select` - Dropdown with search, groups, clearable
- `Checkbox` / `CheckboxGroup` - Binary/multiple selection
- `Radio` / `RadioGroup` - Single selection from group
- `Toggle` / `Switch` - On/off toggle
- `FormField` - Wrapper for consistent field layout

**Feedback**
- `Toast` / `ToastProvider` / `useToast` - Transient notifications
- `Skeleton` - Loading placeholders (text, circular, rectangular)
- `SkeletonText` / `SkeletonAvatar` / `SkeletonButton` - Pre-built skeletons
- `DocumentCardSkeleton` / `TableRowSkeleton` / `ChatMessageSkeleton` - Pattern skeletons
- `Progress` / `ProgressCircle` - Progress indicators
- `Spinner` - Loading spinner
- `EmptyState` - Empty view with illustration and CTA
- `Alert` / `Banner` - Persistent notifications

**Search**
- `SearchInput` - Global search with shortcuts and suggestions

**Navigation**
- `Tabs` / `TabList` / `Tab` / `TabPanels` / `TabPanel` - Tab navigation

---

## Remaining Components (Phase 2+)

### Search Experience

#### SearchResults
Display search results with highlighting.

```tsx
<SearchResults
  query="contract breach"
  results={results}
  groupBy="type"
/>
```

**Sub-components:**
- `SearchResultItem` - Individual result with title, snippet, metadata
- `SearchResultGroup` - Grouped results (by type, date, etc.)
- `SearchHighlight` - Highlighted matching text

---

#### FilterPanel
Faceted search filters.

```tsx
<FilterPanel
  filters={[
    { key: 'type', label: 'Document Type', type: 'checkbox', options: [...] },
    { key: 'date', label: 'Date Range', type: 'daterange' },
    { key: 'author', label: 'Author', type: 'select', options: [...] },
  ]}
  values={activeFilters}
  onChange={setActiveFilters}
/>
```

**Filter types:**
- `checkbox` - Multi-select checkboxes
- `radio` - Single select
- `select` - Dropdown select
- `daterange` - Date range picker
- `range` - Numeric range slider

---

#### CommandPalette
Global ⌘K command menu.

```tsx
<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  commands={[
    { id: 'search', label: 'Search documents...', icon: <SearchIcon /> },
    { id: 'new-doc', label: 'New document', icon: <PlusIcon />, shortcut: '⌘N' },
  ]}
  recentItems={recent}
/>
```

**Features:**
- Fuzzy search
- Keyboard navigation (↑↓, Enter, Esc)
- Command grouping
- Keyboard shortcut display
- Recent items section

---

### Document Components

#### DocumentCard
Document preview card.

```tsx
<DocumentCard
  title="Stock Purchase Agreement"
  type="pdf"
  thumbnail="/thumb.jpg"
  metadata={{ pages: 24, size: '2.4 MB', modified: '2 hours ago' }}
  status="draft"
/>
```

**Variants:**
- `compact` - List item view
- `card` - Card with thumbnail
- `grid` - Square grid item

---

#### DocumentList / DocumentGrid
Collection views.

```tsx
<DocumentList
  documents={docs}
  view="list"
  sortBy="modified"
  selectable
  selectedIds={selected}
  onSelectionChange={setSelected}
/>
```

---

#### DropZone
File upload area.

```tsx
<DropZone
  accept={['application/pdf', 'application/msword']}
  maxSize={10 * 1024 * 1024}
  multiple
  onDrop={handleFiles}
/>
```

**States:**
- Default - dashed border, upload icon
- Dragging over - highlighted border
- Uploading - progress bar, file list
- Error - error message, retry

---

#### VersionBadge
Document version indicator.

```tsx
<VersionBadge version="v2" status="draft" />
```

---

#### Annotation
Text annotation/highlight.

```tsx
<Annotation
  color="yellow"
  comment="This clause needs review"
  author="Jane Doe"
>
  highlighted text content
</Annotation>
```

---

### Thread/Discussion Components

#### ThreadCard
Preview card for thread list.

```tsx
<ThreadCard
  title="Q3 Contract Review Discussion"
  excerpt="We need to discuss the liability clause changes..."
  author={{ name: 'John Doe', avatar: '...' }}
  replyCount={12}
  lastActivity="2 hours ago"
  unread
  pinned
/>
```

---

#### ThreadList
List of threads.

```tsx
<ThreadList
  threads={threads}
  sortBy="lastActivity"
  onThreadClick={handleOpen}
/>
```

---

#### Reply
Individual reply in a thread.

```tsx
<Reply
  author={{ name: 'Jane Doe', avatar: '...' }}
  timestamp="2:34 PM"
  reactions={[{ emoji: '👍', count: 3, reacted: true }]}
>
  I agree with the proposed changes to section 4.2.
</Reply>
```

**Sub-components:**
- `ReplyThread` - Nested reply tree
- `ReplyInput` - Inline reply composer

---

#### Mention
@mention with autocomplete.

```tsx
<MentionInput
  value={text}
  onChange={setText}
  users={teamMembers}
  onMention={handleMention}
/>
```

---

#### ReactionPicker
Emoji reaction selector.

```tsx
<ReactionPicker
  reactions={['👍', '❤️', '🎉', '😄', '😮', '😢']}
  onSelect={handleReaction}
/>
```

---

### Activity & Collaboration

#### ActivityItem
Single activity entry.

```tsx
<ActivityItem
  user={{ name: 'John', avatar: '...' }}
  action="edited"
  target="Contract Agreement v2"
  targetType="document"
  timestamp="2 hours ago"
/>
```

**Action types:**
- `created`, `edited`, `deleted`
- `uploaded`, `downloaded`
- `commented`, `mentioned`
- `shared`, `moved`
- `approved`, `rejected`

---

#### Timeline
Vertical activity feed.

```tsx
<Timeline>
  <TimelineItem timestamp="Today">
    <ActivityItem ... />
  </TimelineItem>
</Timeline>
```

---

#### PresenceIndicator
Who's currently viewing.

```tsx
<PresenceIndicator
  users={[
    { name: 'John', avatar: '...', status: 'viewing' },
    { name: 'Jane', avatar: '...', status: 'editing' },
  ]}
  max={3}
/>
```

---

#### NotificationBadge
Unread count indicator.

```tsx
<NotificationBadge count={5} max={99}>
  <BellIcon />
</NotificationBadge>
```

---

### Data Display

#### Table
Data table with features.

```tsx
<Table
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'type', header: 'Type' },
    { key: 'modified', header: 'Modified', sortable: true },
  ]}
  data={documents}
  sortBy="modified"
  sortDirection="desc"
  selectable
/>
```

**Sub-components:**
- `TableHeader` - Header row
- `TableRow` - Data row
- `TableCell` - Individual cell
- `TablePagination` - Pagination controls

---

### Navigation

#### Pagination
Page navigation.

```tsx
<Pagination
  page={currentPage}
  totalPages={10}
  onChange={setCurrentPage}
  showFirstLast
/>
```

---

#### ContextMenu
Right-click menu.

```tsx
<ContextMenu
  items={[
    { label: 'Open', icon: <OpenIcon />, onClick: handleOpen },
    { label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { type: 'separator' },
    { label: 'Delete', icon: <DeleteIcon />, onClick: handleDelete, danger: true },
  ]}
>
  <DocumentCard ... />
</ContextMenu>
```

---

## Implementation Priority

### ✅ Tier 1 (Essential) - COMPLETE
1. ~~**Button**~~ ✅
2. ~~**Input**~~ ✅
3. ~~**Select**~~ ✅
4. ~~**Toast**~~ ✅
5. ~~**Skeleton**~~ ✅

### Tier 2 (Core Features)
6. **SearchResults** - Search result display
7. **CommandPalette** - Power user feature
8. **DocumentCard** - Document management
9. **DropZone** - File uploads
10. **Table** - Data display

### Tier 3 (Collaboration)
11. **ThreadCard** - Discussions
12. **Reply** - Thread replies
13. **Mention** - @mentions
14. **ActivityItem** - Activity feed
15. **PresenceIndicator** - Real-time

### Tier 4 (Polish)
16. ~~**Tabs**~~ ✅
17. ~~**EmptyState**~~ ✅
18. ~~**Alert/Banner**~~ ✅
19. ~~**Progress**~~ ✅
20. **ContextMenu** - Power features
21. **Pagination** - Page navigation

---

## Design Tokens Reference

All components use these CSS custom properties:

```css
/* Colors */
--oc-accent: #E85A4F;
--oc-accent-hover: #D64A3F;
--oc-fg-primary: #1A1A1A;
--oc-fg-secondary: #6B6B6B;
--oc-fg-tertiary: #9B9B9B;
--oc-bg-canvas: #FFFFFF;
--oc-bg-surface: #F8F8F8;
--oc-border-default: #E5E5E5;
--oc-success: #10B981;
--oc-warning: #F59E0B;
--oc-error: #EF4444;

/* Spacing */
--oc-spacing-xs: 4px;
--oc-spacing-sm: 8px;
--oc-spacing-md: 16px;
--oc-spacing-lg: 24px;
--oc-spacing-xl: 32px;

/* Radius */
--oc-radius-sm: 4px;
--oc-radius-md: 8px;
--oc-radius-lg: 12px;
--oc-radius-full: 9999px;

/* Shadows */
--oc-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--oc-shadow-md: 0 2px 8px rgba(0, 0, 0, 0.05);
--oc-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.05);

/* Typography */
--oc-font-size-xs: 12px;
--oc-font-size-sm: 14px;
--oc-font-size-md: 16px;
--oc-font-size-lg: 18px;
```

---

## File Structure

```
src/
├── Button/
│   ├── Button.tsx
│   ├── Button.styles.ts
│   ├── Button.stories.tsx
│   └── index.ts
├── Input/
├── Select/
├── ... (each component follows same pattern)
├── index.ts (exports everything)
└── tokens.ts (design tokens)
```

---

## Component Patterns

All components follow these conventions:

- Use `forwardRef` for ref forwarding
- Accept `className` for custom styling
- Styles exported as template literals (`*Styles`)
- Stories demonstrate all variants and states
- TypeScript types exported for consumer use
- CSS class names use `oc-` prefix
- BEM-like naming: `.oc-component`, `.oc-component--modifier`, `.oc-component__element`
- All CSS properties use `var(--oc-*, fallback)` for theming

---

## Notes

- JS/ESM build successful, TypeScript declaration generation has known issues
- All new components include comprehensive Storybook stories
- Components are designed to be composable and work together
- Styles are aggregated in `allStyles` export for single import
