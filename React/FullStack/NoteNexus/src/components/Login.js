import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NotesContext } from '../context/fetchallnotes';
import '../css/Login-Register.css';

const Login = () => {
  const { updateUserId, fetchNotes } = useContext(NotesContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
      const { _id: userId, username: loggedInUsername } = response.data;

      updateUserId(userId); // Update userId in context
      await fetchNotes(userId); // Fetch notes after updating userId

      localStorage.setItem('username', loggedInUsername); // Save username to localStorage

      window.location.href = '/notes';
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
