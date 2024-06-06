const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Here you would typically check the email and password against a database
  // For simplicity, we will just check if they match a certain string
  if (email === 'test@test.com' && password === 'password') {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
