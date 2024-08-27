import React from 'react';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      if (response.data.success) {
        this.props.history.push('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginPage;
