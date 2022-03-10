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


export function SolidRoughPage() {
  const [variance, setVariance] = useState(10);
  const [color, setColor] = useState( {r:0, b:0, g:0});

  function colorChanged(c) {
    setColor(c.rgb)
    post(color, variance)
  }

  function varianceChanged(n){
    setVariance(n)
    post(color, variance)
  }

  return (
    <div className="App">
      <ColorPicker color={{r:255, g:255, b:255}} onChangeComplete={ colorChanged } />
      <br/>
      <NumberInput value={variance} onChange={varianceChanged} />
    </div>
  );
}