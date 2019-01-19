import React, { Component } from 'react';
import Cell from '../Cell/cell'
import classes from './grid.module.css';

class Grid extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            drawing: false
        };
    }
        
    mouseDown(){
        this.setState({drawing: true});
    }

    mouseUp(){
        this.setState({drawing: false});
    }

    mouseOver(rowIndex, columnIndex){
        if(this.state.drawing){
            this.props.setCell(rowIndex, columnIndex, 1);
        }
    }

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
                                                mouseDown={() => this.mouseDown()}
                                                mouseUp={() => this.mouseUp()} 
                                                mouseOver={() => this.mouseOver(rowIndex, cellIndex)}
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