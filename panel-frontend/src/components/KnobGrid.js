import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Knob from 'react-canvas-knob';
import styles from './css/knobgrid.css';

class KnobGrid extends Component {

    constructor(props) {
        super(props);
        this.state={
            config:{},
            endpoint:'localhost:4001',
           k_value:50 
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
    
    knobOnChange = (newValue) => {
        this.setState({k_value:newValue})
    }
    
    createGrid(){
        let grid = [];
        
                for (var el = 0, elnum = this.props.pad_num; el < elnum; el++) {
                    grid.push(
                        <Knob className="gknob" fgColor="#ccc"{...this.knob_style} value={this.state.k_value} onChange={this.knobOnChange}/>    
                    );
                }
        
        return grid;
    }

    render() {
        return (
            <div className="knob-grid">
                    {this.createGrid()}
            </div>
        );
    }
}

export default KnobGrid;
