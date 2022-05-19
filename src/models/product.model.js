const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    description : {type : String, required : true},
    brand : {type : String, required : true},
    category : {type : String, required : true, default : "clothing"},
    for : {type : String, required : true},
    type : {type : String, required : true},
    price : [{type : Number, required : true}], 
    numeric_size : [{type : Number, required : false}], 
    standard_size : [{type : String, required : true}], 
    colour : [{type : String, required : true}], 
    material : {type : String, required : true}, 
    rating_count : {type : Number, required : false, default : 0}, 
    rating : {type : Number, required : false, default : 0}, 
    discount : {type : Number, required : true}, 
    seller : {type : String, required : true}, 
    occasion : {type : String, required : true}, 
    availability : {type : Boolean, required : false, default : true}, 
    images : {type : Map, of : Array}
    /* 
    images : {
        red : [], 
        green : []
    } 
    */
}, {versionKey : false, timestamps : true});

module.exports = mongoose.model("product", productSchema);