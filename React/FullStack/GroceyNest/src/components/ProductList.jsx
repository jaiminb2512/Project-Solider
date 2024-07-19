import React, { useContext, useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { itemContext } from '../context/ItemContext';
import '../Styles/ProductList.css'

const ProductList = () => {
	const { products } = useContext(itemContext);
	
	// Keep a local state for sorted products
	const [sortedProducts, setSortedProducts] = useState([...products]);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(3000);
	
	// 'all' represents no type filter
	const [selectedType, setSelectedType] = useState('all');

	useEffect(() => {
		setSortedProducts([...products]);
	}, [products]);

	const handleSortByPrice = () => {
		const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
		setSortedProducts(sorted);
	};

	const handleFilterByPriceRange = () => {
		const filtered = products.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice
		);
		setSortedProducts(filtered);
	};

	const handleFilterByType = () => {
		if (selectedType === 'all') {
			// Reset the type filter
			setSortedProducts([...products]);
		} else {
			const filtered = products.filter((product) => product.type === selectedType);
			setSortedProducts(filtered);
		}
	};

	return (
		<div className='prdt-list'>
			<div className='filter-container'>
				<button className='filter-btn' onClick={handleSortByPrice}>
					Sort by Price
				</button>

				<div className="filter-price-container box">
					<label className='filter-label' htmlFor='min-price'>
						Min Price:
					</label>
					<input
						id='min-price'
						className='input-box'
						type='number'
						value={minPrice}
						onChange={(e) => setMinPrice(Number(e.target.value))}
					/>

					<label className='max-price' htmlFor='max-price'>
						Max Price:
					</label>
					<input
						id='max-price'
						className='input-box'
						placeholder='Max price'
						type='number'
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}
					/>

					<button className='filter-btn' onClick={handleFilterByPriceRange}>
						Filter by Price Range
					</button>
				</div>

				<div className='filter-type-container box'>
					<label className='filter-label' htmlFor='filter-label'>
						Filter by Type:
					</label>
					<select
						id='filter-label'
						className='input-box'
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						<option value='all'>All</option>
						<option value='Fruit'>Fruit</option>
						<option value='Vegetable'>Vegetable</option>
					</select>

					<button className='filter-btn' onClick={handleFilterByType}>
						Filter by Type
					</button>
				</div>
			</div>

			<ul className='product-items'>
				{sortedProducts.map((product) => (
					<ProductItem key={product._id} product={product} />
				))}
			</ul>
		</div>
	);
};

export default ProductList;
