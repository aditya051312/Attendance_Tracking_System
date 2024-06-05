import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { loginUser } from './api';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('./api');

test('renders login page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('logs in successfully', async () => {
  const user = { email: 'test@test.com', password: 'password' };
  loginUser.mockResolvedValue(user);

  const { getByLabelText, getByText } = render(
    <Router>
      <App />
    </Router>
  );

  fireEvent.change(getByLabelText(/email/i), {
    target: { value: user.email },
  });

  fireEvent.change(getByLabelText(/password/i), {
    target: { value: user.password },
  });

  fireEvent.click(getByText(/Login/i));

  await waitFor(() => getByText(/Welcome to the Dashboard!/i));
});