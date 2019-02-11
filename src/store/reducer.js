import * as actionTypes from './actions/actionTypes';
import { updateObject } from './utility.js';

const initialState = {
    gridSize: 40,
    cells: genBlank(40),
    stepCount: 0,
    timePerStep: 0,
    startStep: 0,
    stepDelay: 10,
    running: false
};

const genBlank = (gridSize) => {
    if(gridSize < 1){
      gridSize = 1;
    }
    const cells = new Array(gridSize);
    for(var i=0; i<gridSize; i++){
      const row = new Array(gridSize);
      for(var j=0; j<gridSize; j++){
        row[j] = 0;
      }
      cells[i] = row;
    }
    return cells;
}

const genRandom = (gridSize) => {
    const cells = new Array(gridSize);
    for(var i=0; i<gridSize; i++){
      const row = new Array(gridSize);
      for(var j=0; j<gridSize; j++){
        row[j] = Math.random() > .5 ? 1 : 0;
      }
      cells[i] = row;
    }
    return cells;
}

const numberOfNeighbors = (cells, row, column, gridSize) => {
    var number = 0;
   
    for(var r = row - 1 ; r <= row + 1 ; r++){
      for(var c = column - 1; c <= column + 1; c++){
        const wrapRow = r < 0 ? gridSize - 1 : r > gridSize - 1 ? 0 : r;
        const wrapColumn = c < 0 ? gridSize - 1 : c > gridSize - 1 ? 0 : c;
        if(row === wrapRow && column === wrapColumn) {
          continue;
        }

        if(cells[wrapRow][wrapColumn]) {
          number++;
          if(number > 3){
            return number;
          }
        }
      }
    }

    return number;
}

const newCellValue = (cells, row, column, gridSize) => {
    var number = this.numberOfNeighbors(cells, row, column, gridSize);

    if (number === 3){
      return true;
    }
    
    return (number === 2 && cells[row][column]);
  }

const copyCells = (newSize, oldSize) => {
    if(!oldSize){
      oldSize = newSize;
    }
    const cells = this.genBlank(newSize);
    for(var i=0; i<newSize; i++){
      cells[i] = new Array(newSize);
      for(var j=0; j<newSize; j++){
        let val = (i < this.state.cells.length && j < this.state.cells[i].length) ? this.state.cells[i][j] : 0;
        cells[i][j] = val;
      }
    }
    return cells;
}

const toggleCellHandler = (row, column) => {
    this.setCellHandler(row, column, this.state.cells[row][column] ? 0 : 1);
}

const setCellHandler = (row, column, active) => {
    if(this.state.cells[row][column] === active){
      return;
    }
}

const getTimePerStep = (state) => {
  if(state.stepCount === state.startStep){
    return 0;
  }
  const stopTime = new Date().getTime();
  return Math.floor((stopTime - state.startTime)/(state.stepCount - state.startStep));
}

const step = (state) => {

    const gridSize = state.gridSize;
    const stepCount = state.stepCount + 1;
    const cells = genBlank(gridSize);

    for(var i=0; i<gridSize; i++){
      for(var j=0; j<gridSize; j++){
        cells[i][j] = newCellValue(state.cells, i, j, gridSize);
      }
    }

    const timePerStep = getTimePerStep(state);

    return {
        cells : cells,
        stepCount: stepCount,
        timePerStep: timePerStep
    };
}

const stop = (state) => {
  const timePerStep = getTimePerStep(state);
  return {
    timePerStep: timePerStep,
    running: false
  };
}

const regen = (state) => {
  const cells = this.genRandom(state.gridSize);
  return{
    cells: cells,
    stepCount: 0
  };
}

const resize = (event) => {
  let newSize = event.target.value;
  const newCells = this.copyCells(newSize, this.state.gridSize);
  return{
    gridSize: newSize,
    cells: newCells
  };
}

const clear = (state) => {
  const gridSize = state.gridSize;
  const cells =  this.genBlank(gridSize);
  return{
    gridSize: gridSize,
    cells: cells,
    stepCount: 0
  };
}

const changeDelay = (event) => {
  let newDelay = event.target.value;    
  return{
    stepDelay: newDelay
  };
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START : 
            return updateObject( 
                state, 
                { 
                    running: true,
                    startTime: new Date().getTime(),
                    startStep: state.stepCount  
                });

        case actionTypes.STEP : 
            return updateObject(
                state,
                step(state)
            ); 

        case actionTypes.STOP :
            return updateObject(
                state,
                stop(state)
            );
    }
    return state;
};

export default reducer;