import React from 'react';
import {List, Button} from "semantic-ui-react";


function do_solid_rainbow() { update_mode({mode: "solid_rainbow"}) }

function do_sliding_rainbow() { update_mode({mode: "sliding_rainbow"}) }

function do_off() { update_mode({mode: "off"}) }

function do_per_step() { update_mode({mode: "per_step"}) }

function do_nyan_cat() { update_mode({mode: "nyan_cat"}) }

function do_nyan_cats() { update_mode({mode: "nyan_cats"}) }

function do_halloween() {
    update_mode({
        mode: "fading",
        colors: [
            {r:255, g:0, b:0},
            {r:255, g:66, b:0},
        ]
    })
}






function do_solid_sparkly() {
    update_mode({
        mode: "solid_sparkly",
        //TODO: get primary, sparkles from UI
        primary: {r:0, g:50, b:0},
        sparkles: {r:255, g:255, b:255},
    })
}

//TODO: add 'raindrops' in many places


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
        <List>
            <List.Item><Button onClick={do_solid_rainbow}>Solid Rainbow</Button></List.Item>
            <List.Item><Button onClick={do_sliding_rainbow}>Sliding Rainbow</Button></List.Item>
            <List.Item><Button onClick={do_halloween}>Halloween</Button></List.Item>
            <List.Item><Button onClick={do_per_step}>Per Step</Button></List.Item>
            <List.Item><Button onClick={do_nyan_cat}>Nyan Cat</Button></List.Item>
            <List.Item><Button onClick={do_nyan_cats}>Nyan Cats</Button></List.Item>
            <List.Item><Button onClick={do_solid_sparkly}>Solid Sparkly</Button></List.Item>
            <List.Item><Button onClick={do_off}>Off</Button></List.Item>
        </List>
    </div>
  );
}