import React, { Component } from 'react';
import Cell from '../Cell/cell'
import classes from './grid.module.css';

class Grid extends Component {

    render(){
        const border = this.props.gridSize < 125;
        return (
            <div className={classes.Grid}>
            {
                this.props.cells.map((row, rowIndex) => {
                    return ( 
                        <div className={classes.Row + " " + (border ? classes.RowBorders : "")} key={rowIndex}>
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
                })
            }
            </div>
        );
    }
}

export default Grid;