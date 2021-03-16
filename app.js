const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Hello world!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});