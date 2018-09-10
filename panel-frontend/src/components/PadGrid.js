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

    render() {
        this.gridelements = [];
        for (var i = 0, len = this.props.pad_num; i < len; i++) {
            this.gridelements.push(<button className='pad'/>);
        }
        return (
            <div className="pad-grid">
                    {this.gridelements}
            </div>
        );
    }
}

export default PadGrid;
