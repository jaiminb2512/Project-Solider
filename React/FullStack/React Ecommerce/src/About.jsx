import React, { useContext } from 'react';
import HeroSection from './components/HeroSection';
import { AppContext,  useProductContext } from './context/ProductContex';

const About = () => {
  const { MyName } = useProductContext(AppContext);

  const data = {
    name: "About ReactifyStore",
  };

  return (
    <div>
      <p style={{color: "black"}}>{MyName}</p>
      <HeroSection myData={data} />
    </div>
  );
};

export default About;
