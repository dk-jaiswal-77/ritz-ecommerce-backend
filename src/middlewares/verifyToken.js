const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    jwt.verifyToken(req.headers.Authorization.token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
        if(error){
            return res.json({status : false, error});
        }
        req.user = user;
        next();
    })
}

module.exports = verifyToken;