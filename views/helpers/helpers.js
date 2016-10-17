var hbs = require('express-hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

hbs.registerHelper('loop', function(n, importance,_id, block) {
    const importanceTypes = ["", "Low", "Medium", "High", "Immediate"];
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

module.exports = hbs;