# Copilot Prompt Library

> **AI Coding Assistant Enablement Bootcamp — Capstone Project**

A personal prompt management app for developers using AI coding assistants (GitHub Copilot, ChatGPT, etc.). Save, organize, rate, and copy your most effective prompts — all in the browser with zero backend needed.

## Live Demo

Start the dev server:
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

## How AI Was Used

This project was built using **spec-driven development** with GitHub Copilot:

1. **SPEC.md written first** — defined the data model, features, and success criteria before any code
2. **Copilot completions** — used inline completions for hooks, event handlers, and CSS variables
3. **Copilot Chat** — used to generate TypeScript types, localStorage patterns, and the seed data
4. **Context docs** — kept  open as context while generating components

## Presentation Notes

### 1. Project Overview
A single-page React/TypeScript app that acts as a personal library for AI prompts.
Developers collect effective prompts but lose them — this app solves that.

### 2. How Did You Leverage AI?
- Wrote SPEC.md first (spec-driven dev), then used Copilot to implement each feature against the spec
- Used Copilot Chat with the spec as context to generate type-safe hooks
- Used inline completions for repetitive UI patterns (form fields, card actions)

### 3. Key Learnings
- Starting with a written spec dramatically improved the quality of Copilot suggestions
- Providing context (open files) matters more than prompt length
- TypeScript + Copilot is a great combo — it auto-completes to the correct shape

### 4. Gotchas
-  in newer Vite/TS projects requires  — Copilot did not always generate this
- localStorage can hold stale data during development; always test with a fresh tab
- Heredoc in terminal can get garbled with JSX — use Python file writes instead

### 5. What I Would Do Differently
- Use a custom Copilot agent ( + custom instructions) from the start
- Add a  with architecture decisions for better AI suggestions on larger files
- Deploy to GitHub Pages so classmates can use it live during the demo

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** (build tool)
- **localStorage** (persistence, no backend)
- **CSS custom properties** (dark theme, no Tailwind dependency)
