import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Footer from "./components/Footer";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // DARK MODE
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  const addNote = (text, category) => {
    const newNote = {
      id: Date.now(),
      text,
      category,
      pinned: false,
    };
    setNotes([newNote, ...notes]);
  };

  const confirmDelete = (id) => setDeleteId(id);

  const deleteNote = () => {
    setNotes(notes.filter((n) => n.id !== deleteId));
    setDeleteId(null);
  };

  const editNote = (id, newText) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, text: newText } : n
      )
    );
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  const filteredNotes = notes
    .filter((n) =>
      n.text.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100 dark:bg-slate-900 transition-colors">
      <div className="max-w-5xl mx-auto w-full p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 transition-colors">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              Notes App
            </h1>

            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <input
            placeholder="Search notes..."
            className="w-full p-2 border rounded mb-3 dark:bg-slate-700 dark:text-white dark:border-slate-600"
            onChange={(e) => setSearch(e.target.value)}
          />

          <NoteForm addNote={addNote} />

          <NoteList
            notes={filteredNotes}
            deleteNote={confirmDelete}
            editNote={editNote}
            togglePin={togglePin}
          />
        </div>
      </div>

      <Footer />

      {deleteId && (
        <ConfirmModal
          onConfirm={deleteNote}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default App;