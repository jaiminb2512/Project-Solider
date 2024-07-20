// WITH A LIBRARY
// "use client"
// import React from 'react'
// import Countdown from 'react-countdown'

// const endingDate = new Date("2023-07-25")

// const CountDown = () => {
//   return (
//     <Countdown className='font-bold text-5xl text-yellow-300' date={endingDate}/>
//   )
// }

// export default CountDown


// WITHOUT A LIBRARY

// "use client"
// import React, { useState, useEffect } from "react";

// const CountDown = () => {
  
//   let difference = +new Date(`10/10/2024`) - +new Date();
//   const [delay, setDelay] = useState(difference);

//   const d = Math.floor(difference / (1000 * 60 * 60 * 24));
//   const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
//   const m = Math.floor((difference / 1000 / 60) % 60);
//   const s = Math.floor((difference / 1000) % 60);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setDelay(delay - 1);
//     }, 1000);

//     if (delay === 0) {
//       clearInterval(timer);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   });
//   return (
//     <span className="font-bold text-5xl text-yellow-300">
//       {d}:{h}:{m}:{s}
//     </span>
//   );
// };

// export default CountDown;


"use client"
import React, { useState, useEffect } from "react";

const CountDown = () => {
  const targetDate = new Date("6/27/2024").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const m = Math.floor((difference / 1000 / 60) % 60);
    const s = Math.floor((difference / 1000) % 60);

    return { d, h, m, s };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-bold text-5xl text-yellow-300">
      {timeLeft.d}:{timeLeft.h}:{timeLeft.m}:{timeLeft.s}
    </span>
  );
};

export default CountDown;
