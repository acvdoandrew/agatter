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
    Post.find({}).populate('addedBy').exec((err, posts) => {
        res.render('posts/index.ejs', {posts});
    });
});

// New Route
router.get('/posts/new', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('posts/new.ejs', {posts});
    });
});

// Delete Route
router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        res.redirect('/posts');
    });
});

// Update Route
router.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, (err, oldPost) => {
        res.redirect(`/posts/${req.params.id}`);
    });
});

// Create Route
router.post('/posts', (req, res) => {
    req.body.addedBy = req.user._id;
    Post.create(req.body, (err, createdPost) => {
        res.redirect('/posts');
    });
});

// Edit Route
router.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render('posts/edit.ejs', {foundPost});
    });
});

// Show Route
router.get('/posts/:id', (req, res) => {
    Post.findById((req.params.id), (err, foundPost) => {
        res.render('posts/show.ejs', {foundPost});
    });
});

// Nested Resource Route | Posts and Replies
router.post('/posts/:id/replies', (req, res) => {
    req.body.addedBy = req.user._id;
    Post.findById(req.params.id, (err, foundPost) => {
        foundPost.replies.push(req.body);
        foundPost.save((err, savedPost) => {
            res.redirect(`/posts/${req.params.id}`);
        });
    });
});

module.exports = router;