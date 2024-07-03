import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/edit.css'; // Import the CSS file

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [text, setText] = useState('');
    const [photos, setPhotos] = useState(['']);
    const [newPhoto, setNewPhoto] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/api/entries/${id}`);
                const data = response.data;
                setTitle(data.title);
                setLocation(data.location);
                setText(data.text);
                setPhotos(data.photos || []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5500/api/entries/${id}`, {
                title,
                location,
                text,
                photos,
            });
            navigate(`/view/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddPhoto = () => {
        setPhotos([...photos, newPhoto]);
        setNewPhoto('');
    };

    const handleRemovePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <div className="edit">
            <div className="editContainer">
                <h1>Edit Entry</h1>
                <form className="editForm" onSubmit={handleUpdate}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <label>Text:</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <label>Photos (URLs):</label>
                    <div className="photoInput">
                        <input
                            type="text"
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                            placeholder="Enter image URL"
                        />
                        <button type="button" onClick={handleAddPhoto}>
                            Add Photo
                        </button>
                    </div>
                    <div className="editPhotos">
                        {photos.map((photo, index) => (
                            <div key={index} className="photoItem">
                                <img src={photo} alt="Preview" height="100px" />
                                <button type="button" onClick={() => handleRemovePhoto(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
