var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var hbs = require('express-hbs');
var hbsHelpers = require('./views/helpers/helpers');

const port = 3000;
const hostname = '127.0.0.1';

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers/routes'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});