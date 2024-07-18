import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { HiOutlineMagnifyingGlass, HiMoon, HiSun } from "react-icons/hi2";
import { ThemeContext } from '../Context/ThemeContext';

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("Theme", theme);
  }, [theme]);

  return (
    <div className={`flex items-center p-3 sticky top-0 z-50 shadow-md mb-4 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <img src={logo} alt="logo" width={60} height={60} />
      <div className='flex bg-slate-200 p-2 w-full items-center mx-5 rounded-3xl'>
        <HiOutlineMagnifyingGlass />
        <input type="text" placeholder='Search Games' className='px-2 w-full bg-transparent outline-none' />
      </div>
      <div>
        {
          theme === 'light' ? (
            <HiMoon
              className='text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer'
              onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark'); }}
            />
          ) : (
            <HiSun
              className='text-[35px] bg-slate-200 text-black p-1 rounded-full cursor-pointer'
              onClick={() => { setTheme('light'); localStorage.setItem('theme', 'light'); }}
            />
          )
        }
      </div>
    </div>
  );
}

export default Header;
