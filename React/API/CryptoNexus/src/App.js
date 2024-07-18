import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Row } from 'antd';
import { Navbar, Homepage, Cryptocurrencies, CryptoDetails } from './components';
import { IoMdHome } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import './App.css';


const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer" >
          <Row style={{ color: "white" }}>
            <div>
              <Link to="/">
                <IoMdHome style={{fill: "white", fontSize: "20px", marginRight: "10px"}}/>
              </Link>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/jaimin-prajapati251203/" class="social-link" target="_blank">
                <FaLinkedin style={{fill: "white", fontSize: "20px", marginRight: "10px"}} />
              </a>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App