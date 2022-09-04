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

module.exports = router;