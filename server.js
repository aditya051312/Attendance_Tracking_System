const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // This is a placeholder for fetching user data from a database
  const user = getUserFromDatabase(email);

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));