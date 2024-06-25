const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Here, you would typically check the email and password against your database.
  // For simplicity, let's just accept any email and password.
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on port 3000'));