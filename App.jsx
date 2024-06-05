import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

// Main component that includes routing logic
function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Router>
  );
}

export default App;
