import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Router>
  );
}

export default App;