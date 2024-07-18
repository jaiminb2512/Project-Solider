import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
    const [open, setOpen] = useState(false);

    const user = true

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <nav>
            <div className='left'>
                <a href='/' className='logo'>
                    <img src="/logo.png" alt="" />
                    <span>SkyView Estates</span>
                </a>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Agents</a>
            </div>
            <div className='right'>

                {user ? (
                    <div className='user'>
                        <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg" alt="" />
                        <span>Rahul Singh</span>
                        <Link to='/profile' className='profile'>
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <a href="">Sign in</a>
                        <a href="" className='register'>Sign up</a>
                    </>
                )}

                {/* <a href="">Sign in</a>
                <a href="" className='register'>Sign up</a> */}
                <div className="menuIcon" onClick={toggleMenu}>
                    <img src="/menu.png" alt="" srcSet="" />
                </div>
                <div className={`menu ${open ? 'open ' : ''}`}>
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Sign in</a>
                    <a href="">Sign up</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
