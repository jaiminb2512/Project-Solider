import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import '../css/Footer.css'; // Assuming you want to use a separate CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
      <p>Made by <b>Jaimn</b></p>
      <div className="social-icons">
        <a href="https://www.linkedin.com/in/jaiminb251203/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} />
        </a>
        <a href="https://github.com/jaiminb2512" target="_blank" rel="noopener noreferrer">
          <FaGithub size={30} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
