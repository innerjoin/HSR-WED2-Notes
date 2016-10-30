var hbs = require('express-hbs');

hbs.registerHelper('loop', function(n, importance,_id, block) {
    const importanceTypes = ["", "Very Low", "Low", "Medium", "High", "Immediate"];
    var temp = '';
    for(var i = n; i >= 1; --i)
    {
        var importanceType = ""+importanceTypes[i];
        temp += block.fn({index:i, importanceType:importanceType, id:_id});
        if(i == importance)
            temp = temp.replace(''+i+'" />', ''+i+'" checked/>');
    }
    return temp;
});

module.exports = hbs;