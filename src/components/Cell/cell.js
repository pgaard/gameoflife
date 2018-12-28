import React, { Component } from 'react';
import classes from './cell.css';

class Cell extends Component {
    render(){
        return(
            <div className={classes.Cell}>
                {this.props.alive}
            </div>
        );
    }
}

export default Cell;