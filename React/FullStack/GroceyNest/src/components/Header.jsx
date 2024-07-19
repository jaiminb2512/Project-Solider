import React, { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { itemContext } from '../context/ItemContext';
import '../Styles/Header.css'

const Header = () => {
	const { itemsInCart, totalPrice } = useContext(itemContext)

	return (
		<div className='header'>
			<h1 className='header-title'>
			GroceryNest
			</h1>
			<h3 className='header-total-price'>
				Total Price: {totalPrice}
			</h3>
			<div className='header-cart'>
				<div className='header-cart-items'>
					{itemsInCart}
				</div>
				<FaShoppingCart className='cart-icon'/>
			</div>
		</div>
	);
};

export default Header;
