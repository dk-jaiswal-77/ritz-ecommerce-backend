const express = require("express");

// router 
const router = express.Router();

// express-validator
const {body, validationResult, Result} = require("express-validator");

// bcrypt
const bcrypt = require("bcrypt");

// jsonwebtoken
const jwt = require("jsonwebtoken");

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

// post // login user
router.post("/login", async (req, res) => {
    try{
        // checking email or mobile phone number exists or not
        const user = await User.findOne({$or:[{email : req.body.email}, {mobile : req.body.mobile}]}).lean().exec();

        if(user == null)
        {
            return res.json({status : false, msg : "invlaid email or password!"});
        }

        // email or mobile exists // comparing password 
        const password_matched = await bcrypt.compare(req.body.password, user.password);
        if(!password_matched)
        {
            // password did not match
            return res.json({status : false, msg : "invlaid email or password!"});  
        }

        // password also matched // authentication successful // create token and send as response
        const res_user = {
            userId : user._id, 
            name : user.name,
            countryCode : user.countryCode, 
            mobile : user.mobile, 
            email : user.email,
            userType : user.userType
        }

        const payload  = {
            userId : user._id,
            email : user.email, 
            mobile : user.mobile
        }

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY);
        res.json({status : true, user : res_user, token});

    }catch(error){
        console.log(error);
    }
})


// exporting router
module.exports = router;