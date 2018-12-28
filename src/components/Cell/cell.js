import React from 'react';
import classes from './cell.module.css';

const Cell = (props) => {
 return <div className={props.alive ? classes.CellActive : classes.CellInactive}></div>
}
        


export default Cell;