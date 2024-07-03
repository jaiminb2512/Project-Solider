import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Popular({ rendered }) {
    const { popularAnime, isSearch, searchResults } = useGlobalContext();

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <FaArrowRight
                className={className}
                style={{ ...style, display: 'block', color: '#27AE60', fontSize: '30px' }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <FaArrowLeft
                className={className}
                style={{ ...style, display: 'block', color: '#27AE60', fontSize: '30px' }}
                onClick={onClick}
            />
        );
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const conditionalRender = () => {
        const animeList = !isSearch && rendered === 'popular' ? popularAnime : searchResults;
        return (
            <Slider {...sliderSettings}>
                {animeList?.map((anime) => (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                    </Link>
                ))}
            </Slider>
        );
    };

    return (
        <PopularStyled>
            <div className="popular-anime">
                {conditionalRender()}
            </div>

            <div className='box'>
                <Sidebar />

            </div>
        </PopularStyled>
    );
}

const PopularStyled = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 1000px) {
        flex-direction: column;
        justify-content:center;
        align-item:center;

        .popular-anime {
            width: 100%;
            padding: 1rem;
            justify-content: center;
            align-items:center;
        }

        .box{
            display: flex;
            justify-content:center;
        align-item:center;
        padding-bottom: 2rem;
        }
    }

    .popular-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 0;
        width: 75%;

        .slick-slide > div {
            margin: 0 10px;
        }

        .slick-list {
            margin: 0 -10px;
        }

        a {
            height: 415px; 
            border-radius: 7px;
            border: 5px solid #e5e7eb;
            display: block;
        }

        a img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
`;

export default Popular;
