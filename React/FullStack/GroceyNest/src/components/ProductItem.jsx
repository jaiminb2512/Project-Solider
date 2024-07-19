import React, { useContext } from 'react';
import { itemContext } from '../context/ItemContext';
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import '../Styles/ProductItem.css'

const ProductItem = ({ product }) => {
	const { addToCart, removeFromCart } = useContext(itemContext);

	const handleAddToCart = (product) => {
		console.log(product);
		addToCart(product);
	};

	const handleRemoveFromCart = (product) => {
		console.log("Product removed from cart", product);
		removeFromCart(product);
	};

	return (
		<div className="product-card">
			<img className="product-image" src={product.image} alt={product.name} />
			<div className="product-details">
				<h3 className="product-name">{product.name}</h3>
				<p className="product-description">{product.description}</p>
				<p className="product-price">Price: {product.price} Rs/Kg</p>

				<div className="btns">
					<button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
						Add to Cart <span><FaShoppingCart /></span>
					</button>
					<button className="remove-from-cart-btn" onClick={() => handleRemoveFromCart(product)}>
						Remove  <span><MdDelete /></span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
