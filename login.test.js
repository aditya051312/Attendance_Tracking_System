const fetch = require('node-fetch');

test('login with valid credentials', async () => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
  });

  expect(response.status).toBe(200);
});

test('login with invalid credentials', async () => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: '', password: '' }),
  });

  expect(response.status).toBe(401);
});