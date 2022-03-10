import React from 'react';
import {ColorPicker} from "./color_picker";

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
      <ColorPicker color={{r:255, g:255, b:255}} onChangeComplete={ colorChanged } />
      <img src="/video_feed" />
    </div>
  );
}
