import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from "./Nav"

const Header = () => {
    return (
        <MainHeader>
            <NavLink to="/">
                {/* <img src="./images/logo.png" alt="my logo img" className='logo' /> */}
                <h1 className='logo'>Ecommerce Website</h1>
            </NavLink>
            <Nav />
        </MainHeader>
    );
}

const MainHeader = styled.header`
    padding: 0 4.8rem;
    height: 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    position: relative;

    .logo {
        font-size: 3rem;
    }
`;

export default Header;