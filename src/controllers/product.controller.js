const express = require("express");
const { append } = require("express/lib/response");

// router
const router = express.Router();

// importing model
const Product = require("../models/product.model");

// CRUD ------------------------------------------------------->
// store products
router.post("/", async (req, res) => {
    try{
        await Product.create(req.body);
        res.json({status : true, msg : "successfully saved product."});
    }catch(error){
        console.log(error);
        res.json({status : false, error});
    }
})
// get products
router.post("/getProducts", async (req, res) => {
    try{
        // modifying for price filter
        if(req.body.min_price != undefined && req.body.max_price != undefined)
        {
            req.body.min_price = {$gte:req.body.min_price};  
            req.body.max_price = {$lte:req.body.max_price};  
        }
        else if(req.body.min_price != undefined)
        {
            req.body.min_price = {$gte:req.body.min_price}; 
        }

        // modifying for rating filter
        if(req.body.rating != undefined)
        {
            req.body.rating = {$gte:req.body.rating};
        }

        console.log(req.body);
        const products = await Product.find(req.body).lean().exec();
        res.json({status : true, products});
    }catch(error)
    {
        console.log(error);
        res.json({status : false, error});
    }
})




// exporting router
module.exports = router;