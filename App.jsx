import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;