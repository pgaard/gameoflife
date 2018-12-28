import React, { Component } from 'react';
import Row from '../Row/row'
import classes from './grid.css';

class Grid extends Component {

    render(){
        return this.props.cells.map((row) => {
            return ( 
            <div className={classes.Grid}>
                <Row row={row}></Row>
            </div>
            )
        });
    }
}

export default Grid;