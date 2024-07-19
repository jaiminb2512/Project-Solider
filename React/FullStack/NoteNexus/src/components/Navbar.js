import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NotesContext } from '../context/fetchallnotes';
import '../css/Navbar.css';

const Navbar = () => {
  const { username, updateUserId } = useContext(NotesContext);
  const storedUsername = localStorage.getItem('username');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    updateUserId(null);
  };

  return (
    <nav className='navbar'>
      <h1><Link to="/" className="nav-link">NoteNexus</Link></h1>
      <ul>
        <li><Link to="/notes" className="nav-link">Notes</Link></li>
        {username || storedUsername ? (
          <React.Fragment>
            <li className="logout-button" onClick={handleLogout}><Link to="/" className="nav-link">Logout</Link></li>
            <li>{capitalizeFirstLetter(username || storedUsername)}</li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
