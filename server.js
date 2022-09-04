// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./controllers/posts');
// Initialize the app
const app = express();

// Configure settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect(DATABASE_URI);
// MongoDB connected and error event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log(`MongoDB Error: ${err.message}`));

// Mount middleware

// Body parser middleware

// Session middleware

// Homepage route
app.get('/', (req, res) => {
    res.send('Homepage!');
});

app.use(postsRouter);

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});