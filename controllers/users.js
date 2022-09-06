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

// Login Page
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {error: null});
});

// Login Create
router.post('/login', (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(!foundUser) {
            return res.render('users/login.ejs', {error: 'Incorrect Credentials!'});
        } 
        const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!isMatch) {
            return res.render('users/login.ejs', {error: 'Incorrect Credentials'});
        }
        req.session.userId = foundUser._id;
        res.redirect('/posts');
    });
});

// Log Out
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;