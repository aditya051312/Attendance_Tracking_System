import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('Test LoginPage', () => {
  it('renders login form', () => {
    const { getByLabelText } = render(<LoginPage />);
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('submits form', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText } = render(<LoginPage onSubmit={handleSubmit} />);
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(getByText(/login/i));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
