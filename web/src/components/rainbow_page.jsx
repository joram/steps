import React from 'react';
import {Button} from "semantic-ui-react";


function do_solid_rainbow() {
    update_mode({mode: "solid_rainbow"})
}

function do_sliding_rainbow() {
    update_mode({mode: "sliding_rainbow"})
}

function do_off() {
    update_mode({mode: "off"})
}

function do_halloween() {
    update_mode({
        mode: "solid_rainbow",
        colors: [
            {r:255, g:0, b:0},
            {r:255, g:66, b:0},
        ]
    })
}


function update_mode(state){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: state })
    };
    fetch('/api/v0/state', requestOptions)
        .then(response => response.json())
        .then(state => {
            console.log(state)
        })
}

export function PrebuildModesPage() {
  return (
    <div className="App">
        <Button onClick={do_solid_rainbow}>Solid Rainbow</Button>
        <br/>
        <br/>

        <Button onClick={do_sliding_rainbow}>Sliding Rainbow</Button>
       <br/>
        <br/>

        <Button onClick={do_halloween}>Halloween</Button>
        <br/>
        <br/>

        <Button onClick={do_off}>Off</Button>

    </div>
  );
}