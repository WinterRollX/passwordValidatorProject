import React from 'react';
import './App.css';
//import { PasswordInput } from './components/passwordInput';
import { DuckTester } from './components/duckTester';

function App() {
  window.document.title = 'Password Validator Hook';
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Hello Winterroll!</h1>
        </div>
        {/* <div>
          <PasswordInput title='Please enter your password'/>
        </div> */}
        <div>
          <DuckTester duckType='normal duck' />
        </div>
      </header>
    </div>
  );
}



export default App;
