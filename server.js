var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var hbs = require('express-hbs');

const port = 3000;
const hostname = '127.0.0.1';
const importanceTypes = ["", "Low", "Medium", "High", "Immediate"];

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers/routes'));

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

hbs.registerHelper('loop', function(n, importance,_id, block) {
    var temp = '';
    for(var i = n; i >= 1; --i)
    {
        var importanceType = ""+importanceTypes[i];
        temp += block.fn({index:i, importanceType:importanceType, id:_id});
        if(i == importance)
            temp = temp.replace(''+i+'" />', ''+i+'" checked/>');
    }
    console.log(temp);
    return temp;
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});