import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get(`${BASE_URL}/notes`, { withCredentials: true });
        setNotes(response.data);
      } catch (error) {
        console.error("There was an error fetching the notes!", error);
      }
    }
    fetchNotes();
  }, []);

  async function addNote(newNote) {
    try {
      console.log(BASE_URL)
      const response = await axios.post(`${BASE_URL}/notes`, newNote, { withCredentials: true });
      console.log(response.data)
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("There was an error adding the note!", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, { withCredentials: true });
      
      setNotes((prevNotes) => prevNotes.filter((noteItem) => {
        //console.log(noteItem._id)
        return noteItem._id !== id}));
    } catch (error) {
      console.error("There was an error deleting the note!", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
