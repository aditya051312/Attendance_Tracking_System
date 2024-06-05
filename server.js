const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Here, you would typically check the email and password against your user database.
  // For simplicity, let's assume any non-empty email and password will be considered valid.
  if (email && password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
