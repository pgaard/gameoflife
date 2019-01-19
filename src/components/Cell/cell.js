import React, {Component} from 'react';
import classes from './cell.module.css';

class Cell extends Component
{
    shouldComponentUpdate(nextProps){
        return nextProps.alive !== this.props.alive;
    }

    render(){
        return(
            <div onClick={this.props.click} 
                onMouseDown={this.props.mouseDown}
                onMouseUp={this.props.mouseUp}
                onMouseOver={this.props.mouseOver}
                className={this.props.alive ? classes.CellActive : classes.CellInactive}>
            </div>
        );
    }
}

export default Cell;