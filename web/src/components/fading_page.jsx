import React from 'react';
import {Grid} from "semantic-ui-react";
import {ColorPicker} from "./color_picker";



export class FadingPage extends React.Component {

    state = {
       serverState: {
            mode: "fading",
            colors: [
                {r:255, g:255, b:255},
                {r:0, g:0, b:0},
            ],
        }
    }

    pushStateChange(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({state: this.state.serverState} )
        };
        fetch('/api/v0/state', requestOptions)
            .then(response => response.json())
            .then(state => {
                console.log(state)
            })
    }

    rgbToHex(data) {
        return "#" + ((1 << 24) + (data.r << 16) + (data.g << 8) + data.b).toString(16).slice(1);
    }

    color1Changed(color){
        console.log(color.hex)
        let state = this.state
        state.serverState.colors[0] = color.rgb
        this.setState(state)
        this.pushStateChange()
    }

    color2Changed(color){
        console.log(color.hex)
        let state = this.state
        state.serverState.colors[1] = color.rgb
        this.setState(state)
        this.pushStateChange()
    }

    render() {
        return (
            <>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <ColorPicker color={this.state.serverState.colors[0]} onChangeComplete={this.color1Changed.bind(this)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <ColorPicker color={this.state.serverState.colors[1]} onChangeComplete={this.color2Changed.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }
}