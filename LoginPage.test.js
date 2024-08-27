import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

jest.mock('axios');

test('renders login page', () => {
  const { getByPlaceholderText } = render(<LoginPage />, { wrapper: MemoryRouter });
  expect(getByPlaceholderText('Email')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
});

test('handles login', async () => {
  axios.post.mockResolvedValue({ status: 200 });
  const { getByPlaceholderText, getByText } = render(<LoginPage />, { wrapper: MemoryRouter });
  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(getByText('Login'));
  await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/login', { email: 'test@example.com', password: 'password' }));
});