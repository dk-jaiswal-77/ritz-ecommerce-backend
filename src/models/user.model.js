const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

const userSchema = new mongoose.Schema({
    name : {type : String, required : true}, 
    countryCode : {type : String, required : true}, 
    mobile : {type : Number, required : true}, 
    email : {type : String, required : true}, 
    password : {type : String, required : true}, 
}, {versionKey : false, timestamps : true});

userSchema.pre("save", async function (next){
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        console.log(error);
        res.json({status : false, error});
    }
});

module.exports = mongoose.model("user", userSchema);