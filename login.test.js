import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';

describe('Login page', () => {
  test('should display a blank login form', async () => {
    const { getByTestId } = render(<Router><Login /></Router>);

    expect(getByTestId('email')).toHaveValue('');
    expect(getByTestId('password')).toHaveValue('');
  });

  test('should allow entering email and password', () => {
    const { getByTestId } = render(<Router><Login /></Router>);
    const email = getByTestId('email');
    const password = getByTestId('password');

    fireEvent.change(email, { target: { value: 'test@test.com' } });
    fireEvent.change(password, { target: { value: 'password' } });

    expect(email).toHaveValue('test@test.com');
    expect(password).toHaveValue('password');
  });

  test('should submit form and redirect to dashboard on successful login', async () => {
    const { getByTestId, getByText } = render(<Router><Login /></Router>);
    const email = getByTestId('email');
    const password = getByTestId('password');
    const submitButton = getByText('Login');

    fireEvent.change(email, { target: { value: 'test@test.com' } });
    fireEvent.change(password, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('Dashboard')).toBeInTheDocument());
  });
});