import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TrendingGames({ gameList }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1100);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='tgcontainer mt-5 mr-5'>
            <h2 className="font-bold text-[30px] dark:text-white mb-5"> Trending Games</h2>
            {isMobile ? (
                <Slider {...settings} className='ml-[20px] md:ml-[25px]'>
                    {gameList.map((item, index) => (
                        <div key={index} className='px-[12.5px]'>
                            <div className='bg-[#76a8f75e] rounded-lg group md:w-[calc(100%-25px)] sm:w-[calc(100%-25px)] 
                                hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                                <img src={item.background_image} 
                                    className='h-[200px] rounded-t-lg object-cover' alt={item.name} />
                                <h2 className='dark:text-white text-[20px] p-2 font-bold'>{item.name}</h2>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className='md:grid md:grid-cols-3 gap-4 lg:grid-cols-4'>
                    {gameList.map((item, index) => index < 4 && (
                        <div key={index} className='bg-[#76a8f75e] rounded-lg group hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                            <img src={item.background_image} 
                                className='h-[200px] rounded-t-lg object-cover' alt={item.name} />
                            <h2 className='dark:text-white text-[20px] p-2 font-bold'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TrendingGames;
