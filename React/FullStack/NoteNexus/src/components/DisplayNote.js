import React from 'react';
import '../css/DisplayNote.css';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const DisplayNote = ({ note, onEdit, onDelete }) => {

    return (
        <div className='note'>
            <div className='note-content'>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
            </div>
            <div className='note-actions'>
                <span onClick={() => onEdit(note)}>
                    <FaEdit />
                </span>
                <span onClick={() => onDelete(note._id)}>
                    <RiDeleteBin6Line />
                </span>
            </div>
        </div>
    );
};

export default DisplayNote;
