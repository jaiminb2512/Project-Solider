import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/movieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
  async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`);
    const imdbIds = response.data.Search.map(movie => movie.imdbID);
    // console.log(imdbIds);
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`); // Use 'type=series' to fetch shows
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetails',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    console.log(response.data); 
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    // },
    removeSelectedMovieorShow : (state) => {
      state.selectedMovieOrShow  = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
        console.log('Movies Fetch Pending');
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Movies Fetched Successfully!");
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {
        console.log("Movies Fetch Rejected");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Shows Fetched Successfully!");
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetails.fulfilled, (state, { payload }) => {
        console.log("Movie or Show Details Fetched Successfully!");
         state.selectedMovieOrShow = payload;
      });
  }
});

// export const { addMovies } = movieSlice.actions;
export const { removeSelectedMovieorShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow; 
export default movieSlice.reducer;
