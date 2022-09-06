const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reply Schema
const replySchema = new Schema ({
    content: {type: String, required: true},
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

// Post Schema
const postSchema = new Schema({
    content: {type: String, required: true},
    replies: [replySchema],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);