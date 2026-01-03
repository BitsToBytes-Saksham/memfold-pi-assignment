# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pi.ai desktop experience clone built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. It features a conversational AI interface with chat history persistence using localStorage.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Run production server
npm start

# Lint
npm run lint
```

## Architecture

### Chat Flow Architecture

The application uses a centralized state management pattern centered around `app/page.tsx`:

1. **Main Page** (`app/page.tsx`): The root component that orchestrates all chat functionality
   - Manages global chat state (`messages`, `isLoading`, `hasStarted`)
   - Handles sidebar collapse state (`isSidebarOpen`)
   - Integrates with `useChatHistory` hook for persistence
   - Routes messages to `/api/chat` endpoint
   - Toggles between Discover view (empty state) and Chat view using Framer Motion

2. **Chat Persistence** (`hooks/useChatHistory.ts`): Custom hook managing localStorage-based chat history
   - Stores chat history in localStorage under key `"pi-chat-history"`
   - Auto-generates chat titles from first user message (first 5 words)
   - Provides CRUD operations: `createNewChat`, `updateChat`, `deleteChat`, `loadChat`
   - Returns `isLoaded` flag to prevent hydration mismatches
   - Automatically loads most recent chat on mount

3. **API Route** (`app/api/chat/route.ts`): Server-side chat completions proxy
   - Proxies requests to `https://litellm.memfold.ai/v1/chat/completions`
   - Requires `NEXT_PUBLIC_API_KEY` environment variable
   - Injects system prompt defining Pi's personality
   - Defaults to model `"gpt-5.1"` if not specified

### Component Structure

- **Sidebar** (`components/Sidebar.tsx`): Collapsible navigation with chat history
  - Width: 340px expanded, 64px collapsed
  - Shows "New chat", "Discover", and "Home chat" buttons
  - Renders `ChatHistory` component (from `components/sidebar/ChatHistory.tsx`)

- **ChatBubble** (`components/chat/ChatBubble.tsx`): Message display component
  - Differentiates user vs assistant messages
  - Used in chat view in `app/page.tsx`

- **InputArea** (`components/InputArea.tsx`): Message input field
  - Triggers `handleSend` callback in `app/page.tsx`
  - Disabled during loading state

- **Discover** (`components/discover/Discover.tsx`): Empty state with prompt suggestions
  - Shown when no chat is active
  - Uses `PromptCard` components

### Type Definitions

Located in `types/chat.ts`:
- `Message`: `{ role: "user" | "assistant", content: string }`
- `Chat`: Contains id, title, messages array, timestamp, lastMessage
- `ChatHistory`: Dictionary mapping chatId to Chat object
- `ChatList`: Array of Chat objects for sidebar rendering

### Styling

- Design system uses earthy tones: `#F3F0E7` (cream background), `#0D3C26` (dark green text), `#E6E2D6` (light tan borders/hover)
- Typography: Merriweather serif font loaded via `next/font/google`
- Tailwind CSS 4 with custom configuration
- All components use Tailwind utility classes

### State Management Pattern

**Important**: Chat state flows in one direction:
1. User sends message in `InputArea`
2. `app/page.tsx` updates local state and calls API
3. Response updates local state
4. `useChatHistory.updateChat()` syncs to localStorage
5. Sidebar re-renders from `getAllChats()`

Do not modify chat state outside of `app/page.tsx` unless refactoring this pattern.

## Environment Setup

Required environment variable in `.env.local`:
```
NEXT_PUBLIC_API_KEY=your-api-key-here
```

This API key is used to authenticate with the Memfold LiteLLM proxy.

## Path Aliases

TypeScript is configured with `@/*` alias mapping to repository root:
```typescript
import { Message } from "@/types/chat";
import { useChatHistory } from "@/hooks/useChatHistory";
```

## Key Dependencies

- **framer-motion** (^12.23.26): AnimatePresence for view transitions
- **lucide-react** (^0.562.0): Icon library (SquarePen, Sparkles, Home, etc.)
- **Tailwind CSS** (^4): Styling with @tailwindcss/typography plugin

## Important Notes

- This is a client-side rendered app (`"use client"` directive in main components)
- Chat history is stored entirely in browser localStorage (no backend database)
- Auto-scrolling to latest message implemented via `endRef` in `app/page.tsx:21-36`
- The sidebar's "Home chat" button is non-functional (appears to be a UI mockup)
