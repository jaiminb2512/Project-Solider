import React from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <Wrapper>
      <div className="cart-button">
        <div className="amount-toggle">
          <button onClick={() => setDecrease()} className="btn">
            <FaMinus className='icon' />
          </button>

          <div className='amount-style'> {amount} </div>

          <button onClick={() => setIncrease()} className="btn">
            <FaPlus className='icon' />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn {
    background-color: white !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    cursor: pointer;
  }

  .icon {
    color: black !important;
  }

  .amount-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    width:150px;

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default CartAmountToggle;
