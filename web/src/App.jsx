import React from 'react';
import './App.css';
import { CirclePicker } from 'react-color';

function colorChanged(color){
    console.log(color.hex)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: {color: color.rgb} })
    };
    fetch('http://localhost:5000/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

function App() {
  return (
    <div className="App">
      <CirclePicker onChangeComplete={ colorChanged } />
    </div>
  );
}

export default App;
