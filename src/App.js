import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Grid from './components/Grid/grid';
import Button from './components/Controls/Button/button';
import * as actions from './store/actions/actionCreators';

class App extends Component {
  intervalId;

  start = (onStart) => {
    setTimeout(this.timer, this.state.stepDelay);
    onStart();
  }

  stop = (onStop) => {
    clearInterval(this.intervalId);    
    onStop();
  }

  timer = () => {
    this.step();
    this.props.onStep();
    if(this.props.running){
      setTimeout(this.timer, this.props.stepDelay);
    }
  }

  

  render() {
    return (
      <div className="App">
        <header></header>
        <div className="body">
          <div className="leftControls">
            <span>React Game of Life</span>
            <Button click={this.start(this.props.onStart)}>Start</Button>
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

const mapStateToProps = state => {
  return {
      cells: state.cells,
      running: state.running,

  };
};

const mapDispatchToProps = dispatch => {
  return {
      onStart: () => dispatch( actions.start ),
      onStop: () => dispatch( actions.stop ),
      onStep: () => dispatch( actions.step )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );

