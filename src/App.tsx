import React from 'react';
import science from './components/Icon/img/illustrations/science.svg';
import Settings from './components/Icon/img/mono/settings.jsx.svg';
import sunsetAboveOcean from './components/Icon/img/multi/sunset-above-ocean.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={science} className="App-logo" alt="logo" />
        <p>
          <img src={sunsetAboveOcean} className="App-inline-icon" />
          Hello, world!
          <Settings className="App-inline-icon" />
        </p>
      </header>
    </div>
  );
}

export default App;
