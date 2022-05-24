const express = require("express");

// router
const router = express.Router();

// importing model
const Cart = require("../models/cart.model");

// importing middleware
const verifyToken = require("../middlewares/verifyToken");

// CRUD operations-------------------------------------------->
// post // saving product to cart
router.post("/", verifyToken, async (req, res) => {
    try{
        req.body.userId = req.user.userId; // adding userId 
        await Cart.create(req.body);
        const cart = await Cart.find({userId : req.user.userId}).lean().exec();
        res.json({status : true, cart});
    }catch(error){
        console.log(error);
        res.json({status : false, error});
    }
})





// exporting router
module.exports = router;