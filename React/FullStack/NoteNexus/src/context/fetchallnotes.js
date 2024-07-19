import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchNotes(storedUserId); 
    }
  }, []);

  const fetchNotes = async (id) => {
    const uid = id || userId;
    // console.log(id)
    if (!uid) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/getnotes/${uid}`);
      setNotes(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
    localStorage.setItem('userId', newUserId);
    fetchNotes(newUserId); 
  };

  return (
    <NotesContext.Provider value={{ notes, fetchNotes, loading, userId, updateUserId }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
