# Copilot Prompt Library — Product Specification

## Overview
A single-page React application that helps developers store, organize, rate, and quickly reuse their best AI coding prompts. Built as the capstone project for the AI Coding Assistant Enablement Bootcamp.

## Problem Statement
As developers adopt AI coding assistants (GitHub Copilot, ChatGPT, etc.), they accumulate effective prompts but have no structured way to save or revisit them. This app solves that.

## Target Users
- Developers attending AI coding bootcamps
- Teams wanting to share prompting best practices

## Core Features

### 1. Prompt Management (CRUD)
- Add a new prompt with: title, body, category, tags, and notes
- Edit existing prompts
- Delete prompts (with confirmation)
- Duplicate a prompt

### 2. Organization
- Categories: `coding`, `debugging`, `docs`, `testing`, `refactor`, `other`
- Free-form tags (comma-separated)
- Star rating (1–5)

### 3. Discovery
- Full-text search across title, body, and tags
- Filter by category
- Sort by: newest, oldest, highest rated

### 4. UX
- One-click copy prompt to clipboard
- Toast notification on copy
- Responsive layout (works on mobile)
- Persist all data in localStorage (no backend required)

### 5. Import / Export
- Export entire library as JSON
- Import from JSON file

## Data Model

```ts
interface Prompt {
  id: string;           // uuid
  title: string;        // short label
  body: string;         // the actual prompt text
  category: Category;
  tags: string[];
  rating: number;       // 1-5, 0 = unrated
  notes: string;        // personal notes on when/why it works
  createdAt: string;    // ISO date string
  updatedAt: string;
}

type Category = 'coding' | 'debugging' | 'docs' | 'testing' | 'refactor' | 'other';
```

## Non-Goals (v1)
- User authentication
- Cloud sync
- Sharing prompts with others
- AI-generated prompt suggestions

## Success Criteria
- App loads in < 1s
- Zero runtime errors on happy path
- Data survives page refresh
- Copy-to-clipboard works
