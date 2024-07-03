import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../authContext';
import '../style/create.css';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState({
        title: '',
        location: '',
        text: ''
    });
    const [imageUrls, setImageUrls] = useState('');

    const handleChange = (e) => {
        if (e.target.id === 'imageUrls') {
            setImageUrls(e.target.value);
        } else {
            setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const imageUrlArray = imageUrls.split(',').map(url => url.trim());

        const newEntry = {
            ...info,
            author: user._id,
            photos: imageUrlArray, // map to 'photos' field in your schema
        };

        try {
            const response = await axios.post('http://localhost:5500/api/entries/', newEntry, {
                withCredentials: false,
            });

            navigate(`/view/${response?.data?._id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='create'>
            <div className="createContainer">
                <div className="content">
                    <div className="box1">
                        <div className="input">
                            <label htmlFor="imageUrls">Image URLs (comma separated)</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="imageUrls"
                                placeholder="Enter image URLs separated by commas"
                                value={imageUrls}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="title">Title</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                placeholder="Enter Title"
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="location">Location</label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="location"
                                placeholder="Enter Location"
                            />
                        </div>
                    </div>
                    <div className="box2">
                        <div className="input">
                            <label htmlFor="text">My Experience</label>
                            <textarea
                                className='tarea'
                                name='text'
                                id='text'
                                cols="30"
                                rows='10'
                                onChange={handleChange}
                                autoFocus
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button className='createBtn' onClick={handleClick}>
                    Create Entry
                </button>
            </div>
        </div>
    );
};

export default Create;
