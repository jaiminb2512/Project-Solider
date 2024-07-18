import React from 'react';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListing.css';

const MovieListing = () => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
  };

  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);

  const renderMovies = movies.Response === "True" ? (
    movies.Search.map((movie, index) => (
      <div key={index}>
        <MovieCard data={movie} />
      </div>
    ))
  ) : (
    <div className="movies-error">
      <h3>{movies.Error}</h3>
    </div>
  );

  const renderShows = shows.Response === "True" ? (
    shows.Search.map((show, index) => (
      <div key={index}>
        <MovieCard data={show} />
      </div>
    ))
  ) : (
    <div className="shows-error">
      <h3>{shows.Error}</h3>
    </div>
  );

  return (
    <div className='movie-wrapper'>
      <div className='movie-list'>
        <h2>Movies</h2>
        <h2 className=''>Movies</h2> 
        <div className='movie-container'>
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className='show-list'>
        <h2>Shows</h2>
        <div className='show-container'>
        <Slider {...settings}> {renderShows}</Slider>
         
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
