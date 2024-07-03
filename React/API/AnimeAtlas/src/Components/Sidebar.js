import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Sidebar() {
    const { popularAnime } = useGlobalContext();

    const sorted = popularAnime?.sort((a, b) => {
        return b.score - a.score;
    });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <SidebarStyled>
            <h3>Top 5 Popular</h3>
            <div className="anime">
                <Slider {...sliderSettings}>
                    {sorted?.slice(0, 5).map((anime) => {
                        return (
                            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                                <img src={anime.images.jpg.large_image_url} alt="" />
                                <h5>{anime.title}</h5>
                            </Link>
                        );
                    })}
                </Slider>
            </div>
        </SidebarStyled>
    );
}

const SidebarStyled = styled.div`
    margin-top: 2rem;
    padding-right: 5rem;
    padding-left: 2rem;
    padding-top: 2rem;
    .anime{
        display: flex;
        flex-direction: column;
        width: 150px;
        .slick-slide > div {
            margin: 0 10px;
        }
        .slick-list {
            margin: 0 -10px;
        }
        img{
            width: 100%;
            border-radius: 5px;
            border: 5px solid #e5e7eb;
        }
        a{
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: #27AE60;
            h5{
                font-size: 1.1rem;
            }
        }
    }
`;

export default Sidebar;
