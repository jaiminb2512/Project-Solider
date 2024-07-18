import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import user from '../../images/user.png'
import './Header.css'
import { useDispatch } from 'react-redux'
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'

const Header = () => {
  const [term, setTerm] = useState("")
  const dispatch = useDispatch()
  const submitHandler= (e) => {
    e.preventDefault();
    console.log(term)
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncShows(term))
  }
  return (
    <div className='header'>
      <div className='logo'> <Link to="/">Film Finder Hub</Link> </div>
      <div className='search-bar'>
        <form className='form' onSubmit={submitHandler}>
          <input className='search-input' type="text" value={term} placeholder = "Search Movies or Shows" onChange={(e) => setTerm(e.target.value)}/>
          <button type='submit'> Search </button>
        </form>
      </div>
      <div className='user-img'>
        <img style={{ width: '60px', marginTop: '5px' }} className='userImg' src={user} alt='user' />
      </div>
    </div>
  )
}

export default Header