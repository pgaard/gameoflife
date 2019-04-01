import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Grid from './components/Grid/grid';
import Button from './components/Controls/Button/button';
import * as actions from './store/actions/actionCreators';

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
    if(this.props.running){
      setTimeout(this.timer, this.props.stepDelay);
    }
  }

  resize = (event) => {
    let newSize = event.target.value;
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
            <Button click={this.clear}>Clear</Button>            
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
              cellClicked={this.toggleCellHandler} 
              setCell={this.setCellHandler}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onStart: () => dispatch( actions.start ),
      onStop: () => dispatch( actions.stop ),
      onStep: () => dispatch( actions.step ),
      onRegen: () => dispatch( actions.regen ),
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );

