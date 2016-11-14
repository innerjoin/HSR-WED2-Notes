var express = require("express");
var app = express();
var csrf = require('csurf');
var bodyParser = require("body-parser");
var validator = require('express-validator');
var session = require('express-session');
var NedbStore = require('nedb-session-store')(session);
var hbs = require('express-hbs');
var hbsHelpers = require('./views/helpers/helpers');
var moment = require('moment');

const port = 3000;

app.use(session({ secret: 'casduichasidbnuwezrfinasdcvjkadfhsuilfuzihfioda', resave: false, saveUninitialized: true }));
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(csrf({ cookie: false }));
app.use(function(req, res, next) { 
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use(validator({
    customValidators: {
        isInRange: function(value, start, end){
            if(value >= start && value <= end){
                return true;
            }
            return false;
        },
        isValidDate: function(value){
            console.log(value);
            var date = moment(value, 'YYYY-MM-DD');
            if(date.toDate() >= new Date()){
                return true;
            }
            return false;
        }
    }
}));

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