import React from 'react';
import { CirclePicker } from 'react-color';



export class ColorPicker extends React.Component {

    state = {
       color: this.props.color
    }

    rgbToHex(data) {
        return "#" + ((1 << 24) + (data.r << 16) + (data.g << 8) + data.b).toString(16).slice(1);
    }

    colorChanged(color){
        console.log(color.hex)
        let state = this.state
        state.color = color.rgb
        this.setState(state)
        this.props.onChangeComplete(color)
    }

    render() {
        return (
        <>
            <div style={{
                backgroundColor: this.rgbToHex(this.state.color),
                border: "solid thin black",
                width: "238px",
                height: "50px",
                marginBottom: "10px"
            }}/>
            <CirclePicker onChangeComplete={this.colorChanged.bind(this)}/>
        </>
        );
    }
}