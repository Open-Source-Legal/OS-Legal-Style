# OpenContracts Component Library

A React component library implementing the OpenContracts design system — built around **transparent infrastructure**, **visible connections**, and **warm precision**.

## Installation

```bash
npm install github:Open-Source-Legal/OS-Legal-Style
# or
yarn add github:Open-Source-Legal/OS-Legal-Style
```

Or add to your `package.json`:

```json
{
  "dependencies": {
    "@opencontracts/ui": "github:Open-Source-Legal/OS-Legal-Style"
  }
}
```

## Setup

### 1. Import Styles

Import the combined styles at your app's root:

```tsx
// App.tsx or index.tsx
import { allStyles } from '@opencontracts/ui';

// Inject styles (or use your preferred method)
const styleEl = document.createElement('style');
styleEl.textContent = allStyles;
document.head.appendChild(styleEl);
```

### 2. Add Fonts

The design system uses Inter for UI and Georgia for headlines:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Usage

```tsx
import { Button, Card, CardHeader, CardBody, SearchBox, StatBlock } from '@opencontracts/ui';

function App() {
  return (
    <Card>
      <CardHeader
        title="Contract Analysis"
        subtitle="3 documents reviewed"
      />
      <CardBody>
        <SearchBox
          placeholder="Search contracts..."
          onSubmit={(value) => console.log(value)}
        />
        <StatBlock value="142K" label="Annotations" sublabel="community contributed" />
      </CardBody>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button variant="primary">Accept All</Button>
        <Button variant="secondary">Review</Button>
      </div>
    </Card>
  );
}
```

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `AppShell` | Application shell with sidebar, header, and main content |
| `PageHeader` | Page title with breadcrumbs and actions |
| `SplitPane` | Resizable split panel layout |
| `Stack` / `HStack` / `VStack` | Flexbox layout utilities |
| `ScrollArea` | Custom scrollable container |
| `Card` | Container with Header, Body, Footer subcomponents |
| `Sidebar` | Dark navigation sidebar with sections |

### Forms

| Component | Description |
|-----------|-------------|
| `Button` / `IconButton` | Primary, secondary, ghost, danger variants |
| `Input` | Text input with label, helper text, error states |
| `Textarea` | Multi-line input with auto-resize |
| `Select` | Native select with consistent styling |
| `Checkbox` / `CheckboxGroup` | Checkbox inputs with labels |
| `Radio` / `RadioGroup` | Radio button inputs |
| `Toggle` / `Switch` | Toggle switches |
| `FormField` | Form field wrapper with label and validation |
| `SearchBox` | Search input with icon and submit button |

### Data Display

| Component | Description |
|-----------|-------------|
| `Avatar` / `AvatarGroup` | User avatars with status indicators |
| `Chip` / `ChipGroup` | Tags, labels, and filter chips |
| `StatBlock` / `StatGrid` | Large number stats with labels |
| `CollectionCard` | List cards with type icons and badges |
| `ActivityFeed` | Timeline with avatars and actions |
| `SourceCard` / `Citation` | Document source cards and citations |

### Navigation

| Component | Description |
|-----------|-------------|
| `Tabs` | Tab navigation with panels |
| `FilterTabs` | Pill-style category filters with counts |
| `ActionList` | Clickable action items with icons |

### Feedback

| Component | Description |
|-----------|-------------|
| `Toast` / `ToastProvider` | Toast notifications |
| `Alert` / `Banner` | Alert messages and banners |
| `Progress` / `ProgressCircle` | Progress indicators |
| `Spinner` | Loading spinner |
| `Skeleton` | Loading skeleton placeholders |
| `EmptyState` | Empty state illustrations |

### Overlay

| Component | Description |
|-----------|-------------|
| `Modal` | Modal dialogs with Header, Body, Footer |
| `Tooltip` | Hover tooltips |
| `Popover` | Click-triggered popovers |

### Chat & AI

| Component | Description |
|-----------|-------------|
| `ChatMessage` | Chat message bubbles |
| `ChatInput` | Chat text input with actions |
| `ChatContainer` | Chat layout container |
| `ThinkingBlock` | AI thinking/processing indicator |
| `TypingIndicator` | Typing animation |
| `TaskCard` | Task status cards |
| `ResearchCard` | AI research response cards |

### Content

| Component | Description |
|-----------|-------------|
| `Hero` | Hero sections with search and actions |
| `SearchInput` | Search with suggestions |
| `ProjectPicker` | Project selection dropdown |
| `SourcesPanel` | Sources and files panel |

## Component API Examples

### SearchBox

