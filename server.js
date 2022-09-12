// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postsRouter = require('./controllers/posts');
const usersRouter = require('./controllers/users');
const expressSession = require('express-session');
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
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Session middleware
app.use(expressSession({
    secret: 'safae3@#$%ssda',
    resave: false,
    saveUninitialized: false
}));

// Authorization middleware
const User = require('./models/user');

app.use((req, res, next) => {
    if(req.session.userId) {
        User.findById(req.session.userId, (err, user) => {
            req.user = user;
            res.locals.user = {
                username: user.username,
                _id: user._id
            };
            next();
        });
    } else {
        res.locals.user = null;
        res.user = null;
        next();
    }
});

function isAuthenticated(req, res, next) {
    if(!req.user) return res.redirect('/login');
    next();
};

// Homepage route
app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.use(usersRouter);
app.use('/posts', isAuthenticated, postsRouter);

// Tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});