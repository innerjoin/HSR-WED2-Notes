var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var NedbStore = require('nedb-session-store')(session);
var hbs = require('express-hbs');
var hbsHelpers = require('./views/helpers/helpers');

const port = 3000;

app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true }));

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        secret: 'tomorrowlandi',
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000   // 1 year
        },
        store: new NedbStore({
            filename: 'data/session.db'
        })
    })
);

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers/routes'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});