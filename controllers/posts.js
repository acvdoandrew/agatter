// Controller dependencies
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Seed route
router.get('/seed', (req, res) => {
    const data = require('../data.json');

    Post.deleteMany({}, (err, result) => {
        Post.insertMany(data, (err, result) => {
            res.send(data);
        });
    });
});

// INDUCES
// Index Route
router.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('posts/index.ejs', {posts});
    });
});

// New Route
router.get('/posts/new', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('posts/new.ejs', {posts});
    });
});

// Show Route
router.get('/posts/:id', (req, res) => {
    Post.findById((req.params.id), (err, foundPost) => {
        res.render('posts/show.ejs', {foundPost});
    });
});

module.exports = router;