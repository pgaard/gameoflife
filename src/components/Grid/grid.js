import React, { Component } from 'react';
import Row from '../Row/row'
import classes from './grid.module.css';

class Grid extends Component {

    render(){
        return this.props.cells.map((row, index) => {
            return ( 
            <div className={classes.Grid} key={index}>
                <Row row={row}></Row>
            </div>
            )
        });
    }
}

export default Grid;