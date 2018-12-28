import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid/grid';

class App extends Component {
  constructor(props){
    super(props);

    const gridSize = 20;
    const cells = [];
    for(var i=0; i<gridSize; i++){
      const row = [];
      for(var j=0; j<gridSize; j++){
        row.push(Math.random() > .5 ? 1 : 0);
      }
      cells.push(row);
    }

    this.state = {
      gridSize: gridSize,
      cells: cells
    };
  }

  render() {
    return (
      <div className="App">
        <div className="TheGrid">
          <Grid cells={this.state.cells} gridSize={this.state.gridSize}>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
