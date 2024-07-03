import React, { useState, useEffect } from 'react';

const Search = ({ setFilteredProducts }) => {
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    price: '',
    priceRange: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setProducts(data.data);
            setFilteredProducts(data.data);
          } else {
            console.error('Products key not found in response:', data);
          }
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [setFilteredProducts]);

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products.filter(product => {
        return (
          (filters.name ? product.name.toLowerCase().includes(filters.name.toLowerCase()) : true) &&
          (filters.type ? product.type.toLowerCase().includes(filters.type.toLowerCase()) : true) 
        );
      });

      if (filters.price) {
        const priceFilter = Number(filters.price);
        if (priceFilter > 0) {
          if (filters.priceRange === 'minToMax') {
            filtered = filtered.filter(product => product.price >= priceFilter);
          } else if (filters.priceRange === 'maxToMin') {
            filtered = filtered.filter(product => product.price <= priceFilter);
          }
        }
      }

      if (filters.priceRange === 'minToMax') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.priceRange === 'maxToMin') {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered.length > 0 ? filtered : products);
    };

    filterProducts();
  }, [filters, products, setFilteredProducts]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    setFilters({ ...filters, priceRange: value });
  };

  return (
    <div className="search-container">
      <form className="search-form">
        <div className="search-box">
          <label className="search-label">
            Name:
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="search-input"
            />
          </label>
          <label className="search-label">
            Type:
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="search-input"
            />
          </label>
          <label className="search-label">
            Price:
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="search-input"
            />
          </label>
          <label className="search-label">
            Price Range:
            <select
              name="priceRange"
              value={filters.priceRange || ''}
              onChange={handlePriceRangeChange}
              className="search-input"
            >
              <option value="">Select</option>
              <option value="minToMax">Min to Max</option>
              <option value="maxToMin">Max to Min</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;
