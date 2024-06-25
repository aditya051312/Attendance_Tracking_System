const express = require('express');
const bodyParser = require('body-parser');
const login = require('./login');

const app = express();

app.use(bodyParser.json());

app.post('/api/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));