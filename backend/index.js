const express = require('express');

console.log('Hello World');

const PORT = 3000;
const app = express();

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({ 'name' : 'Pradipto', 'age' : 22});
});
