import React from 'react';
import {Button} from "semantic-ui-react";


function do_rainbow(color){
    console.log(color.hex)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: {mode: "rainbow"} })
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

export function RainbowPage() {
  return (
    <div className="App">
        <Button onClick={do_rainbow}>Do Rainbow</Button>
    </div>
  );
}