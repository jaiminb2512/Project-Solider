import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

const Login = ({ setIsSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      setMessage('Login successful');
      // Clear form data
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      setMessage('Login failed');
    }
  };

  return (
    <div className="form login">
      <span className="title">Login</span>
      <form onSubmit={handleLogin}>
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
            placeholder="Enter your password"
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
        <div className="checkbox-text">
          <div className="checkbox-content">
            <input type="checkbox" id="logCheck" />
            <label htmlFor="logCheck" className="text">Remember me</label>
          </div>
          <a href="#" className="text">Forgot password?</a>
        </div>
        <div className="input-field button">
          <button type="submit" className="btn">Login</button>
        </div>
      </form>
      {message && <p>{message}</p>}
      <Footer text="Not a member?" linkText="Signup Now" onClick={() => setIsSignup(true)} />
    </div>
  );
};

export default Login;
