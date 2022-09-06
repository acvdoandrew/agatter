const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Signup Page
router.get('/signup', (req, res) => {
    res.render('users/signup.ejs');
});

// Signup Create
router.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, user) => {
        req.session.userId = user._id;
        res.redirect('/posts');
    });
});

module.exports = router;