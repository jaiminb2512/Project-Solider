import React from "react";
import styled, { ThemeProvider } from "styled-components";
import FilterSection from "./components/FilterSection";
import ProductList from "./components/ProductList";
import Sort from "./components/Sort";
import { useFilterContext } from "./context/filter_context";



// Products component
const Products = () => {

  // const {filter_products} = useFilterContext()
  // console.log(filter_products)

  return (
      <Wrapper className="box">
        <div className="container grid grid-filter-column">
          <div>
            <FilterSection />
          </div>

          <section className="product-view--sort">
            <div className="sort-filter">
              <Sort />
            </div>

            <div className="main-product">
              <ProductList />
            </div>
          </section>
        </div>
      </Wrapper>
  );
};

// Styled Wrapper component
const Wrapper = styled.section`

  .box{
    display: flex;
    align-items:center;
  }

  .grid-filter-column {
    display: grid;
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
