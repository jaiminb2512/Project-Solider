import React, { useContext } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

function Hero() {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div className='my-[50px] flex flex-col items-center gap-5'>
            <h2 className='text-3xl font-bold text-center'>  Top Productive idea for your  next startup </h2>

            <h2 className='text-center my-3'>
                <strong className='text-secondary'> Like your faviourate idea </strong> and share your Ideas, No need to create account or share your details</h2>


            <div>
                <select className="select select-bordered border-primary w-full max-w-xs"
                    onChange={(event) => setTheme(event.target.value)}
                >
                    <option disabled selected>Select Theme</option>
                    <option>light</option>
                    <option>dark</option>
                    <option>coffee</option>
                    <option>bumblebee</option>
                    <option>garden</option>
                    <option>forest</option>
                    <option>synthwave</option>
                    <option>aqua</option>
                    <option>cyberpunk</option>
                    <option>valentine</option>
                    <option>halloween</option>
                    <option>black</option>
                    <option>luxury</option>
                    <option>autumn</option>

                </select>
            </div>
        </div>
    )
}

export default Hero