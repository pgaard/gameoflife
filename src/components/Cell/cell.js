import React, { Component } from 'react';
import classes from './cell.module.css';

class Cell extends Component {
    render(){
        return(
            <div className={this.props.alive ? classes.CellActive : classes.CellInactive}>
            </div>
        );
    }
}

export default Cell;