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
    const rowStart = row - 1 < 0 ? 0 : row - 1;
    const rowEnd = row + 1 > gridSize - 1 ? gridSize - 1 : row + 1;
    const columnStart = column - 1 < 0 ? 0 : column - 1;
    const columnEnd = column + 1 > gridSize - 1 ? gridSize - 1 : column + 1;

    for(var r=rowStart; r<=rowEnd; r++){
      for(var c=columnStart; c<=columnEnd; c++){
        if(row === r && column === c) {
          continue;
        }

        if(cells[r][c]){
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

  regen = () => {
    this.setState({cells: this.genRandom(this.state.gridSize)});
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.step}>Advance</button>
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
