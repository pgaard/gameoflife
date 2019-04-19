import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Grid from './components/Grid/grid';
import Button from './components/Controls/Button/button';
import * as actionTypes from './store/actions/actionTypes';

class App extends Component {
  intervalId;

  start = (onStart) => {
    setTimeout(this.timer, this.props.stepDelay);
    this.props.onStart();
  }

  stop = (onStop) => {
    clearInterval(this.intervalId);
    this.props.onStop();
  }

  timer = () => {
    this.props.onStep();
    if (this.props.running) {
      setTimeout(this.timer, this.props.stepDelay);
    }
  }

  resize = (event) => {
    let newSize = parseInt(event.target.value);
    this.props.onResize(newSize);
  }

  changeDelay = (event) => {
    let newDelay = parseInt(event.target.value);
    this.props.onChangeDelay(newDelay);
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
            <Button click={this.props.onRegen}>Regen</Button>
            <Button click={this.props.onClear}>Clear</Button>
            <span className="stepCount">Dimensions: {this.props.gridSize} x {this.props.gridSize}</span>
            <div className="slideContainer">
              <input className="slider" type="range" min="10" max="400" onChange={this.resize} value={this.props.gridSize}></input>
            </div>
            <span className="stepCount">Step Delay: {this.props.stepDelay} ms</span>
            <div className="slideContainer">
              <input className="slider" type="range" min="1" max="1000" onChange={this.changeDelay} value={this.props.stepDelay}></input>
            </div>
            <span className="stepCount">Steps: {this.props.stepCount}</span>
            <span className="stepCount">Ms per Step: {this.props.timePerStep}</span>
          </div>
          <div className="content">
            <Grid
              cellClicked={this.props.onToggleCell}
              setCell={this.props.onSetCell}
              cells={this.props.cells}
              gridSize={this.props.gridSize}>
            </Grid>
          </div>
          <div className="rightContent">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cells: state.cells,
    running: state.running,
    stepDelay: state.stepDelay,
    gridSize: state.gridSize,
    stepCount: state.stepCount,
    timePerStep: state.timePerStep
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStart: () => dispatch({ type: actionTypes.START }),
    onStop: () => dispatch({ type: actionTypes.STOP }),
    onStep: () => dispatch({ type: actionTypes.STEP }),
    onRegen: () => dispatch({ type: actionTypes.REGEN }),
    onResize: (newSize => dispatch({ type: actionTypes.RESIZE, size: newSize })),
    onChangeDelay: (newDelay => dispatch({ type: actionTypes.DELAY, delay: newDelay })),
    onClear: () => dispatch({ type: actionTypes.CLEAR }),
    onToggleCell: (row, column) => dispatch({ type: actionTypes.TOGGLE, row, column }),
    onSetCell: (row, column, active) => dispatch({ type: actionTypes.SET, row, column, active })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

