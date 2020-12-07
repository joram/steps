import React from 'react';
import {CirclePicker} from 'react-color';


    
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

    colorChangedSingleValue(e){
        let state = this.state
        state.color[e.target.name] = e.target.value
        this.setState(state)
        this.props.onChangeComplete(state.color)
    }

    render() {
        console.log(this.state.color)
        return (
        <>
            <div style={{
                backgroundColor: this.rgbToHex(this.state.color),
                border: "solid thin black",
                width: "238px",
                height: "50px",
                marginBottom: "10px"
            }}/>
            <CirclePicker onChange={this.colorChanged.bind(this)}/>
            <div style={{float:"left", paddingTop:"10px"}}>
                <input
                    max={255}
                    min={0}
                    name="r"
                    type="number"
                    style={{width:"80px"}}
                    value={this.state.color.r}
                    onChange={this.colorChangedSingleValue.bind(this)}
                />
                <input
                    max={255}
                    min={0}
                    name="g"
                    type="number"
                    style={{width:"80px"}}
                    value={this.state.color.g}
                    onChange={this.colorChangedSingleValue.bind(this)}
                />
                <input
                    max={255}
                    min={0}
                    name="b"
                    type="number"
                    style={{width:"80px"}}
                    value={this.state.color.b}
                    onChange={this.colorChangedSingleValue.bind(this)}
                />
            </div>
        </>
        );
    }
}