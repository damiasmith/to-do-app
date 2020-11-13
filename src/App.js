import React from 'react';
import './App.css';
import MainContainer from './containers/main-container'
import Nav from './containers/nav'

const App = () => {
  return (
    <div className="App">
     <Nav />
     <MainContainer />
    </div>
  );
}

export default App;
