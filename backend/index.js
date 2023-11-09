const express = require('express');
const authRouter = require('./routes/authRouter');

const PORT = 3000;
const app = express();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(authRouter);

app.get('/', (req, res) => {
    res.json({ 'msg' : 'Hello World!' });
});
