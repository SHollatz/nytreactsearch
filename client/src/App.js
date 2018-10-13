import React, { Component } from 'react';
import './App.css';
import Search from './pages/Search'
import Results from './pages/Results'
import Saved from './pages/Saved'

class App extends Component {
  
   
  
  render() {
    return (
      <div className="App">
x
          <Search />
          <Results />
          <Saved/>
x
      </div>
    );
  }
}

export default App;