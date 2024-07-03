import React from 'react';
import styled from 'styled-components';
import Button from '../styles/Button';
import { NavLink } from 'react-router-dom';

const HeroSection = ({ myData }) => {

    const name = myData.name
    //   const {name} = myData  destructuring method

    return (
        <Wrapper>
            <div className="container">
                <div className="grid grid-two-column">
                    <div className="hero-section-data">
                        <p className="intro-data">Welcome to</p>
                        <h2> {name} </h2> {/* Clear and concise store name */}
                        <div>
                            {/* Improved description with benefits and call to action */}
                            Discover a wide range of high-quality products that cater to your needs. Browse our collections and find what you're looking for today!
                        </div>
                        <NavLink>
                            <Button>Shop Now</Button>
                        </NavLink>
                    </div>

                    {/* Homepage img */}
                    <div className="hero-section-image">
                        <figure>
                            <img src="images/hero.jpg" alt="hero-section-photo" className='img-style' />
                        </figure>
                    </div>

                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    padding: 12rem 0;

    img {
        min-width: 10rem;
        height: 10rem;
    }

    .hero-section-data {
        div {
            font-size: 15px;
            margin: 1rem 0;
        }

        h2 {
            text-transform: capitalize;
            font-weight: bold;
        }

        .intro-data { /* Corrected class name */
            margin-bottom: 0;
        }
    }

    .hero-section-image {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    figure {
        position: relative;

        &::after {
            content: "";
            width: 60%;
            height: 80%;
            background-color: rgba(81, 56, 238, 0.4); /* Corrected background-color */
            position: absolute;
            left: 50%;
            top: -5rem;
            z-index: -1; /* Corrected z-index */
        }
    }

    .img-style {
        width: 100%;
        height: auto;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
        .grid {
            gap: 10rem;
        }

        figure::after {
            width: 50%;
            height: 100%;
            left: 0;
            top: 10%;
            background-color: rgba(81, 56, 238, 0.4); /* Corrected background-color */
        }
    }
`;

export default HeroSection;
