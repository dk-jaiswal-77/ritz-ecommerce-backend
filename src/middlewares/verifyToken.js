const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    
    const token = req.headers.Authorization && req.headers.Authorization.split(" ")[1];

    jwt.verifyToken(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
        if(error){
            return res.json({status : false, error});
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;