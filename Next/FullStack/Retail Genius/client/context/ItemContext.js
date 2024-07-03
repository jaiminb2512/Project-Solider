"use client";

import React, { createContext, useEffect, useState } from 'react';

const itemContext = createContext();

function CustomItemContext({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.data);
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      increaseQuantity(product);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      setItemsInCart(updatedCart.length);
      setTotalPrice(totalPrice + product.price);
      console.log(product)
    }
  };


  const increaseQuantity = (product) => {
    const updatedCart = cart.map((item) =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    setTotalPrice(totalPrice + product.price);
    console.log(updatedCart)
  };

  const decreaseQuantity = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      setTotalPrice(totalPrice - product.price);
    } else {
      removeFromCart(product);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    setTotalPrice(totalPrice - product.price * product.quantity);
    setItemsInCart(updatedCart.length);
  };

  return (
    <itemContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        itemsInCart,
        totalPrice,
        cart,
      }}
    >
      {children}
    </itemContext.Provider>
  );
}

export { itemContext };
export default CustomItemContext;
