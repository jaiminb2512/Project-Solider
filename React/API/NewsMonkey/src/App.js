import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [pageSize, setPageSize] = useState(10);
  const [progress, setProgress] = useState(0);
  const apiKey = "c396f8aee7814095a9a5bda905e72225";

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    if (mode === 'dark') {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else {
      document.body.style.backgroundColor = '#343a40';
      document.body.style.color = 'white';
    }
  };

  return (
    <div>
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} aboutTitle="About us" />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="home" pageSize={pageSize} country="in" category="general" mode={mode} /></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" mode={mode} /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" mode={mode} /></Route>
          <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" mode={mode} /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" mode={mode} /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" mode={mode} /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" mode={mode} /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" mode={mode} /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
