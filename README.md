# Copilot Prompt Library

> **AI Coding Assistant Enablement Bootcamp — Capstone Project**

A personal prompt management app for developers using AI coding assistants (GitHub Copilot, ChatGPT, etc.). Save, organize, rate, and copy your most effective prompts — all in the browser with zero backend needed.

## Live Demo

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Features

| Feature | Details |
|---|---|
| CRUD | Add, edit, duplicate, delete prompts |
| Categories | coding · debugging · docs · testing · refactor · other |
| Tags | Free-form comma-separated tags |
| Rating | 1–5 star rating, editable inline |
| Search | Full-text search across title, body, tags |
| Filter | By category chip; sort by date or rating |
| Copy | One-click clipboard copy with toast |
| Import/Export | Backup/restore entire library as JSON |
| Persistence | All data saved in localStorage |

## Project Structure

```
src/
  types.ts                  # Prompt & Category types
  hooks/usePrompts.ts       # All state + localStorage logic
  components/
    Header.tsx              # Top nav with actions
    Toolbar.tsx             # Search, category filter, sort
    PromptCard.tsx          # Card with copy/edit/delete/rate
    PromptForm.tsx          # Add/edit modal form
  App.tsx                   # Root + modal orchestration
  index.css                 # Dark-mode design system
SPEC.md                     # Feature spec (written first — spec-driven development)
```

## Getting Started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
```

## Usage

1. **Add a prompt** — click **+ New Prompt**, fill in the title, body, category, tags, and an optional note
2. **Copy a prompt** — click **📋 Copy** on any card to copy the prompt text to your clipboard
3. **Rate prompts** — click the stars on any card to rate it inline (1–5)
4. **Find prompts** — use the search bar, category chips, or sort dropdown to narrow results
5. **Duplicate** — click ⎘ to create a copy of any prompt for quick variations
6. **Edit / Delete** — use ✏️ and 🗑️ on each card
7. **Backup** — click **⬇ Export** to download your entire library as JSON
8. **Restore** — click **⬆ Import** to merge a previously exported JSON file

All data is stored in your browser's `localStorage` — no account or server required.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **localStorage** (persistence, no backend)
- **CSS custom properties** (dark theme, no Tailwind dependency)
