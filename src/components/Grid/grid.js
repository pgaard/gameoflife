import React, { Component } from 'react';
import Cell from '../Cell/cell'
import classes from './grid.module.css';

class Grid extends Component {

    render(){
        const border = this.props.gridSize < 125;
        return this.props.cells.map((row, rowIndex) => {
            return ( 
                <div className={classes.Grid + " " + (border ? classes.GridBorders : "")} key={rowIndex}>
                    {
                        row.map((cell, cellIndex) => {
                            return <Cell 
                                        click={() => this.props.cellClicked(rowIndex, cellIndex)} 
                                        alive={cell}
                                        key={cellIndex}>
                                    </Cell>
                        })
                    }
                </div>
            )
        });
    }
}

export default Grid;