import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

jest.mock('axios');

test('renders login page', async () => {
  const { getByLabelText, getByText } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  fireEvent.change(getByLabelText(/email/i), {
    target: { value: 'test@test.com' },
  });

  fireEvent.change(getByLabelText(/password/i), {
    target: { value: 'password' },
  });

  axios.post.mockResolvedValueOnce({
    data: { success: True },
  });

  fireEvent.click(getByText(/login/i));

  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  expect(axios.post).toHaveBeenCalledWith('/api/login', {
    email: 'test@test.com',
    password: 'password',
  });
});