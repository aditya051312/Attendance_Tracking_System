const { render, screen, fireEvent } = require('@testing-library/react');
const LoginPage = require('./LoginPage');

test('renders login page', () => {
  render(<LoginPage />);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('submits form with email and password', () => {
  render(<LoginPage />);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  fireEvent.change(emailField, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordField, { target: { value: 'password' } });
  fireEvent.click(loginButton);
  // Expect a POST request to /api/login with the entered email and password
});
