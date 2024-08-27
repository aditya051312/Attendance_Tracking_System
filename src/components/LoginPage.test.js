import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form', () => {
  const { getByPlaceholderText } = render(<LoginPage />);
  const emailInput = getByPlaceholderText(/Email/i);
  const passwordInput = getByPlaceholderText(/Password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});