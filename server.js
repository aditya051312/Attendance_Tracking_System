const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Add your authentication logic here
  // For now, let's just send a success response
  res.json({ success: true, message: 'Logged in successfully' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
