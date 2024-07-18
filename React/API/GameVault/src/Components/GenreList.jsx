import React, { useEffect, useState } from 'react';
import GlobalApi from '../Services/GlobalApi';

const GenreList = ({ onGenreSelect }) => {
  const [genreList, setGenreList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getGenreList();
  }, []);

  const getGenreList = async () => {
    try {
      const resp = await GlobalApi.getGenreList();
      // console.log(resp.data.results);
      setGenreList(resp.data.results);
    } catch (error) {
      console.error('Error fetching genre list:', error);
    }
  };

  const handleGenreClick = (id, index) => {
    setActiveIndex(index);
    onGenreSelect(id);
  };

  return (
    <div className='mb-[100px]'>
      <h2 className='text-[32px] font-bold dark:text-white'>Genre List</h2>

      {genreList.map((item, index) => (
        <div
          key={item.id}
          onClick={() => handleGenreClick(item.id, index)}
          className={`flex gap-2 items-center mb-2 cursor-pointer group
             hover:bg-gray-300 p-2 rounded-xl hover:dark:bg-gray-600 sticky  mr-[5px]
             ${activeIndex === index ? 'bg-gray-300 dark:bg-gray-600' : ''}`
          }
        >
          <img
            src={item.image_background}
            alt={item.name}
            className={`w-[40px] h-[40px] rounded-lg object-cover group-hover:scale-105 transition-all ease-out duration-300 ${activeIndex === index ? 'scale-105' : ''
              }`}
          />
          <h3
            className={`dark:text-white text-[18px] group-hover:scale-105 transition-all ease-out duration-300 ${activeIndex === index ? 'scale-105' : ''
              }`}
          >
            {item.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default GenreList;
