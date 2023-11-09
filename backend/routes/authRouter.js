const express = require('express');

const authRouter = express.Router();

authRouter.get('/user', (req, res) => {
    res.json({ 'name' : 'Pradipto', 'age' : 22 });
});

module.exports = authRouter;