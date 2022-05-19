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
        if(req.body.price)
        {
            req.body.price = {$in:req.body.price};  
        }
        if(req.body.material)
        {
            req.body.material = {$or:req.body.material};
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