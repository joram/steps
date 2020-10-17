import React from 'react';
import { CirclePicker } from 'react-color';

let serverState = {
    mode: "fading",
    colors: [
        {r:255, g:255, b:255},
        {r:0, g:0, b:0},
    ],
}
function color1Changed(color){
    console.log(color.hex)
    serverState.colors[0] = color.rgb
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverState)
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

function color2Changed(color){
    console.log(color.hex)
    serverState.colors[1] = color.rgb
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverState)
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

export function FadingPage() {
  return (
    <>
      <CirclePicker onChangeComplete={ color1Changed } />
      <CirclePicker onChangeComplete={ color2Changed } />
    </>
  );
}