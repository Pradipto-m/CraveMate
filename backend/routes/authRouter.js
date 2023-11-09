const express = require('express');

const authRouter = express.Router();

authRouter.post('/api/user/signup', (req, res) => {
    const {username, email, password} = req.body;
});

// authRouter.get('/api/user', (req, res) => {
//     res.json({ 'name' : 'Pradipto', 'age' : 22 });
// });

module.exports = authRouter;
