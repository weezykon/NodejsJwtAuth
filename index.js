const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// routes
const authRoute = require('./routes/auth');
const homeRoute = require('./routes/home');

dotenv.config();

// connection
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to DB Successfully')
);

// Middleware
app.use(express.json());

// Middlewares
app.use('/api/user', authRoute);
app.use('/api', homeRoute);

// Listen to server
app.listen(8000, () => console.log('Server is Good'))