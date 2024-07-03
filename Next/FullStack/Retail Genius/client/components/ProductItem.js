import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { itemContext } from '../context/ItemContext';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const ProductItem = ({ product }) => {
    const router = useRouter();
    const { addToCart } = useContext(itemContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const handleEditClick = () => {
        router.push({
            pathname: '/productform',
            query: { id: product._id },
        });
    };

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products/${product._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Product with ID ${product._id} deleted successfully.`);
            } else {
                console.error('Failed to delete product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        setIsAddedToCart(true); // Set state to true when product is added to cart
    };

    return (
        <div className='productItem'>
            <img src={product.image} alt={product.name} className='productImage' />
            <h3 className='productName'>{product.name}</h3>
            <p className='productDescription'>{product.description}</p>
            <p className='productPrice'>Price: ${product.price}</p>
            <p className='productStock'>Stock: {product.stock}</p>
            <div className='buttons'>
                <button
                    className={`button ${isAddedToCart ? 'addedToCart' : ''}`}
                    onClick={handleAddToCart}
                >
                    <FaCartShopping /> {isAddedToCart ? 'Added to Cart' : 'Add To Cart'}
                </button>
                <button className='button' onClick={handleEditClick}><FaEdit /> Edit</button>
                <button className='button' onClick={handleDeleteClick}><MdDelete /> Delete Product</button>
            </div>
        </div>
    );
};

export default ProductItem;
