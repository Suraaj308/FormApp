// Import express
const express = require('express');

// Create an app
const app = express();

// Define a port
const PORT = 3000;

// Simple route
app.get('/', (req, res) => {
  res.send('Hello, Express is running! 🚀');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
