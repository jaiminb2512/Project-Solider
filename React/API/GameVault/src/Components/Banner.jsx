import React, { useEffect } from 'react'
import '../style/styles.css';

function Banner({gameBanner}) {

    // useEffect(( ) => {
    //         console.log("gameBanner", gameBanner.background_image)
    // },[])

  return (
    <div className='relative mr-5'>
        <div className='absolute bottom-0 p-5 bg-gradient-to-t from-slate-900 to-transparent w-full'>
            <h2 className='text-[24px] text-white font-bold'> {gameBanner.name}</h2>
            <button className='bg-blue-700 text-white px-2 p-1'>Get Now</button>
        </div>
        <img src={gameBanner.background_image} alt="none" className='md:h-[450px] w-full object-cover rounded-xl'/>
    </div>
  )
}

export default Banner