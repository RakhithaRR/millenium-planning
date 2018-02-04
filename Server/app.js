const express = require('express');
const firebaseCon = require('./database/database');

const port = process.env.PORT || 3000;
const app = express();



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});