import React, {useState} from 'react';
import {ColorPicker} from "./color_picker";
import NumberInput from 'semantic-ui-react-numberinput';

function post(color, variance){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({state: {
            mode: "solid_rough",
            color: color,
            variance: variance,
        }})
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}


export function MuffinPage() {
  const [variance, setVariance] = useState(10);
  const [color, setColor] = useState( {r:0, b:0, g:0});

  return (
    <div className="App">
        new logic goes here
    </div>
  );
}