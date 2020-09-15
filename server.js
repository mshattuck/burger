//dependencies

const express = require("express");
const PORT = process.env.PORT || 8080;
const exphbs = require("express-handlebars");
const app = express();
const routes = require("./controllers/burgers_controller.js");


//parse as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//use handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

//use route to controller
app.use(routes);

//public assests (if I had implimented css)
//app.use(express.static("public"));

//connect
app.listen(PORT, function()
{
    console.log("Server listening on http://localhost:" + PORT);
});