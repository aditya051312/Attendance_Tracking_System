import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form', () => {
  const { getByLabelText } = render(<LoginPage />);
  
  const emailField = getByLabelText(/email/i);
  expect(emailField).toBeInTheDocument();
  
  const passwordField = getByLabelText(/password/i);
  expect(passwordField).toBeInTheDocument();
});

test('submits form', () => {
  const { getByLabelText, getByText } = render(<LoginPage />);
  
  const emailField = getByLabelText(/email/i);
  fireEvent.change(emailField, { target: { value: 'test@example.com' } });
  
  const passwordField = getByLabelText(/password/i);
  fireEvent.change(passwordField, { target: { value: 'password' } });
  
  const submitButton = getByText(/login/i);
  fireEvent.click(submitButton);
  
  // Here, you would typically check if the form submission function has been called with the correct values.
});