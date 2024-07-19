import React, { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../context/fetchallnotes';
import DisplayNote from './DisplayNote';
import AddNote from './AddNote';
import axios from 'axios';
import '../css/Notes.css';
import LogRes from './LogRes';

const Notes = () => {
    const { notes, fetchNotes, loading, userId } = useContext(NotesContext);
    const [noteToEdit, setNoteToEdit] = useState(null);

    useEffect(() => {
        if (userId) {
            fetchNotes(userId);
        }
    }, [userId]);

    const handleEdit = (note) => {
        setNoteToEdit(note);
    };

    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/deletenote/${noteId}`);
            fetchNotes(userId);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    if (!userId) {
        return (
            <div className="notes">
                <div className='text'>
                    <p>Please log in to view your notes. OR</p>
                    <p>Register to make Account</p>
                </div>
                <div className="log-res-container">
                    <LogRes />
                </div>
            </div>
        );
    }

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="notes">
            <AddNote noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />
            <div className='note-container'>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div className="note-item" key={note._id}>
                            <DisplayNote note={note} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    ))
                ) : (
                    <p>No notes found.</p>
                )}
            </div>
        </div>
    );
};

export default Notes;
