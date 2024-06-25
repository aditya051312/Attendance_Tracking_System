import React, { useState } from 'react';
import axios from 'axios';

function LoginPage({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={email} onChange={handleChange} required />
      <input type="password" name="password" value={password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
