import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';

const App = () => (
  <Router>
    <Route path="/login" component={Login} />
    <Redirect to="/login" />
  </Router>
);

export default App;