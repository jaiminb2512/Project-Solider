import { useState } from 'react';

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        contact: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            setFormData({ title: '', description: '', image: '', contact: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <div className='box-1'>
                    <div className="title">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id='title' value={formData.title} onChange={handleChange} placeholder="Title" required />
                    </div>

                    <div className='contact'>
                        <label htmlFor="contact">Contact</label>
                        <input type="text" name="contact" id='contact' value={formData.contact} onChange={handleChange} placeholder="Contact" required />
                    </div>
                </div>

                <div className='box-2'>
                    <div className="imgcontainer">
                        <label htmlFor="image">Image Url</label>
                        <input type="text" name="image" id='image' value={formData.image} onChange={handleChange} placeholder="Image URL" required />
                    </div>

                    <div className='des-container'>
                        <label htmlFor="Description">Description</label>
                        <textarea name="description" rows={5} id='Description' value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
                    </div>
                </div>
            </div>
            <button type="submit">Add Property</button>
        </form>
    );
};

export default AddProperty;
