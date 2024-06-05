const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Implement authentication logic
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on port 3000'));
