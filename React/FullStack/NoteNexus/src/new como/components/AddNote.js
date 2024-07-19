// src/components/AddNote.js

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { NotesContext } from '../context/fetchallnotes';
import '../css/AddNote.css';

const AddNote = ({ noteToEdit, setNoteToEdit }) => {
    const { fetchNotes } = useContext(NotesContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setDescription(noteToEdit.description);
            setTag(noteToEdit.tag);
        }
    }, [noteToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newNote = { userid: userId, title, description, tag };

            if (noteToEdit) {
                await axios.put(`http://localhost:5000/api/notes/editnote/${noteToEdit._id}`, newNote);
            } else {
                await axios.post('http://localhost:5000/api/notes/createnote', newNote);
            }

            await fetchNotes(userId);

            setTitle('');
            setDescription('');
            setTag('');
            setError(null);
            setNoteToEdit(null);
        } catch (error) {
            console.error('Error adding/editing note:', error);
            setError('Failed to add/edit note. Please try again.');
        }
    };

    return (
        <div className="add-note">
            <h2>{noteToEdit ? 'Edit Note' : 'Add Note'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='box'>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Tag:</label>
                        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <button type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
            </form>
        </div>
    );
};

export default AddNote;
