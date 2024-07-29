import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

// Test to check if the login page is rendered correctly
test('renders login page', () => {
  const { getByLabelText } = render(<LoginPage />);
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

// Test to check if the form submits correctly
test('submits form', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<LoginPage onSubmit={handleSubmit} />);
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(getByText(/login/i));
  expect(handleSubmit).toHaveBeenCalled();
});

// Test to check if the form does not submit when the email or password field is empty
test('does not submit form when email or password field is empty', () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<LoginPage onSubmit={handleSubmit} />);
  const emailInput = getByLabelText(/email/i);
  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: '' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(getByText(/login/i));
  expect(handleSubmit).not.toHaveBeenCalled();
});
