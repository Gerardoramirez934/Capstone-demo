import { useState } from 'react';
import type { Prompt } from '../types';

interface Props {
  prompt: Prompt;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onRatingChange: (rating: number) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  coding: '#3b82f6',
  debugging: '#ef4444',
  docs: '#10b981',
  testing: '#f59e0b',
  refactor: '#8b5cf6',
  other: '#6b7280',
};

export default function PromptCard({ prompt, onEdit, onDelete, onDuplicate, onRatingChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isLong = prompt.body.length > 200;
  const displayBody = isLong && !expanded ? `${prompt.body.slice(0, 200)}…` : prompt.body;

  return (
    <article className="prompt-card">
      <header className="card-header">
        <div className="card-meta">
          <span className="category-badge" style={{ background: CATEGORY_COLORS[prompt.category] }}>
            {prompt.category}
          </span>
          {prompt.rating > 0 && (
            <span className="card-rating">
              {'★'.repeat(prompt.rating)}{'☆'.repeat(5 - prompt.rating)}
            </span>
          )}
        </div>
        <h3 className="card-title">{prompt.title}</h3>
      </header>

      <div className="card-body">
        <pre className="prompt-body">{displayBody}</pre>
        {isLong && (
          <button className="expand-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Show less ▲' : 'Show more ▼'}
          </button>
        )}
      </div>

      {prompt.tags.length > 0 && (
        <div className="tag-list">
          {prompt.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      )}

      {prompt.notes && <p className="card-notes">💡 {prompt.notes}</p>}

      <footer className="card-footer">
        <div className="star-input small">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              className={`star-btn ${n <= prompt.rating ? 'active' : ''}`}
              onClick={() => onRatingChange(n === prompt.rating ? 0 : n)}
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
            >★</button>
          ))}
        </div>
        <div className="card-actions">
          <button className="btn btn-copy" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button className="btn btn-ghost small" onClick={onDuplicate}>⎘</button>
          <button className="btn btn-ghost small" onClick={onEdit}>✏️</button>
          {confirmDelete ? (
            <>
              <button className="btn btn-danger small" onClick={onDelete}>Confirm?</button>
              <button className="btn btn-ghost small" onClick={() => setConfirmDelete(false)}>✕</button>
            </>
          ) : (
            <button className="btn btn-ghost small" onClick={() => setConfirmDelete(true)}>🗑️</button>
          )}
        </div>
      </footer>
    </article>
  );
}
