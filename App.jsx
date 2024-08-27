import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Router>
    );
  }
}

export default App;
