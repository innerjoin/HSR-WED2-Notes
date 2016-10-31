var hbs = require('express-hbs');

function setImportance(n, importance,_id, block, param, endTag) {
    const importanceTypes = ["Very Low", "Low", "Medium", "High", "Immediate"];
    var temp = '';
    for(var i = n - 1; i >= 0; --i)
    {
        var importanceType = "" + importanceTypes[i];
        temp += block.fn({index:i, importanceType:importanceType, id:_id});
        if(i == importance)
            temp = temp.replace(''+i+'" '+endTag+'', ''+i+'" '+param+ ''+endTag);
    }
    return temp;
}

hbs.registerHelper('set_checked', function(n, importance,_id, block) {
    return setImportance(n, importance,_id, block, 'checked', '/>');
});

hbs.registerHelper('set_selected', function(n, importance,_id, block) {
    return setImportance(n, importance,_id, block, 'selected', '>');
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a === b) {
        return opts.fn(this);
    }
    return opts.inverse(this);
});

module.exports = hbs;