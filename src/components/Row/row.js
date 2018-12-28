import React from 'react';
import Cell from '../Cell/cell'

const row = (props) => {
    return props.row.map((cell) => {
        return <Cell alive={cell}></Cell>
    })
}

export default row;