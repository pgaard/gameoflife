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
                className={this.props.alive ? classes.CellActive : classes.CellInactive}>
            </div>
        );
    }
}

export default Cell;