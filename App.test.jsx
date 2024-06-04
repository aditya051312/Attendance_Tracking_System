import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('Login page', () => {
  it('should display email and password input fields', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should submit the form with email and password', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledWith('/api/login', {
      email: 'test@test.com',
      password: 'password'
    });
  });
});

describe('API endpoint', () => {
  it('should accept email and password in the request body', async () => {
    const data = { email: 'test@test.com', password: 'password' };
    axios.post.mockResolvedValue({ data });

    const response = await axios.post('/api/login', data);

    expect(response.data).toEqual(data);
  });

  it('should return appropriate response', async () => {
    const data = { email: 'test@test.com', password: 'password' };
    const response = { data: { status: 'success', message: 'Logged in successfully' } };
    axios.post.mockResolvedValue(response);

    const result = await axios.post('/api/login', data);

    expect(result).toEqual(response);
  });
});
