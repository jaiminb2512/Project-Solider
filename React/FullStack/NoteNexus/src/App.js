import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/HomePage';
import Notes from './components/Notes';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer'
import { NotesProvider } from './context/fetchallnotes';

const App = () => {
  const userId = localStorage.getItem('userId');

  return (
    <NotesProvider>
      <Router>
        <Navbar className="navbar" />  
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/notes" element={ <Notes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer  className="footer"/>
      </Router>
    </NotesProvider>
  );
};

export default App;
