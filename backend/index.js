// Imports
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const dburl = require('./.env');

// Init
const PORT = 3000;
const app = express();

// Connections
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(dburl).then(() => {
    console.log("Database Connection Successful");
}).catch((e) => {
    console.log(e);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);

// GET request
app.get('/', (req, res) => {
    res.json({ msg : 'Hello World!' });
});
