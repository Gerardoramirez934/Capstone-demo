import { useState } from "react";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import PromptCard from "./components/PromptCard";
import PromptForm from "./components/PromptForm";
import { usePrompts } from "./hooks/usePrompts";
import type { Category, Prompt, SortOrder } from "./types";

type ModalState = { mode: "none" } | { mode: "add" } | { mode: "edit"; prompt: Prompt };

export default function App() {
  const { addPrompt, updatePrompt, deletePrompt, duplicatePrompt, exportPrompts, importPrompts, filterAndSort } = usePrompts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [modal, setModal] = useState<ModalState>({ mode: "none" });
  const visible = filterAndSort(search, category, sort);

  function closeModal() { setModal({ mode: "none" }); }

  return (
    <div className="app">
      <Header onAdd={() => setModal({ mode: "add" })} onExport={exportPrompts} onImport={importPrompts} />
      <main className="main">
        <Toolbar
          search={search} onSearch={setSearch}
          category={category} onCategory={setCategory}
          sort={sort} onSort={setSort}
          total={visible.length}
        />
        {visible.length === 0 ? (
          <div className="empty-state">
            <p>No prompts found. <button className="link-btn" onClick={() => setModal({ mode: "add" })}>Add your first prompt</button>.</p>
          </div>
        ) : (
          <div className="card-grid">
            {visible.map(p => (
              <PromptCard
                key={p.id} prompt={p}
                onEdit={() => setModal({ mode: "edit", prompt: p })}
                onDelete={() => deletePrompt(p.id)}
                onDuplicate={() => duplicatePrompt(p.id)}
                onRatingChange={rating => updatePrompt(p.id, { rating })}
              />
            ))}
          </div>
        )}
      </main>

      {modal.mode !== "none" && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal.mode === "add" ? "New Prompt" : "Edit Prompt"}</h2>
              <button className="modal-close" onClick={closeModal}>&#x2715;</button>
            </div>
            <PromptForm
              initial={modal.mode === "edit" ? modal.prompt : undefined}
              onSave={data => {
                if (modal.mode === "add") addPrompt(data);
                else updatePrompt((modal as { mode: "edit"; prompt: Prompt }).prompt.id, data);
                closeModal();
              }}
              onCancel={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
