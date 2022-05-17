const express = require("express");
const { connect } = require("mongoose");

// express app / server
const app = express();

// connect to db!
const connect_to_db = require("./configs/db");
// connect_to_db();

// dotenv
require("dotenv").config();

// port
const PORT = process.env.PORT || 5505;

// cors 
const cors = require("cors");
app.use(cors());

// path
const path = require("path");

// global middlewares
app.use(express.json());
// app.use(express.static(path.join(__dirname, "/uploads")));

// importing controllers
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

// directing request to controller
app.use("/user", userController);
app.use("/products", productController);






// listening to port
app.listen(PORT, () => {
    connect_to_db();
    console.log("listening to port", PORT);
});