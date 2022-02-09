import React from 'react';
import {Icon} from './components/Icon';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">
          <Icon
            type="illustration"
            name="science"
            fallback={
              'Тут должна быть большая картинка, но её украли'
            }
          />
        </div>
        <p className="App-paragraph">
          <span className="App-inline-icon">
            <Icon
              type="multi"
              name="sunset-above-ocean"
              fallback="🌅"
            />
          </span>
          Hello, world!
          <span className="App-inline-icon">
            <Icon type="mono" name="settings" fallback="⚙️" />
          </span>
        </p>
      </header>
    </div>
  );
}

export default App;
