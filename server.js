const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Here you should implement your user authentication logic
  // For now, let's assume that if the email and password are not empty, the authentication is successful
  if (email && password) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
