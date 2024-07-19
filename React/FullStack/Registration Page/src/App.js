import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isSignup, setIsSignup] = useState(false);


  return (
    <div className={`container ${isSignup ? 'active' : ''}`}>
      <div className="forms">
        {isSignup ? <Register setIsSignup={setIsSignup} /> : <Login setIsSignup={setIsSignup} />}
      </div>
    </div>
  );
}

export default App;
