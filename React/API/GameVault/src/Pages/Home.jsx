import React, { useEffect, useState } from 'react';
import GenreList from '../Components/GenreList';
import GlobalApi from '../Services/GlobalApi';
import Banner from '../Components/Banner';
import TrendingGames from '../Components/TrendingGames';
import GamesByGenresid from '../Components/GamesByGenresid';
import '../style/styles.css'; // Corrected path to the CSS file

function Home() {
  const [allGameList, setAllGameList] = useState([]);
  const [gameListByGenres, setGameListByGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(4); // Default genre id
  const [selectedGenreName, setSelectedGenreName] = useState('Action'); // Default genre name

  useEffect(() => {
    getAllGamesList();
    getGameListByGenreId(selectedGenreId); // Fetch game list for default genre id
  }, [selectedGenreId]);

  const getAllGamesList = async () => {
    try {
      const response = await GlobalApi.getAllGames();
      if (response.data && response.data.results) {
        setAllGameList(response.data.results);
      } else {
        console.error('Invalid response format for all games list');
      }
    } catch (error) {
      console.error('Error fetching all games list:', error);
    }
  };

  const getGameListByGenreId = async (id) => {
    try {
      const response = await GlobalApi.getGameListByGenreId(id);
      if (response.data && response.data.results) {
        setGameListByGenres(response.data.results);
      } else {
        console.error('Invalid response format for game list by genre');
      }
    } catch (error) {
      console.error('Error fetching game list by genre:', error);
    }
  };

  return (
    <div className='grid grid-cols-4 h-[100vh] px-5'>
      <div className='h-full hidden md:block overflow-y-auto custom-scrollbar'>
        <GenreList onGenreSelect={(id, name) => { setSelectedGenreId(id); setSelectedGenreName(name); }} />
      </div>
      <div className='col-span-4 md:col-span-3 h-full px-2 overflow-y-auto custom-scrollbar'>
        {allGameList.length > 0 && gameListByGenres.length > 0 ? (
          <div>
            <Banner gameBanner={allGameList[0]} />
            <TrendingGames gameList={allGameList} />
            <GamesByGenresid gameList={gameListByGenres} genreName={selectedGenreName} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
