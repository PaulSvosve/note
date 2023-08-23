import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('/notes');
    setNotes(response.data);
  };

  const addNote = async () => {
    await axios.post('/notes', newNote);
    setNewNote({ title: '', content: '' });
    fetchNotes();
  };

  // ... Similar functions for update, delete, etc.

  return (
    <div>
      {/* Create a form to add a new note */}
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button onClick={addNote}>Add Note</button>

      {/* Display existing notes */}
      {notes.map((note) => (
        <div key={note._id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {/* Add edit, delete, and other functionalities here */}
        </div>
      ))}
    </div>
  );
}

export default App;
