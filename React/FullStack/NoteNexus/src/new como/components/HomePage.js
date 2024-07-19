import React, { useContext } from 'react';
import LogRes from './LogRes';
import '../css/HomePage.css';
import { NotesContext } from '../context/fetchallnotes';

const Homepage = () => {
  const { userId } = useContext(NotesContext); 

  return (
    <div className="homepage">

      <div className="about-container">
        <div className="about">
          <h2>About</h2>
          <p>
            The Notes App is a simple yet powerful tool to manage your notes. Whether you're organizing
            your thoughts, jotting down ideas, or keeping track of tasks, the Notes App is here to help
            you stay organized and productive.
          </p>

        </div>
      </div>

      {!userId && (
        <div className="notes">
          <div className='text'>
            <p>Please log in to view your notes.</p>
            <p>OR</p>
            <p>Register to make Account</p>
          </div>
          <LogRes />
        </div>
      )}


    </div>
  );
};

export default Homepage;
