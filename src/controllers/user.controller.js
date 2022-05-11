const express = require("express");

// router 
const router = express.Router();

// express-validator
const {body, validationResult} = require("express-validator");

// importing model
const User = require("../models/user.model");

// CRUD ------------------------------------------------------------------------> 
// post // registering user
router.post(
    "/register", 
    body("name").notEmpty().isString().isLength({min:3, max:25}), 
    body("countryCode").notEmpty(), 
    body("mobile").notEmpty().isNumeric().isLength({min : 10, max : 10}), 
    body("email").notEmpty().isEmail().custom(async (value) => {
        try{
            const user = await User.findOne({email : value}).lean().exec();
            if(user){
                return Promise.reject("user with this email already exists!");
            }
            return true;
        }catch(error){
            console.log(error);
            Promise.reject(error);
        }
    }), 
    body("password").notEmpty().isLength({min:6, max:25}).isStrongPassword(),  
    async(req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                // validation failed // errors
                return res.json({status : false, errors : errors.array()});
            }
            // validation passed // no errors
            await User.create(req.body);
            res.json({status : true});
        }catch(error){
            console.log(error);
            res.json({status : false, error});
        }
    }
);


// exporting router
module.exports = router;