import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function GamesByGenresid({ gameList, genreName }) {
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
    slidesToScroll: 2,
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
    <div>
      <h2 className='font-bold text-[30px] dark:text-white mt-5'>
        Popular {genreName} Games
      </h2>
      {isMobile ? (
        <Slider {...settings} className='gap-4 ml-[25px] w-[85%] mb-[100px]'>
          {gameList.map((item) => (
            <div className='px-[12.5px]' key={item.id}>
              <div
                className='bg-[#76a8f75e] p-3 rounded-lg h-[fit-content] mb-5 mt-5
                hover:scale-110 transition-all ease-linear duration-300 cursor-pointer'>
                <img
                  src={item.background_image}
                  alt={item.name}
                  className='w-full h-[150px] rounded-xl object-cover'
                />
                <h3 className='text-[15px] dark:text-white'>
                  {item.name}
                  <span className='p-1 rounded-sm ml-2 h-4 text-[10px] bg-green-100 text-green-700 font-medium'>
                    {item.metacritic}
                  </span>
                </h3>
                <h2 className='text-gray-500 dark:text-white'>
                  ⭐{item.rating} 💬{item.reviews_count} 🔥{item.suggestions_count}
                </h2>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='md:grid md:grid-cols-3 gap-4 lg:grid-cols-4 ml-[25px] w-[95%] mb-[100px]'>
          {gameList.map((item) => (
            <div className='px-[12.5px]' key={item.id}>
              <div
                className='bg-[#76a8f75e] p-3 rounded-lg h-[fit-content] mb-5 mt-5
                hover:scale-110 transition-all ease-linear duration-300 cursor-pointer'>
                <img
                  src={item.background_image}
                  alt={item.name}
                  className='w-full h-[150px] rounded-xl object-cover'
                />
                <h3 className='text-[15px] dark:text-white'>
                  {item.name}
                  <span className='p-1 rounded-sm ml-2 h-4 text-[10px] bg-green-100 text-green-700 font-medium'>
                    {item.metacritic}
                  </span>
                </h3>
                <h2 className='text-gray-500 dark:text-white'>
                  ⭐{item.rating} 💬{item.reviews_count} 🔥{item.suggestions_count}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GamesByGenresid;
