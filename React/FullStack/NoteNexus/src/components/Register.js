import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NotesContext } from '../context/fetchallnotes';
import '../css/Login-Register.css';

const Register = () => {
  const { updateUserId, fetchNotes } = useContext(NotesContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      const { _id: userId, username: registeredUsername } = response.data;

      updateUserId(userId); // Update userId in context
      await fetchNotes(userId); // Fetch notes after updating userId

      localStorage.setItem('username', registeredUsername); // Save username to localStorage

      // Redirect to notes page
      window.location.href = '/notes';
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label >Email:</label>
          <input className='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
