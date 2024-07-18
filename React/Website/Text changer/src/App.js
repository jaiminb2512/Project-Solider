import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const [mode, setmode] = useState('light')

  const togglemode = () => {
    if(mode === 'dark'){
      setmode('light')
      document.body.style.backgroundColor = 'white'
    }

    else{
      setmode('dark')
      document.body.style.backgroundColor = '#343a40'
    }
  }

  return (
    <>
      <Router>
        <Navbar title="TextChanger" mode={mode} togglemode={togglemode} aboutTitle="About us" />
        <Alert alert={alert} />
        <div className="container my-3">
          <Switch>
            <Route excat path="/about">
              <About mode={mode}/>
            </Route> 
            <Route excat path="/">
              <TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;

