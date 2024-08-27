const express = require('express');
const router = express.Router();

router.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Here we would typically check the credentials against a database
  // For simplicity, we're just going to accept any credentials
  res.sendStatus(200);
});

module.exports = router;