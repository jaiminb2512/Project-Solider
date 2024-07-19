// Use sunset time

import React, { useState, useEffect } from 'react';
import './Temp.css';

const Temp = () => {
  const [searchValue, setSearchValue] = useState('ahmedabad');
  const [tempInfo, settempInfo] = useState({})
  const [WeatherState, setWeatherState] = useState('cloud')


  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ENTER_API_KEY`;
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);

      const { temp, humidity, pressure } = data.main
      const { main: weathermood } = data.weather[0]
      const { speed } = data.wind
      const { name } = data
      const { country, sunset } = data.sys

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        speed,
        weathermood,
        name,
        country,
        sunset
      }

      settempInfo(myNewWeatherInfo)
    }

    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  useEffect(() => {
    // Your switch case logic here
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Rain":
          setWeatherState("rainy")
          break;
        case "Clear":
          setWeatherState("clear_day")
          break;
        case "Mist":
          setWeatherState("mist")
          break;
        case "Haze":
          setWeatherState("dehaze")
          break;
        case "Smoke":
          setWeatherState("foggy")
          break;
        default:
          setWeatherState("cloud")
          break;
      }
    }
  }, [tempInfo.weathermood]);

  let sec = tempInfo.sunset;
  let date = new Date(sec * 1000);
  let timestr = `${date.getHours()} : ${date.getMinutes()}`;
  // console.log(timestr)

  return (
    <div className='wrap'>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className='search'>
        <input
          type='search'
          placeholder='search...'
          autoFocus
          id='search'
          className='searchTerm'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className='searchButton' type='button' onClick={getWeatherInfo}>
          Search
        </button>
      </div>

      <article className='widget'>
        <div className='weatherIcon'>
          <span className="material-symbols-outlined ">
            {WeatherState}
          </span>
        </div>

        <div className="weatherInfo-container">
          <div className='weatherInfo'>
            <div className='temperature'>
              <span>{tempInfo.temp}&deg;</span>
            </div>

            <div className='description'>
              <div className='weatherCondition'>{tempInfo.weathermood}</div>
              <div className='place'>{tempInfo.name},
                {tempInfo.country}
              </div>
            </div>
          </div>
          <div className="date-container">
            <div className='date'>{new Date().toLocaleString()}</div>
          </div>
        </div>


        {/* our 4colum section */}
        <div className='extra-temp'>
          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p>

                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' color='#000000' fill='none'>
                  <path d='M6.08938 14.999C5.71097 14.1484 5.5 13.2021 5.5 12.2049C5.5 8.50135 8.41015 5.49902 12 5.49902C15.5899 5.49902 18.5 8.50135 18.5 12.2049C18.5 13.2021 18.289 14.1484 17.9106 14.999' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
                  <path d='M12 1.99902V2.99902' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M22 11.999H21' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M3 11.999H2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M19.0704 4.92773L18.3633 5.63484' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M5.6368 5.63582L4.92969 4.92871' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M14.517 19.3055C15.5274 18.9786 15.9326 18.0538 16.0466 17.1236C16.0806 16.8458 15.852 16.6152 15.572 16.6152L8.47685 16.6154C8.18725 16.6155 7.95467 16.8612 7.98925 17.1488C8.1009 18.0771 8.3827 18.7553 9.45345 19.3055M14.517 19.3055C14.517 19.3055 9.62971 19.3055 9.45345 19.3055M14.517 19.3055C14.3955 21.2505 13.8338 22.0207 12.0068 21.9991C10.0526 22.0352 9.60303 21.0831 9.45345 19.3055' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </p>
            </div>
            <p className='extra-info-leftside'>
              {timestr} <br />
              sunset
            </p>
          </div>

          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p>
                <span className="material-symbols-outlined">
                  humidity_percentage
                </span>
              </p>
            </div>
            <p className='extra-info-leftside'>
              {tempInfo.humidity} <br />
              Humidity
            </p>
          </div>

          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' color='#000000' fill='none'>
                  <path d='M17.4776 8.69731C17.485 8.69727 17.4925 8.69726 17.5 8.69726C19.9853 8.69726 22 10.6103 22 12.9702C22 14.8307 20.7478 16.4134 19 17M17.4776 8.69731C17.4924 8.54092 17.5 8.38254 17.5 8.22248C17.5 5.33819 15.0376 3 12 3C9.12324 3 6.76233 5.09718 6.52042 7.76927M17.4776 8.69731C17.3753 9.77451 16.9286 10.7574 16.2428 11.5459M6.52042 7.76927C3.98398 7.99846 2 10.0269 2 12.4954C2 14.0487 2.78555 15.4278 4 16.2939M6.52042 7.76927C6.67826 7.75501 6.83823 7.74771 7 7.74771C8.12582 7.74771 9.16474 8.10103 10.0005 8.69726' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M9.0784 13.5L7.30434 16.1838C7.06684 16.5431 6.94808 16.7227 7.02165 16.8614C7.09522 17 7.30931 17 7.73747 17H9.26253C9.69069 17 9.90478 17 9.97835 17.1386C10.0519 17.2773 9.93316 17.4569 9.69566 17.8162L7.9216 20.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M16 18.5L15 20.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                  <path d='M13 18.5L12 20.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </p>
            </div>
            <p className='extra-info-leftside'>
              {tempInfo.pressure}  <br />
              Pressure
            </p>
          </div>

          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p> <span className="material-symbols-outlined">
                air
              </span> </p>
            </div>
            <p className='extra-info-leftside'>
              {tempInfo.speed} <br />
              Wind
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Temp;

