import React from 'react';

const DisplayCard = ({ data }) => {
  // console.log(data)
    return (
        <div className='mt-5'>
            {data.map((place, index) => (
                <div key={index} className="card flex border p-3 mb-2 h-[200px] items-center rounded-lg cursor-pointer">
                    <img 
                    src={place.image} 
                    alt={place.name} 
                    className="card-image w-[175px] h-[150px] rounded-lg border " 
                    width={"175px"}
                    height={"150px"}
                    />
                    <div className="content flex flex-col ml-5">
                        <div className="name">{place.name}</div>
                        <div className="description ">{place.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DisplayCard;
