import React from 'react';

const Navbar = ({ navBgColor }) => {
  return (
    <nav className={`flex justify-between text-white bg-${navBgColor}-700 py-2`}>
      <div>
        <span className='font-bold mx-9'>TaskTrack</span>
      </div>
      <ul className="flex mx-9 gap-8">
        <li className='cursor-pointer hover:font-bold'>Home</li>
        <li className='cursor-pointer hover:font-bold'>Your-task</li>
      </ul>
    </nav>
  );
};

export default Navbar;
