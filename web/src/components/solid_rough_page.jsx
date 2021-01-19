import React, {useState} from 'react';
import {ColorPicker} from "./color_picker";
import NumberInput from 'semantic-ui-react-numberinput';

let c = {r:0, b:0, g:0}
const [color, setColor] = useState(c);
const [variance, setVariance] = useState(10);

function post(){
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

function colorChanged(c) {
    setColor(c.rgb)
    post()
}

function varianceChanged(n){
    setVariance(n)
    post()
}

export function SolidRoughPage() {
  return (
    <div className="App">
      <ColorPicker color={{r:255, g:255, b:255}} onChangeComplete={ colorChanged } />
      <br/>
      <NumberInput value={variance} onChange={varianceChanged} />
    </div>
  );
}