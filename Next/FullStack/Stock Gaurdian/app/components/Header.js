import React from 'react';

const Header = ({}) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap justify-center p-5 flex-col my-6 md:flex-row items-center">         
          <span className="ml-3 w-full text-3xl text-center font-bold" >Stock Management</span>     
      </div>
    </header>
  );
}

export default Header;
