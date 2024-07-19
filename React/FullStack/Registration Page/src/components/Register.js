import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

const Signup = ({ setIsSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      setMessage('Registration successful');
      // Clear form data
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setMessage('Registration failed');
    }
  };

  return (
    <div className="form signup">
      <span className="title">Registration</span>
      <form onSubmit={handleSignup}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <i className="uil uil-user"></i>
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="uil uil-envelope icon"></i>
        </div>
        <div className="input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            className="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="uil uil-lock icon"></i>
          <i
            className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="input-field">
          <input
            type={showPassword ? 'text' : 'password'}
            className="password"
            placeholder="Confirm a password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <i className="uil uil-lock icon"></i>
          <i
            className={`uil ${showPassword ? 'uil-eye' : 'uil-eye-slash'} showHidePw`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <div className="checkbox-text">
          <div className="checkbox-content">
            <input type="checkbox" id="termCon" required />
            <label htmlFor="termCon" className="text">
              I accepted all terms and conditions
            </label>
          </div>
        </div>
        <div className="input-field button">
          <button type="submit" className='btn'>Signup</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      <Footer text="Already a member?" linkText="Login Now" onClick={() => setIsSignup(false)} />
    </div>
  );
};

export default Signup;
