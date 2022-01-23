import React from 'react';
// import science from './components/Icon/img/illustrations/science.svg';
// import Settings from './components/Icon/img/mono/settings.jsx.svg';
// import sunsetAboveOcean from './components/Icon/img/multi/sunset-above-ocean.svg';
import {Icon} from './components/Icon';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <Icon type="illustration" name="science" />
        </div>
        <p className="App-paragraph">
          <span className="App-inline-icon">
            <Icon type="multi" name="sunset-above-ocean" />
          </span>
          Hello, world!
          <span className="App-inline-icon">
            <Icon type="mono" name="settings" />
          </span>
        </p>
      </header>
    </div>
  );
}

export default App;
