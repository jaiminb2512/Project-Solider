import React, { useState } from 'react';
import Header from './Header';
import Search from './Search';
import ProductList from './ProductList';

const Homepage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <div>
      <Header />
      <Search setFilteredProducts={setFilteredProducts} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Homepage;
