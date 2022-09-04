const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post Schema
const postSchema = new Schema({
    content: {type: String, required: true},
    replies: [replySchema],
}, {timestamps: true});

// Reply Schema
const replySchema = new Schema ({
    content: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);