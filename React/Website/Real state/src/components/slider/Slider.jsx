import './slider.scss'
import { useState } from 'react'

import React from 'react'

function Slider({ images }) {

  const [imageIndex, SetImageIndex] = useState(null)

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        SetImageIndex(images.length)
      } else {
        SetImageIndex(imageIndex - 1)
      }
    }

    else {
      if (imageIndex === images.length - 1) {
        SetImageIndex(0)
      }
      else {
        SetImageIndex(imageIndex + 1)
      }
    }
  }

  return (
    <div className='slider'>

      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide('left')}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" srcset="" />
          </div>
          <div className="arrow" onClick={() => changeSlide('right')}>
            <img src="/arrow.png" className="right" alt="" />
          </div>
          <div className="close" onClick={() => SetImageIndex(null)}>X</div>
        </div>
      )}

      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => SetImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img src={image} key={index} onClick={() => SetImageIndex(index + 1)} />
        ))}
      </div>
    </div>
  )
}

export default Slider