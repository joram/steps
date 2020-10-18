import React from 'react';
import {Button} from "semantic-ui-react";


function do_solid_rainbow() {
    update_mode("solid_rainbow")
}

function do_sliding_rainbow() {
    update_mode("sliding_rainbow")
}

function do_off() {
    update_mode("off")
}


function update_mode(mode){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: {mode: mode} })
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
        <Button onClick={do_solid_rainbow}>Solid Rainbow</Button>
        <br/>
        <br/>
        <Button onClick={do_sliding_rainbow}>Sliding Rainbow</Button>
        <br/>
        <br/>
        <Button onClick={do_off}>Off</Button>

    </div>
  );
}