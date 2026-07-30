import { useState, useEffect, useCallback } from 'react';
import type { Prompt, Category } from '../types';

const STORAGE_KEY = 'copilot-prompt-library-v1';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const SEED_PROMPTS: Prompt[] = [
  {
    id: generateId(),
    title: 'Explain this code',
    body: 'Explain what this code does step by step, including the purpose of each function and any potential edge cases.',
    category: 'coding',
    tags: ['explain', 'learning'],
    rating: 5,
    notes: 'Great for onboarding and understanding legacy code.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Write unit tests',
    body: 'Write comprehensive unit tests for the selected code. Cover happy paths, edge cases, and error scenarios. Use the existing test framework in this project.',
    category: 'testing',
    tags: ['tests', 'tdd', 'coverage'],
    rating: 5,
    notes: 'Works best when you highlight the function first.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Fix this bug',
    body: 'Identify the bug in the highlighted code, explain why it occurs, and provide a corrected version with an explanation of the fix.',
    category: 'debugging',
    tags: ['bug', 'fix'],
    rating: 4,
    notes: 'Include the error message in the chat for best results.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Generate JSDoc comments',
    body: 'Add JSDoc comments to all functions in the selected file. Include @param, @returns, @throws, and a brief description for each.',
    category: 'docs',
    tags: ['jsdoc', 'documentation', 'comments'],
    rating: 4,
    notes: 'Run after the implementation is finalized.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Refactor for readability',
    body: 'Refactor the selected code to improve readability. Use descriptive variable names, break long functions into smaller ones, and remove magic numbers. Do not change the external behavior.',
    category: 'refactor',
    tags: ['clean-code', 'readability'],
    rating: 4,
    notes: 'Always run tests after applying this.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as Prompt[];
    } catch {
      // corrupted storage — start fresh
    }
    return SEED_PROMPTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  }, [prompts]);

  const addPrompt = useCallback((data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    setPrompts(prev => [
      { ...data, id: generateId(), createdAt: now, updatedAt: now },
      ...prev,
    ]);
  }, []);

  const updatePrompt = useCallback((id: string, data: Partial<Omit<Prompt, 'id' | 'createdAt'>>) => {
    setPrompts(prev =>
      prev.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p)
    );
  }, []);

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  const duplicatePrompt = useCallback((id: string) => {
    const original = prompts.find(p => p.id === id);
    if (!original) return;
    const now = new Date().toISOString();
    setPrompts(prev => [
      { ...original, id: generateId(), title: `${original.title} (copy)`, createdAt: now, updatedAt: now },
      ...prev,
    ]);
  }, [prompts]);

  const exportPrompts = useCallback(() => {
    const blob = new Blob([JSON.stringify(prompts, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt-library.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [prompts]);

  const importPrompts = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as Prompt[];
        if (Array.isArray(imported)) {
          setPrompts(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = imported.filter(p => !existingIds.has(p.id));
            return [...newOnes, ...prev];
          });
        }
      } catch {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  }, []);

  const filterAndSort = useCallback((
    search: string,
    category: Category | 'all',
    sort: 'newest' | 'oldest' | 'highest-rated'
  ) => {
    const q = search.toLowerCase();
    return prompts
      .filter(p => {
        const matchesSearch = !q ||
          p.title.toLowerCase().includes(q) ||
          p.body.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        const matchesCategory = category === 'all' || p.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return b.rating - a.rating;
      });
  }, [prompts]);

  return { prompts, addPrompt, updatePrompt, deletePrompt, duplicatePrompt, exportPrompts, importPrompts, filterAndSort };
}
