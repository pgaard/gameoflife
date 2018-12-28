import React, { Component } from 'react';
import Cell from '../Cell/cell'
import classes from './grid.module.css';

class Grid extends Component {

    render(){
        return this.props.cells.map((row, rowIndex) => {
            return ( 
                <div className={classes.Grid} key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                        return <Cell alive={cell} key={cellIndex}></Cell>
                    })}
                </div>
            )
        });
    }
}

export default Grid;