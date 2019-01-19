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
      startStep: 0,
      stepDelay: 10,
      running: false
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

  toggleCellHandler = (row, column) => {
    this.setCellHandler(row, column, this.state.cells[row][column] ? 0 : 1);
  }

  setCellHandler = (row, column, active) => {
    if(this.state.cells[row][column] === active){
      return;
    }

    const gridSize = this.state.gridSize;
    const cells = this.copyCells(gridSize);
    cells[row][column] = active;

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

    const timePerStep = this.getTimePerStep();

    this.setState({
      cells : cells,
      stepCount: stepCount,
      timePerStep: timePerStep
    });
  }

  start = () => {
    setTimeout(this.timer, this.state.stepDelay);
    const startTime = new Date().getTime();
    const startStep = this.state.stepCount;
    this.setState({ 
      running: true,
      startTime: startTime,
      startStep: startStep
    });
  }

  getTimePerStep = () => {
    if(this.state.stepCount === this.state.startStep){
      return 0;
    }
    const stopTime = new Date().getTime();
    return Math.floor((stopTime - this.state.startTime)/(this.state.stepCount - this.state.startStep));
  }

  stop = () => {
    const timePerStep = this.getTimePerStep();
    
    clearInterval(this.state.intervalId);    

    this.setState({
      timePerStep: timePerStep,
      running: false
    });
  }

  timer = () => {
    this.step();

    if(this.state.running){
      setTimeout(this.timer, this.state.stepDelay);
    }
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

  changeDelay = (event) => {
    let newDelay = event.target.value;    
    this.setState({
      stepDelay: newDelay
    });
  }

  render() {
    return (
      <div className="App">
        <header></header>
        <div className="body">
          <div className="leftControls">
            <span>React Game of Life</span>
            <Button click={this.start}>Start</Button>
            <Button click={this.stop}>Stop</Button>
            <Button click={this.regen}>Regen</Button>
            <Button click={this.clear}>Clear</Button>            
            <span className="stepCount">Dimensions: {this.state.gridSize} x {this.state.gridSize}</span>
            <div className="slideContainer">
              <input className="slider" type="range" min="10" max="400" onChange={this.resize} value={this.state.gridSize}></input>
            </div>              
            <span className="stepCount">Step Delay: {this.state.stepDelay} ms</span>
            <div className="slideContainer">
              <input className="slider" type="range" min="1" max="1000" onChange={this.changeDelay} value={this.state.stepDelay}></input>
            </div>            
            <span className="stepCount">Steps: {this.state.stepCount}</span>
            <span className="stepCount">Ms per Step: {this.state.timePerStep}</span>
          </div>
          <div className="content">
            <Grid
              cellClicked={this.toggleCellHandler} 
              setCell={this.setCellHandler}
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
