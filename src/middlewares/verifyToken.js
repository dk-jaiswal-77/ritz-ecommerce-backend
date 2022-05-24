const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){

    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
        if(error){
            return res.json({status : false, error});
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;