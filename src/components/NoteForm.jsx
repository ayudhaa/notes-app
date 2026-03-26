import { useState } from "react";

function NoteForm({ addNote }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const submit = (e) => {
    e.preventDefault();
    if (!text) return;
    addNote(text, category);
    setText("");
  };

  return (
    <form onSubmit={submit} className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write note..."
        className="w-full p-2 border rounded mb-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded dark:bg-slate-700 dark:text-white"
        >
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Important</option>
        </select>

        <button className="bg-slate-800 text-white px-4 rounded">
          Buat
        </button>
      </div>
    </form>
  );
}

export default NoteForm;