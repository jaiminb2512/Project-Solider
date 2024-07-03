import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/client/components/Header';

const ProductForm = () => {
    const router = useRouter();
    const { id } = router.query; 
    const initialFormData = {
        name: '',
        type: '',
        description: '',
        price: '',
        image: '',
        stock: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                if (response.ok) {
                    const product = await response.json();
                    setFormData({
                        name: product.data.name || '',
                        type: product.data.type || '',
                        description: product.data.description || '',
                        price: product.data.price || '',
                        image: product.data.image || '',
                        stock: product.data.stock || '',
                    });
                } else {
                    console.error('Failed to fetch product');
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRemoveImage = () => {
        setFormData((prevState) => ({
            ...prevState,
            image: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = id ? 'PUT' : 'POST';
        const endpoint = id ? `http://localhost:3000/api/products/${id}` : 'http://localhost:3000/api/products';
        
        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log('Product saved successfully');
                setFormData(initialFormData);
            } else {
                console.error('Failed to save product');
            }
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    return (
        <div>
            <Header />
            <div>
                <h1 className='pf-title'>{id ? 'Edit Product' : 'Add Product'}</h1>
                <form onSubmit={handleSubmit} className="pf-AddProductForm">
                    <div className="pf-box1">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="pf-input"
                            />
                        </label>
                        <label>
                            Type:
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="pf-input"
                            />
                        </label>
                    </div>

                    <div className="pf-box2">
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="pf-input"
                            />
                        </label>

                        <label>
                            Stock:
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                className="pf-input"
                            />
                        </label>
                    </div>

                    <div className="box-3">
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="pf-textarea"
                            />
                        </label>

                        <div className="pf-imgcontainer">
                            <div className="pf-imgcontent">
                                <label>
                                    Image URL:
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="pf-input"
                                />
                            </div>

                            {formData.image && (
                                <div className="pf-imagePreview">
                                    <img src={formData.image} alt="Product Preview" />
                                    <button type="button" onClick={handleRemoveImage} className="pf-removeButton">
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                        <button type="submit" className="pf-button">
                            {id ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
