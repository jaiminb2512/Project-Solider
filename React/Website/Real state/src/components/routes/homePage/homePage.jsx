import React from 'react'
import "./homePage.scss"
import SearchBar from "../../searchBar/SearchBar"

const HomePage = () => {
  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wrapper">
          <h2 className='title'>
            Find Real State & Get Your Dream Place
            {/* Get your Dream Place Find Real State & Get Your Dream Place */}
          </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi, perferendis quidem provident deleniti consequuntur cumque molestiae totam corrupti delectus! Quidem fugit minus quaerat asperiores officia similique perspiciatis, repellendus reprehenderit quasi eos ducimus. Ipsum eius animi sint exercitationem, quos ipsa tenetur est. Suscipit, minus repudiandae.</p>


          <SearchBar />

          <div className="boxes">
            <div className="box">
              <h2>16+</h2>
              <h3>Years of Experience</h3>
            </div>

            <div className="box">
              <h2>200</h2>
              <h3>Award Granted</h3>
            </div>

            <div className="box">
              <h2>2000+</h2>
              <h3>Property Ready</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  )
}

export default HomePage