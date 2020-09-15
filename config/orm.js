//adapted from 13-MVC/01-Activities/16-MvcExample/config/orm.js

var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(input) {
    var array = [];

    for (var i = 0; i < input; i++) {
        array.push("?");
    }

    return array.toString()
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in obj) {

        var value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);

        }
            // translate array of strings to a single comma-separated string
            return arr.toString();
    }
}

// Object for all our SQL statement functions.
var orm = {

    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, results) {
            if (err) {
                console.log(err);
                throw err
            }
            cb(results);
        });
    },

    createOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") VALUES (";
        queryString += printQuestionMarks(vals.length) + ") ";
        console.log("insertOne queryString: ", queryString);

        connection.query(queryString, vals, function(err, results) {
            if (err) {
                console.log("insertOne error", err)
                throw err;
            }
            cb(results);
        })

    },

    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table + " SET ";
        queryString += objToSql(objColVals) + " WHERE " + condition;
        console.log("updateOne queryString", queryString);

        connection.query(queryString, function(err, results) {
            if (err) 
            {
                console.log("updateOne error", err);
                throw err
            }

            cb(results);
        })
    }
}

// Export the orm object for the model (cat.js).
module.exports = orm;