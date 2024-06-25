module.exports = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(400).json({ message: 'Invalid email or password' });
  }
};