import { useState } from 'react';
import type { Category, Prompt } from '../types';

interface Props {
  initial?: Partial<Prompt>;
  onSave: (data: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const CATEGORIES: Category[] = ['coding', 'debugging', 'docs', 'testing', 'refactor', 'other'];

export default function PromptForm({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'coding');
  const [tagsRaw, setTagsRaw] = useState(initial?.tags?.join(', ') ?? '');
  const [rating, setRating] = useState(initial?.rating ?? 0);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!title.trim()) e.title = 'Title is required.';
    if (!body.trim()) e.body = 'Prompt body is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      body: body.trim(),
      category,
      tags: tagsRaw.split(',').map(t => t.trim()).filter(Boolean),
      rating,
      notes: notes.trim(),
    });
  }

  return (
    <form className="prompt-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="pf-title">Title *</label>
        <input
          id="pf-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Short descriptive label"
          maxLength={80}
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="pf-body">Prompt *</label>
        <textarea
          id="pf-body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="The actual prompt text you paste into Copilot or ChatGPT…"
          rows={5}
        />
        {errors.body && <span className="field-error">{errors.body}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pf-category">Category</label>
          <select id="pf-category" value={category} onChange={e => setCategory(e.target.value as Category)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Rating</label>
          <div className="star-input">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                className={`star-btn ${n <= rating ? 'active' : ''}`}
                onClick={() => setRating(n === rating ? 0 : n)}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >★</button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pf-tags">Tags (comma-separated)</label>
        <input
          id="pf-tags"
          value={tagsRaw}
          onChange={e => setTagsRaw(e.target.value)}
          placeholder="e.g. testing, react, async"
        />
      </div>

      <div className="form-group">
        <label htmlFor="pf-notes">Notes</label>
        <textarea
          id="pf-notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="When does this prompt work best? Any tips?"
          rows={2}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save Prompt</button>
      </div>
    </form>
  );
}
