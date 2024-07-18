import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./searchBar.scss";

const SearchBar = () => {
  const types = ["buy", "rent"];
  const navigate = useNavigate();

  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/list', { state: query });
  };

  return (
    <div className='searchBar'>
      <div className="type">
        {types.map((type) => (
          <button key={type} onClick={() => switchType(type)} className={query.type === type ? "active" : ""}>
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" placeholder='City Location' onChange={handleInputChange} />
        <input type="number" name="maxPrice" min={0} max={100000000} placeholder='Max Price' onChange={handleInputChange} />
        <input type="number" name="minPrice" min={0} max={100000000} placeholder='Min Price' onChange={handleInputChange} />
        <button type="submit" className='search-img'><img src="/search.png" alt="" /></button>
      </form>
    </div>
  );
};

export default SearchBar;
