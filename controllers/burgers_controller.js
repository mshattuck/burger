const express = require("express");
const router = express.Router();
const burger_model = require("../models/burgers.js");

//get burgers stored in db
router.get("/", function(req, res)
{
    burger_model.selectAll(function(results)
    {
        const all_burgers =
        {
            burgers: results
        };
        console.log(all_burgers);
        res.render("index", all_burgers);
    });
});

//add burgers to database
router.post("/api/burgers", function(req,res)
{
    burger_model.createOne(
        ["burger_name"],
        [req.body.burger_name],