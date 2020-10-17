import React from 'react';
import { CirclePicker } from 'react-color';

function colorChanged(color){
    console.log(color.hex)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: {color: color.rgb} })
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

export function SolidPage() {
  return (
    <div className="App">

      <CirclePicker onChangeComplete={ colorChanged } />
    </div>
  );
}