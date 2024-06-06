import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Redirect from='/' to='/login' />
      </Switch>
    </Router>
  );
};

export default App;