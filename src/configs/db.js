const mongoose = require("mongoose");

module.exports = async function (){
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("connected to db!");
    }catch(error){
        console.log(error);
    }
}