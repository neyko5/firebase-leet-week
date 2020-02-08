import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";

function App() {

  React.useEffect(() => {
    firebase.firestore().doc("/cool/12").set({id: 12, kolega: "3dasdas"});
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
