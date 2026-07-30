export type Category = 'coding' | 'debugging' | 'docs' | 'testing' | 'refactor' | 'other';

export interface Prompt {
  id: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  rating: number; // 0 = unrated, 1-5
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOrder = 'newest' | 'oldest' | 'highest-rated';
