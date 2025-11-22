const express = require('express');
const cors = require('cors');

// Create an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Allows our frontend to talk to this backend
app.use(express.json()); // Allows server to read JSON data

// A simple test route to check if server is running
app.get('/', (req, res) => {
  res.send('Hello! The backend server is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
