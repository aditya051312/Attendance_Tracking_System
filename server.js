const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Validate the email and password
  // Authenticate the user
  // If successful, return a 200 status code
  // If failed, return a 401 status code
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});