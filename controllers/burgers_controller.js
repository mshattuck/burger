const express = require("express");
const router = express.Router();

let burger_model = require("../models/burgers.js");

//get burgers stored in db
router.get("/", function(req, res)
{
    burger_model.selectAll(function(results)
    {
        const all_burgers =
        {
            burgers: results
        };
        res.render("index", all_burgers);
    });
});

//add burgers to database
router.post("/api/burgers", function(req,res)
{
    burger_model.createOne(
        ["burger_name"],
        [req.body.burger_name],
        function(result)
        {
            res.json({id: result.insertID});
        });
});

//updates burger if devoured
router.put("/api/burgers/:id", function(req, res)
{
    //gets the id of the burger to update
    let property = "id = " + req.params.id;

    //updates burger
    burger_model.updateOne(
        {devoured: req.body.devoured}, property, function(result)
            {   
                //if nothing in the db updates
                if (result.changedRows === 0){
                    return res.status(404).end();
                } else {
                    res.status(200).end();
            }
        });
});

//export routes
module.exports = router;