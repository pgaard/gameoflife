import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid/grid';

class App extends Component {
  constructor(props){
    super(props);

    const gridSize = 25;
    const cells = [];
    for(var i=0; i<gridSize; i++){
      const row = [];
      for(var j=0; j<gridSize; j++){
        row.push(0);
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
        <Grid cells={this.state.cells} gridSize={this.state.gridSize}>
        </Grid>
      </div>
    );
  }
}

export default App;
