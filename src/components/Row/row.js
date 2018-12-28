import React from 'react';
import Cell from '../Cell/cell'

const row = (props) => {
    return props.row.map((cell, index) => {
        return <Cell alive={cell} key={index}></Cell>
    })
}

export default row;