var orm = require("../config/orm.js");

//select, create, and update burgers in db
let burger_model = 
{
    selectAll: function(cb) 
    {
        orm.selectAll("burgers", function(res) 
        {
            cb(res);
        });
    },
    createOne: function(cols, vals, cb) 
    {
        orm.createOne("burgers", cols, vals, function(res) 
        {
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) 
    {
        orm.updateOne("burgers", objColVals, condition, function(res) 
        {
            cb(res);
        });
    }
}

module.exports = burger_model;