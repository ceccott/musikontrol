import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './css/padgrid.css';

class PadGrid extends Component {

    constructor(props) {
        super(props);
        this.state={
            config:{},
            endpoint:'localhost:4001',
            
        }
    }

    createGrid(){
        let grid = [];
        
        for (var row = 0, len = Math.sqrt(this.props.pad_num); row < len; row++) {
            let grid_row = [];
                for (var el = 0, elnum = Math.sqrt(this.props.pad_num); el < elnum; el++) {
                    grid_row.push(<button className='pad'/>);
                }
            grid.push(<div class='row'>{grid_row}</div>);
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
