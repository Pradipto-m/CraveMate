// Imports
const express = require('express');
const mongoose = require('mongoose'); 
const authRouter = require('./routes/authRouter');

// Init
const PORT = 3000;
const app = express();
const dbUrl = "mongodb+srv://RedHotChef:redhot123Chef@cluster0.azomhpl.mongodb.net/?retryWrites=true&w=majority";

// Connections
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(dbUrl).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log(e);
});

// Middlewares
app.use(express.json());
app.use(authRouter);

// GET request
app.get('/', (req, res) => {
    res.json({ 'msg' : 'Hello World!' });
});
