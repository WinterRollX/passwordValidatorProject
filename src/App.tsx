import React from 'react';
import './App.css';
import { Layout } from './components/layout';
import { PasswordInput } from './components/passwordInput';
import { DuckTester } from './components/duckTester';
import { ObserverTester } from './components/observerTester';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  window.document.title = 'Password Validator Hook';
  return (
    <Router>
    <Layout>
      <div className="App">
            <Switch>
              <Route exact path="/">
                <div >Home</div>
              </Route>
              <Route exact path="/home">
                <div >Home</div>
              </Route>
              <Route path="/passwordDemo">
                <PasswordInput title='Please enter your password' />
              </Route>
              <Route path="/duckTester">
                <DuckTester duckType='normal duck' />
              </Route>
              <Route path="/observerTester">
                <ObserverTester />
              </Route>
              <Route path="*">
                <div>404 not fount component</div>
              </Route>
            </Switch>
    </div>
    </Layout>
    </Router>
  );
}



export default App;
