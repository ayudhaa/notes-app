import NoteItem from "./NoteItem";

function NoteList({ notes, deleteNote, editNote, togglePin }) {
  return (
    <div>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          editNote={editNote}
          togglePin={togglePin}
        />
      ))}
    </div>
  );
}

export default NoteList;