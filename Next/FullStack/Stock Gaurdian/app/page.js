"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);
  const categorySelectRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/product');
      const data = await response.json();
      const formattedProducts = data.allproduct.map(product => ({
        ...product,
        quantity: parseInt(product.quantity, 10),
        price: parseFloat(product.price)
      }));
      setProducts(formattedProducts);
      const uniqueCategories = [...new Set(formattedProducts.map(product => product.category))];
      setCategories(uniqueCategories);
      setSearchResults(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      searchResultsRef.current &&
      categorySelectRef.current &&
      !searchInputRef.current.contains(event.target) &&
      !searchResultsRef.current.contains(event.target) &&
      !categorySelectRef.current.contains(event.target)
    ) {
      setShowSearchResults(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...productForm,
      quantity: parseInt(productForm.quantity, 10),
      price: parseFloat(productForm.price)
    };
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added:', result);
        fetchProducts();
        setProductForm({});
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterProducts(searchQuery, e.target.value);
  };

  const filterProducts = (query, category) => {
    let filtered = products;
    if (query) {
      filtered = filtered.filter(product =>
        product.slug.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (!query && !category) {
      filtered = products;
    }
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const updateProductQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`/api/product`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
      });

      if (response.ok) {
        const result = await response.json();
        setProducts(products.map(product =>
          product._id === id ? { ...product, quantity } : product
        ));
        setSearchResults(searchResults.map(product =>
          product._id === id ? { ...product, quantity } : product
        ));
      } else {
        console.error('Failed to update product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const incrementQuantity = (id) => {
    const product = products.find(product => product._id === id);
    if (product) {
      updateProductQuantity(id, product.quantity + 1);
    }
  };

  const decrementQuantity = (id) => {
    const product = products.find(product => product._id === id);
    if (product) {
      const newQuantity = product.quantity > 0 ? product.quantity - 1 : 0;
      updateProductQuantity(id, newQuantity);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/product`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product deleted:', result);
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={`min-h-screen`}>
      <Header />

      {/* Search a product */}
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>Search a Product</h1>
        <div className="flex mb-6">
          <input
            ref={searchInputRef}
            type="text"
            placeholder='Enter a product name'
            value={searchQuery}
            onChange={handleSearchChange}
            className='flex-1 border px-4 rounded-l-lg border-gray-300'
          />
          <select
            ref={categorySelectRef}
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 px-4 py-2 rounded-r-md"
          >
            <option value="">All</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchResults.length > 0 && (
        <div ref={searchResultsRef} className="container mx-auto mb-4 p-4 bg-white rounded shadow">
          <h2 className='text-2xl font-bold mb-4'>Search Results</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-[50px] py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {searchResults.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <button
                      onClick={() => incrementQuantity(product._id)}
                      className={` bg-blue-500 text-white px-2 py-1 rounded mx-2`}
                    > + </button>
                   <div className='w-[50px] text-center'>  {product.quantity} </div> 
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      className={`bg-blue-500 text-white px-2 py-1 rounded mx-2`}
                    > - </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className={`bg-red-500 text-white px-2 py-1 rounded`}
                    > Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Form */}
      <div>
        <div className={`container mx-auto p-4`}>
          <h1 className='text-3xl font-bold'>Add a product</h1>
          <form className="mb-4" onSubmit={addProduct}>
            <div className="mb-2">
              <label htmlFor="productName" className="block text-gray-700">Product Slug</label>
              <input
                name='slug'
                onChange={handleChange}
                value={productForm.slug || ''}
                type="text"
                id="productName"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-between gap-10">
              <div className="mb-2 w-[33%]">
                <label htmlFor="productQuantity" className="block text-gray-700">Quantity</label>
                <input
                  name='quantity'
                  onChange={handleChange}
                  value={productForm.quantity || ''}
                  type="number"
                  id="productQuantity"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-2 w-[33%]">
                <label htmlFor="price" className="block text-gray-700">Price</label>
                <input
                  name='price'
                  onChange={handleChange}
                  value={productForm.price || ''}
                  type="number"
                  id="price"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-2 w-[33%]">
                <label htmlFor="category" className="block text-gray-700">Category</label>
                <input
                  name='category'
                  onChange={handleChange}
                  value={productForm.category || ''}
                  type="text"
                  id="category"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded`}>Add Product</button>
          </form>
        </div>

        {/* // Display Current Stock */}
        <div className="container mt-5 mx-auto p-4 mb-4 bg-white rounded shadow">
          <h1 className='text-3xl font-bold'>Display Current Stock</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 justify-center">
              {products.map(product => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap ">{product.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="flex justify-center items-center">
                      
                      <button
                        onClick={() => incrementQuantity(product._id)}
                        className={`bg-blue-500 text-white px-2 py-1 rounded mx-2`}
                      > + </button>
                       <div className='w-[50px] text-center'>  {product.quantity} </div> 
                       <button
                        onClick={() => decrementQuantity(product._id)}
                        className={` bg-blue-500 text-white px-2 py-1 rounded mx-2`}
                      > - </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap  text-center">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className={`bg-red-500 text-white px-2 py-1 rounded`}
                    > Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>





      </div>
    </div>
  );
}
