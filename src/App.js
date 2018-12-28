import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid/grid';

class App extends Component {
  constructor(props){
    super(props);

    const gridSize = 40;
    this.state = {
      gridSize: gridSize,
      cells: this.genRandom(gridSize),
      stepCount: 0
    };
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

  step = () => {
    const gridSize = this.state.gridSize;
    const stepCount = this.state.stepCount + 1;
    const cells = [];
    for(var i=0; i<gridSize; i++){
      cells[i] = [];
      for(var j=0; j<gridSize; j++){
        cells[i].push(this.newCellValue(this.state.cells, i, j, gridSize));
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

  render() {
    return (
      <div className="App">
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.regen}>Regen</button>
        <span className="stepCount">Steps: {this.state.stepCount}</span>
        <div className="TheGrid">
          <Grid cells={this.state.cells} gridSize={this.state.gridSize}>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
