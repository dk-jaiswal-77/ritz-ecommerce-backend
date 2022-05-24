const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, required : true},
    productId : {type : mongoose.Schema.Types.ObjectId, required : true},
    availability : {type : Boolean, required : false, default : true},
    brand : {type : String, required : true}, 
    colour : {type : String, required : true}, 
    description : {type : String, required : true},
    image : {type : String, required : true},
    seller : {type : String, required : true},
    standard_size : {type : String, required : true},
    quantity : {type : Number, required : true},
    price : {type : Number, required : true}
}, {versionKey:false, timestamps:true});

module.exports = mongoose.model("cart", cartSchema);