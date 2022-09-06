const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Signup Page
router.get('/signup', (req, res) => {
    res.send('This is the signup page!');
});

module.exports = router;