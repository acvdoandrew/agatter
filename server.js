// Dependencies
const express = require('express');

// Initialize the app
const app = express();

// Configure settings
require('dotenv').config();
const PORT = process.env.PORT

// Connect to MongoDB

// Mount middleware

// Body parser middleware

// Session middleware

// Homepage route
app.get('/', (req, res) => {
    res.send('Homepage!');
});

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});