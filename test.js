import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginPage from './LoginPage';

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders login form and handles successful login', async () => {
  const { getByLabelText, getByText } = render(<LoginPage />);
  fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(getByLabelText(/password/i), { target: { value: 'password' } });
  fireEvent.click(getByText(/login/i));
  await waitFor(() => expect(window.location.pathname).toBe('/dashboard'));
});