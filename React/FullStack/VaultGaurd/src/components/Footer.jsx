import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>
                <span>Vault</span><span className='text-green-500'>Guard/&gt;</span>
            </div>
            <div className='flex justify-center items-center'> Thanks to CodeWithHarry </div>
        </div>
    )
}

export default Footer
