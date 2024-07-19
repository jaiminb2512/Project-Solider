import React from 'react';

const Footer = ({ text, linkText, onClick }) => (

    <div className="login-signup">
        <span className="text">
            {text}
            <a href="#" className="text link" onClick={onClick}>
                {linkText}
            </a>
        </span>
    </div>
);

export default Footer;
