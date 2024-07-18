import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text fs-18 fw-3'>Are you searching for your next great read? Look no further! Our extensive book list is curated to match your specific interests based on your search keywords. Dive into a world of literary treasures and find the perfect book that speaks to you.</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header