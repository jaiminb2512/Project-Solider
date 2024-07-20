import React from 'react';
import { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { itemContext } from '../context/ItemContext';
import { useRouter } from 'next/router';
import '../../styles/Header.css';

const Header = () => {
    const { itemsInCart } = useContext(itemContext);
    const router = useRouter();

    const handleEditClick = () => {
        router.push('/productform');
    };

    const handleCartClick = () => {
        router.push('/cartpage');
    };

    const handleHomePage = () => {
        router.push('/');
    };


    return (
        <div className='header'>
            <div className='container'>
                <h1 className='title' onClick={handleHomePage}>Retail Genius</h1>
                <div className='cart-num'>
                    <div>{itemsInCart}</div>
                    <FaShoppingCart onClick={handleCartClick} className='cartIcon' />
                    <IoIosAddCircleOutline onClick={handleEditClick} className='cartIcon' />
                </div>
            </div>
        </div>
    );
};

export default Header;
