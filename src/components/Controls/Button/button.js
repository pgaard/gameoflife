import React from 'react';
import classes from './button.module.css';

const Button = (props) => {
    return <button className={classes.Button} onClick={props.click}>{props.children}</button>
}

export default Button;