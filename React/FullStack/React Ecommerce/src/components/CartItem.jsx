import React from "react";
import styled from "styled-components";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();

  return (
    <Wrapper className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p className="color">{name}</p>
          <div className="color-div">
            <p className="color">color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      <div className="cart-hide">
        <p className="color">
          <FormatPrice price={price} />
        </p>
      </div>
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />
      <div className="cart-hide">
        <p className="color">
          <FormatPrice price={price * amount} />
        </p>
      </div>
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    .color{
        color: black;
    }


  .cart-image--name {
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;

    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
      }
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }
`;

export default CartItem;
