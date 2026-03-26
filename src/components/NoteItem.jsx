import { useState } from "react";

function NoteItem({ note, deleteNote, editNote, togglePin }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(note.text);

  const save = () => {
    editNote(note.id, text);
    setEdit(false);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded mb-2">
      {edit ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded dark:bg-slate-600 dark:text-white"
        />
      ) : (
        <p className={`dark:text-white ${note.pinned ? "font-bold" : ""}`}>
          {note.text}
        </p>
      )}

      <div className="flex justify-between mt-2 text-sm">
        <span className="text-slate-500">{note.category}</span>

        <div className="flex gap-2">
          {edit ? (
            <button onClick={save}>Save</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}

          <button onClick={() => togglePin(note.id)}>📌</button>
          <button onClick={() => deleteNote(note.id)}>Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;