import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid/grid';
import Button from './components/Controls/Button/button';

class App extends Component {
  constructor(props){
    super(props);

    const gridSize = 40;
    this.state = {
      gridSize: gridSize,
      cells: this.genBlank(gridSize),
      stepCount: 0,
      timePerStep: 0,
      startStep: 0
    };
  }

  genBlank(gridSize){
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


  genRandom(gridSize){
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

  cellClickedHandler = (row, column) => {
    console.log("clicked cell " + row + " " + column);
    this.toggleCell(row, column);
  }

  numberOfNeighbors(cells, row, column, gridSize) {
    var number = 0;
   
    for(var r = row - 1 ; r <= row + 1 ; r++){
      for(var c = column - 1; c <= column + 1; c++){
        const wrapRow = r < 0 ? gridSize - 1 : r > gridSize - 1 ? 0 : r;
        const wrapColumn = c < 0 ? gridSize - 1 : c > gridSize - 1 ? 0 : c;
        if(row === wrapRow && column === wrapColumn) {
          continue;
        }

        if(cells[wrapRow][wrapColumn]){
          number++;
          if(number > 3){
            return number;
          }
        }
      }
    }

    return number;
  }

  newCellValue(cells, row, column, gridSize){
    var number = this.numberOfNeighbors(cells, row, column, gridSize);

    if (number === 3){
      return true;
    }
    
    return (number === 2 && cells[row][column]);
  }

  copyCells(newSize, oldSize) {
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

  toggleCell(row, column){
    const gridSize = this.state.gridSize;
    const cells = this.copyCells(gridSize);
    cells[row][column] = cells[row][column] ? 0 : 1;
   
    this.setState({
      cells : cells
    });
  }

  step = () => {
    const gridSize = this.state.gridSize;
    const stepCount = this.state.stepCount + 1;
    const cells = this.genBlank(gridSize);

    for(var i=0; i<gridSize; i++){
      for(var j=0; j<gridSize; j++){
        cells[i][j] = this.newCellValue(this.state.cells, i, j, gridSize);
      }
    }

    this.setState({
      cells : cells,
      stepCount: stepCount 
    });
  }

  start = () => {
    const intervalId = setInterval(this.timer, 10);
    const startTime = new Date().getTime();
    const startStep = this.state.stepCount;
    this.setState({ 
      intervalId: intervalId,
      startTime: startTime,
      startStep: startStep
    });
  }

  stop = () => {
    const stopTime = new Date().getTime();
    const timePerStep = Math.floor((stopTime - this.state.startTime)/(this.state.stepCount - this.state.startStep));
    this.setState({timePerStep: timePerStep});
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    this.step();
  }

  regen = () => {
    const cells = this.genRandom(this.state.gridSize);
    this.setState({
      cells: cells,
      stepCount: 0
    });
  }

  resize = (event) => {
    let newSize = event.target.value;
    const newCells = this.copyCells(newSize, this.state.gridSize);
    this.setState({
      gridSize: newSize,
      cells: newCells
    });
  }

  clear = () => {
    const gridSize = this.state.gridSize;
    const cells =  this.genBlank(gridSize);
    this.setState({
      gridSize: gridSize,
      cells: cells,
      stepCount: 0
    });
  }

  render() {
    return (
      <div className="App">
        <header>test</header>
        <div className="body">
          <div className="leftControls">
            <Button click={this.start}>Start</Button>
            <Button click={this.stop}>Stop</Button>
            <Button click={this.regen}>Regen</Button>
            <Button click={this.clear}>Clear</Button>
            <input type="number" onChange={this.resize} value={this.state.gridSize}></input>
            <span className="stepCount">Steps: {this.state.stepCount}</span>
            <span className="stepCount">ms per Step: {this.state.timePerStep}</span>
          </div>
          <div className="content">
            <Grid
              cellClicked={this.cellClickedHandler} 
              cells={this.state.cells} 
              gridSize={this.state.gridSize}>
            </Grid>
          </div>
          <div className="rightContent">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
