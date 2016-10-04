var express = require("express");
var app = express();

const port = 3000;
const hostname = '127.0.0.1';

app.listen(port, hostname, () => {
    console.log(`Server running @ http://${hostname}:${port}`);
});