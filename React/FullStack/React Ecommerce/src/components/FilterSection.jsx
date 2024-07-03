import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import Button from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, company, maxPrice, minPrice },
    all_products,
    updateFilterValue,
    filter_products,
    clearFilters,
  } = useFilterContext();

  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {
      newVal = newVal.flat();
    }

    return ["all", ...new Set(newVal)];
  };

  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            placeholder="SEARCH"
          />
        </form>
      </div> 

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                style={{ color: "black" }}
                key={index}
                type="button"
                name="category"
                value={curElem}
                onClick={updateFilterValue}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <select
          name="company"
          id="company"          
          style={{color: "black"}}
          className="filter-company--select"
          onChange={updateFilterValue}
        >
          {companyData.map((curElem, index) => {
            return (
              <option key={index} value={curElem}>
                {curElem}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filter-colors colors" style={{color: "black"}}>
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all--style"
                  onClick={updateFilterValue}
                >
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={updateFilterValue}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p style={{color: "black"}}>
          <FormatPrice price={maxPrice} />
        </p>
        <input 
        type="range" 
        name="price"
        min = "0"
        max= "6000000"
        value={price}
        onChange={updateFilterValue}
        />
      </div>

      <div className="filter-clear">
        <button className="btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  color: black;

  h3 {
    padding: 1rem 0;
    font-weight: bold;
  }

  .filter-search {
    input {
      padding: 0.5  rem 1rem;
      width: 100%;
    }
  }

  .filter-category {
    h3 {
      padding: 0.5rem 0;
      font-size: 1.5rem;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.8rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        font-size: 15px;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company {
    h3 {
      padding: 0.5rem 0;
      font-size: 1.5rem;
    }

    .filter-company--select {
      padding: 0.3rem 1.2rem;
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
      width: 250px; /* Adjusted width here */
    }

    .filter-option {
      width: 100%; /* Ensure options take full width of select */
    }
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    padding: 0;
    padding-right: 1.5rem;
    color: black;
    width: 1rem;
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }

  .btnStyle {
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
  scale:1.3;
    opacity: 1;
  }

  .checkStyle {
  margin-top: -2px;
    font-size: 0.5rem;
    color: #fff;
  }

  .filter_price { 
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;


export default FilterSection;
