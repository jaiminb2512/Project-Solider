import { itemContext } from '@/client/context/ItemContext';
import React, { useContext, useState } from 'react';
import { FaPlusCircle, FaMinusCircle, FaTrash } from 'react-icons/fa';
import '../styles/cartpage.css';
import Header from '@/client/components/Header';

const CartPage = () => {
    const { cart, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(itemContext);
    const [shippingCharge, setShippingCharge] = useState(50);
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);

    const handleDiscountSubmit = () => {
        if (discountCode === 'discount50') {
            setShippingCharge(0);
            setDiscountApplied(true);
        } else {
            alert('Invalid discount code');
        }
    };

    return (
        <div className="cart-page">
            <Header />
            <h1>Cart</h1>
            <div className="cart-container">
                <div className="cart-items">
                    {cart && cart.length > 0 ? (
                        <table className="cart-table">
                            <thead>
                                <tr className="Bottom-Border">
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index} className="cart-item Bottom-Border">
                                        <td><img src={item.image} alt={item.name} className="cart-item-image" /></td>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td className="quantity-control td-height">
                                            <FaMinusCircle onClick={() => decreaseQuantity(item)} />
                                            <span>{item.quantity}</span>
                                            <FaPlusCircle onClick={() => increaseQuantity(item)} />
                                        </td>
                                        <td>
                                            <FaTrash onClick={() => removeFromCart(item)} />
                                        </td>
                                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <div className="cart-summary">
                    <div>
                        <span>Total Price:</span>
                        <span className='price'>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Shipping Charge:</span>
                        <span className='price'>${shippingCharge.toFixed(2)}</span>
                    </div>
                    <div className='DiscountBlock'>
                        <input
                            type="text"
                            id='discount'
                            placeholder='Enter Discount Code'
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            disabled={discountApplied}
                        />
                        <button onClick={handleDiscountSubmit} disabled={discountApplied}>
                            Submit
                        </button>
                    </div>
                    <div className='fprice'>
                        <span>Final Price:</span>
                        <span className='price'>${(totalPrice + shippingCharge).toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;
