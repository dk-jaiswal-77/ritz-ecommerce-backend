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
        if(req.body.min_price && req.body.max_price)
        {
            let min_price = req.body.min_price;
            let max_price = req.body.max_price;

            req.body.price = {$in:[min_price, max_price]};  
            delete req.body["min_price"];
            delete req.body["max_price"];
        }
        else if(req.body.min_price)
        {
            let min_price = req.body.min_price;

            req.body.price = {$gte:min_price};
            delete req.body["min_price"];
        }
        
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