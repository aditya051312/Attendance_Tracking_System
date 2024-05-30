const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Here we should check the email and password in the database
  // But for simplicity, let's just check if they are not empty
  if (email && password) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});