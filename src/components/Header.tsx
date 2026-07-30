import { useRef } from 'react';

interface Props {
  onAdd: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({ onAdd, onExport, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="header-logo">🤖</span>
        <div>
          <h1>Copilot Prompt Library</h1>
          <p className="header-subtitle">Your personal AI prompt toolkit</p>
        </div>
      </div>
      <nav className="header-actions">
        <button className="btn btn-ghost" onClick={onExport}>⬇ Export</button>
        <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>⬆ Import</button>
        <button className="btn btn-primary" onClick={onAdd}>+ New Prompt</button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) { onImport(file); e.target.value = ''; }
          }}
        />
      </nav>
    </header>
  );
}
