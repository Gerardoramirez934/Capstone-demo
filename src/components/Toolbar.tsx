import type { Category, SortOrder } from '../types';

interface Props {
  search: string;
  onSearch: (v: string) => void;
  category: Category | 'all';
  onCategory: (v: Category | 'all') => void;
  sort: SortOrder;
  onSort: (v: SortOrder) => void;
  total: number;
}

const CATEGORIES: (Category | 'all')[] = ['all', 'coding', 'debugging', 'docs', 'testing', 'refactor', 'other'];

export default function Toolbar({ search, onSearch, category, onCategory, sort, onSort, total }: Props) {
  return (
    <div className="toolbar">
      <div className="toolbar-top">
        <input
          className="search-input"
          type="search"
          placeholder="🔍 Search prompts…"
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        <select className="sort-select" value={sort} onChange={e => onSort(e.target.value as SortOrder)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest-rated">Highest rated</option>
        </select>
      </div>
      <div className="category-filters">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
        <span className="result-count">{total} prompt{total !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
}
