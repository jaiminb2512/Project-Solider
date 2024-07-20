import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaHospital, FaCoffee, FaGasPump, FaUtensils } from 'react-icons/fa';
import DisplayCard from './DisplayCard';
import MapsApp from './MapsApp'
import data from './data';

function SearchBar() {
    const [selectedIcon, setSelectedIcon] = useState('hospital'); 
    const [filteredData, setFilteredData] = useState([]);

    // Update filteredData whenever selectedIcon changes
    useEffect(() => {
        const filtered = data.filter(place => place.category === selectedIcon);
        setFilteredData(filtered);
    }, [selectedIcon]); 

    const handleIconClick = (iconName) => {
        // Toggle selection logic
        setSelectedIcon(prevIcon => prevIcon === iconName ? null : iconName);
    };

    // console.log(filteredData); 

    return (
        <div className='flex'>
            <div className='w-[50%]'>
                <div className='flex gap-3 bg-purple-100 p-3 rounded-xl items-center w-full'>
                    <CiSearch className="w-6 h-6 text-purple-400" />
                    <input type='text' placeholder='Search' className='bg-transparent outline-none w-full text-[17px] placeholder-purple-400' />
                </div>

                <div className="flex justify-between mt-3 font-bold">
                    <div className={`bg-purple-100 p-3 rounded-md cursor-pointer ${selectedIcon === 'hospital' ? 'bg-green-100' : ''}`} onClick={() => handleIconClick('hospital')}>
                        <FaHospital className={`w-8 h-8 ${selectedIcon === 'hospital' ? 'text-purple-500' : ''} `} />
                    </div>
                    <div className={`bg-purple-100 p-3 rounded-md cursor-pointer ${selectedIcon === 'cafe' ? 'bg-green-100' : ''}`} onClick={() => handleIconClick('cafe')}>
                        <FaCoffee className={`w-8 h-8 ${selectedIcon === 'cafe' ? 'text-purple-500' : ''}`} />
                    </div>
                    <div className={`bg-purple-100 p-3 rounded-md cursor-pointer ${selectedIcon === 'petrol pump' ? 'bg-green-100' : ''}`} onClick={() => handleIconClick('petrol pump')}>
                        <FaGasPump className={`w-8 h-8 ${selectedIcon === 'petrol pump' ? 'text-purple-500' : ''}`} />
                    </div>
                    <div className={`bg-purple-100 p-3 rounded-md cursor-pointer ${selectedIcon === 'food' ? 'bg-green-100' : ''}`} onClick={() => handleIconClick('food')}>
                        <FaUtensils className={`w-8 h-8 ${selectedIcon === 'food' ? 'text-purple-500' : ''}`} />
                    </div>
                </div>

                <DisplayCard data={filteredData} className='h-[150px]' />
            </div>

            <div className='w-[50%] h-[95vh]'>
            {filteredData && <MapsApp selectedIcon={selectedIcon} />}
            </div>
        </div>
    )
}

export default SearchBar;
