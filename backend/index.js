const express = require('express');
const mongoose = require('mongoose'); 
const authRouter = require('./routes/authRouter');

// Init
const PORT = 3000;
const app = express();
const dbUrl = "";

// Connections
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(dbUrl).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log(e);
});

// Middleware
app.use(authRouter);

// GET response
app.get('/', (req, res) => {
    res.json({ 'msg' : 'Hello World!' });
});
