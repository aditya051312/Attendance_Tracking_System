#!/bin/bash

# Start the server
node index.js &

# Start the client
cd client && npm start
