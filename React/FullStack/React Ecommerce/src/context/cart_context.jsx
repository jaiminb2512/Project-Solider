import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("ItemCart");
  return localCartData ? JSON.parse(localCartData) : [];
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setIncrement = (id) => {
    dispatch({type: "SET_INCREMENT", payload: id})
  }

  const setDecrease = (id) => {
    dispatch({type: "SET_DECREMENT", payload: id})
  }

  // useEffect(() => {
  //   dispatch({type: "CART_TOTAL_ITEM"})
  //   localStorage.setItem("ItemCart", JSON.stringify(state.cart));
    
  // }, [state.cart]);

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("thapaCart", JSON.stringify(state.cart));
  }, [state.cart]);



  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,  
        removeItem,
        clearCart,
        setIncrement,
        setDecrease
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
