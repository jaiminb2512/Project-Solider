// src/components/DisplayNote.js

import React from 'react';
import axios from 'axios';
import '../css/DisplayNote.css';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const DisplayNote = ({ note, onEdit, onDelete }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/deletenote/${note._id}`);
      onDelete(note._id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className='note'>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <span className="material-symbols-outlined" onClick={() => onEdit(note)}>
      <FaEdit />
      </span>
      <span className="material-symbols-outlined" onClick={handleDelete}>
      <RiDeleteBin6Line />
      </span>
    </div>
  );
};

export default DisplayNote;
