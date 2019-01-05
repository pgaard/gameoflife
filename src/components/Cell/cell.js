import React from 'react';
import classes from './cell.module.css';

const Cell = React.memo((props) => 
    <div onClick={props.click} 
        className={props.alive ? classes.CellActive : classes.CellInactive}>
    </div>)

export default Cell;