```tsx
<SearchBox
  placeholder="Search across all legal knowledge..."
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSubmit={(value) => handleSearch(value)}
  buttonText="Search"
  size="md" // sm | md | lg
/>
```

### FilterTabs

```tsx
<FilterTabs
  items={[
    { id: 'all', label: 'All' },
    { id: 'legislation', label: 'Legislation', count: '2.4K' },
    { id: 'contracts', label: 'Contracts', count: '12K' },
  ]}
  value={activeTab}
  onChange={setActiveTab}
  variant="pill" // pill | underline
/>
```

### StatBlock & StatGrid

```tsx
<StatGrid columns={2}>
  <StatBlock value="23K+" label="Documents" sublabel="across all domains" />
  <StatBlock value="142K" label="Annotations" sublabel="community contributed" />
</StatGrid>
```

### CollectionCard

```tsx
<CollectionCard
  type="legislation" // legislation | contracts | case-law | knowledge
  badge="Legislation"
  status="Active discussion"
  title="US Federal Code - Annotated"
  description="Complete USC with community annotations..."
  stats={['54 titles', '34.2K annotations', '156 contributors']}
  onClick={() => navigate('/collection/1')}
/>
```

### ActivityFeed

```tsx
<ActivityFeed
  items={[
    {
      id: 1,
      name: 'Sarah Chen',
      initials: 'SC',
      avatarColor: '#3B82F6',
      action: 'annotated',
      target: 'Liability Clause Analysis',
      time: '12m ago',
    },
  ]}
  viewAllUrl="/activity"
  viewAllText="View all activity"
/>
```

### ActionList

```tsx
<ActionList
  items={[
    { id: 1, label: 'Upload document', icon: <UploadIcon /> },
    { id: 2, label: 'Join project', icon: <JoinIcon /> },
  ]}
  variant="card" // default | card
  onItemClick={(item) => console.log(item.label)}
/>
```

### Button

```tsx
<Button
  variant="primary" // primary | secondary | ghost | danger
  size="md" // sm | md | lg
  loading={false}
  fullWidth={false}
  leftIcon={<Icon />}
  disabled={false}
>
  Label
</Button>
```

### Card

```tsx
<Card variant="elevated" padding="md">
  <CardHeader
    title="Title"
    subtitle="Subtitle"
    action={<Button size="sm">Action</Button>}
  />
  <CardBody>Content here</CardBody>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

## Design Principles

1. **Structure over decoration** — No heavy borders; shadows define boundaries
2. **Connections matter** — Visual elements show relationships between documents
3. **Light touch** — Subtle shadows (0.03-0.06 opacity), never harsh
4. **Professional precision** — Deep teal accent (`#0F766E`) conveys trust and expertise

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--oc-accent` | `#0F766E` | Primary actions, active states, links |
| `--oc-accent-hover` | `#0D9488` | Hover state for accent elements |
| `--oc-fg-primary` | `#1E293B` | Primary text (slate-800) |
| `--oc-fg-secondary` | `#475569` | Secondary text (slate-600) |
| `--oc-fg-tertiary` | `#94A3B8` | Tertiary/muted text (slate-400) |
| `--oc-bg-canvas` | `#FAFAFA` | Page background |
| `--oc-bg-surface` | `#FFFFFF` | Card/surface backgrounds |
| `--oc-bg-sidebar` | `#0F172A` | Dark sidebar background |
| `--oc-border-default` | `#E2E8F0` | Default borders (slate-200) |
| `--oc-success` | `#059669` | Success states |
| `--oc-warning` | `#D97706` | Warning states |
| `--oc-error` | `#DC2626` | Error states |

## Typography

- **UI Text**: Inter (400, 500, 600, 700)
- **Headlines**: Georgia (serif) for editorial feel
- **Font Sizes**: xs (11px), sm (13px), md (15px), lg (17px), xl (20px)

## Spacing & Radius

| Token | Value |
|-------|-------|
| `--oc-spacing-xs` | 4px |
| `--oc-spacing-sm` | 8px |
| `--oc-spacing-md` | 16px |
| `--oc-spacing-lg` | 24px |
| `--oc-radius-sm` | 6px |
| `--oc-radius-md` | 8px |
| `--oc-radius-lg` | 12px |

## TypeScript

All components are fully typed. Import types as needed:

```tsx
import type {
  ButtonProps,
  CardProps,
  SearchBoxProps,
  FilterTabsProps,
  CollectionCardProps,
} from '@opencontracts/ui';
```

## Development

```bash
npm run dev           # Watch mode
npm run build         # Build library
npm run storybook     # Start Storybook on port 6006
npm run lint          # Run ESLint
npm run test          # Run tests
```

## License

MIT © OpenContracts
