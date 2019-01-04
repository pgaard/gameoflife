import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid/grid';

class App extends Component {
  constructor(props){
    super(props);

    const gridSize = 40;
    this.state = {
      gridSize: gridSize,
      cells: this.genBlank(gridSize),
      stepCount: 0
    };
  }

  genBlank(gridSize){
    const cells = [];
    for(var i=0; i<gridSize; i++){
      const row = [];
      for(var j=0; j<gridSize; j++){
        row.push(0);
      }
      cells.push(row);
    }
    return cells;
  }


  genRandom(gridSize){
    const cells = [];
    for(var i=0; i<gridSize; i++){
      const row = [];
      for(var j=0; j<gridSize; j++){
        row.push(Math.random() > .5 ? 1 : 0);
      }
      cells.push(row);
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
        }
      }
    }

    return number;
  }

  newCellValue(cells, row, column, gridSize){
    var number = this.numberOfNeighbors(cells, row, column, gridSize);

    if(cells[row][column]){
      return (number === 2 || number === 3);
    }

    return (number === 3);
  }

  copyCells(newSize, oldSize) {
    if(!oldSize){
      oldSize = newSize;
    }
    const cells = [];
    for(var i=0; i<newSize; i++){
      cells[i] = [];
      for(var j=0; j<newSize; j++){
        let val = (i < this.state.cells.length && j < this.state.cells[i].length) ? this.state.cells[i][j] : 0;
        cells[i].push(val);
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
    const cells = this.copyCells(gridSize);

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
    var intervalId = setInterval(this.timer, 500);
    this.setState({ intervalId: intervalId});
  }

  stop = () => {
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
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.regen}>Regen</button>
        <button onClick={this.clear}>Clear</button>
        <input type="number" onChange={this.resize} value={this.state.gridSize}></input>
        <span className="stepCount">Steps: {this.state.stepCount}</span>
        <div className="TheGrid">
          <Grid
            cellClicked={this.cellClickedHandler} 
            cells={this.state.cells} 
            gridSize={this.state.gridSize}>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
