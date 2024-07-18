import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} ${theme === 'dark' ? 'bg-[#121212]' : 'bg-white'} min-h-[100vh]`}>
        <Header />
        <Home />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
