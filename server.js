const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect DB

connectDB();

// // Initialize Middleware
// app.use(express.json({ extended: false }));


// // DB config
// const db = require('./config/keys').mongoURI;

// // Connect to mongoDB through mongoose
// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB Connected!'))
//     .catch(err => console.log(err));

// Passport middlware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port : ${port}`));