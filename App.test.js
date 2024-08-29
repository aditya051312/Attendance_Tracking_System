import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders login page and submits form', async () => {
  const { getByLabelText, getByText } = render(<App />);
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const submitButton = getByText('Login');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);

  await waitFor(() => getByText('Welcome to the Dashboard'));
});