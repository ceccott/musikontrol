import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/channel.css';
import Knob from 'react-canvas-knob';
import Slider from 'react-rangeslider'
import './css/slider.css'

class Channel extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            ch_label:"Channel",
            k_gain:50, // default values init
            k_high:50,
            k_mid:50,
            k_low:50,
            s_volume:30,
            midi_channel:0
        };

        this.slider_style={
            orientation:'vertical',
            tooltip:false,
            min:'0',
            max:'127'
        }

        this.knob_style={
            angleOffset:'180',
            angleArc:'300',
            displayInput:false,
            thickness:'0.4',
            lineCap:'butt',
            width:'150',
            height:'150',
            bgColor:'#444',
            min:'0',
            max:'127'
        }
    }

    componentWillMount(){
        console.log('App will mount');
    }

    componentDidMount(){
        console.log('App did mount');
    }

    componentWillReceiveProps(){
        console.log('App receiving new props');
    }

    componentWillUpdate(){
        console.log('App will update');
    }
    
    componentDidUpdate(){
        console.log('App did update');
    }

    knobOnChange_gain = (newValue) => {
        this.setState({k_gain:newValue})
    }

    knobOnChange_high = (newValue) => {
        this.setState({k_high:newValue})
        this.props.socket.emit('midi',{
            type:'cc',
            data:{
                channel:this.state.midi_channel,
                controller:2,
                value:newValue
        }}); 
    }

    knobOnChange_mid = (newValue) => {
        this.setState({k_mid:newValue})
    }

    knobOnChange_low = (newValue) => {
        this.setState({k_low:newValue})
    }

    sliderOnChange = (newValue) => {
        this.setState({s_volume:newValue})
    }

    render(){
        return(
         <div class="container">
            <div class="channel">
                <div class="rotaries">
                    <Knob className="knob" fgColor="#ccc"{...this.knob_style} value={this.state.k_gain} onChange={this.knobOnChange_gain}/>    
                    <Knob className="knob" fgColor="#0aa"{...this.knob_style} value={this.state.k_high} onChange={this.knobOnChange_high}/>
                    <Knob className="knob" fgColor="#aa0"{...this.knob_style} value={this.state.k_mid} onChange={this.knobOnChange_mid}/>
                    <Knob className="knob" fgColor="#a00" {...this.knob_style} value={this.state.k_low} onChange={this.knobOnChange_low}/>
                </div>
                <div class="sliders">
                    <Slider className="slider" {...this.slider_style} value={this.state.s_volume} onChange={this.sliderOnChange}/>
                </div>
            </div>
            <div class="label">{this.state.ch_label}</div>
         </div>
        );
    }


}

//ReactDOM.render(<Channel />, document.getElementById('example'));
export default Channel;
