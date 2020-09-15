//dependencies 
const mysql = require("mysql");
let connection;

//for heroku mysql add-on
if (process.env.JAWSDB_URL) 
{
  connection = mysql.createConnection(process.env.JAWSDB_URL); 
} 
else 
{
    connection = mysql.createConnection(
    {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "burgers_db"
    })
};


connection.connect(function(err) 
{
  if (err) 
  {
    console.error("error");
    return;
  }
  console.log("connected");
});

//export connection to orm file
module.exports = connection;