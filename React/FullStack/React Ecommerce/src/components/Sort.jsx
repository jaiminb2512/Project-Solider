import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";
import { FaRectangleList } from "react-icons/fa6";

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } =
    useFilterContext();

  return (
    <Wrapper className="sort-section">
      {/* <h1>Sort</h1> */}
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          // className="sort-btn"
          onClick={setGridView}>
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={grid_view ? "sort-btn" : "active sort-btn"}
          // className="sort-btn"
          onClick={setListView}>
          <BsList className="icon" />
        </button>
      </div>

       {/* 2nd column  */}
       <div className="product-data">
        <p style={{color:"black"}}>{`${filter_products.length} Product Available`} </p>
      </div>

      {/* 3rd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={sorting}>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  color: black;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: #fff;
      color: ${({ theme }) => theme.colors.black};
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      margin-top: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;
