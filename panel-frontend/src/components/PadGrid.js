import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/padgrid.css';


class PadGrid extends Component {

    constructor(props) {
        super(props);
        //this.onPadPress=this.onPadPress.bind(this);
        
        //this.onPadRelease=this.onPadRelease.bind(this);
        this.state={
            config:{},
            endpoint:'localhost:4001',
            midi_channel:0,
            cc_ids:this.props.get_cc_ids(this.props.pad_num)
        }
    }

    _onPadPress(pad_id){
        console.log('pad pressed:'+pad_id);
        this.props.socket.emit('midi',{
            type:'cc',
            data:{
                channel:this.state.midi_channel,
                controller:this.state.cc_ids[pad_id],
                value:127
        }}); 

    }

    _onPadRelease(pad_id){
        console.log('pad released:'+pad_id);
        this.props.socket.emit('midi',{
            type:'cc',
            data:{
                channel:this.state.midi_channel,
                controller:this.state.cc_ids[pad_id],
                value:0
        }}); 
    }

    componentDidMount(){
        console.log('App did mount');
            
    }


    createGrid(){
        let grid = [];
        let cnt=0;

        for (var row = 0, len = Math.sqrt(this.props.pad_num); row < len; row++) {
            let grid_row = [];
                for (var el = 0, elnum = Math.sqrt(this.props.pad_num); el < elnum; el++) {
                    grid_row.push(<button id={cnt} key={cnt} className='pad' onMouseDown={this._onPadPress.bind(this,cnt)} onMouseUp={this._onPadRelease.bind(this,cnt)}/>);
                cnt++;
                }
            grid.push(<div key={100+cnt} className='row'>{grid_row}</div>);
        }

        return grid;
    }

    render() {
        return (
            <div className="pad-grid">
                    {this.createGrid()}
            </div>
        );
    }
}

export default PadGrid;
