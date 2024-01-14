require("dotenv").config();
const jwt = require("jsonwebtoken");

const vendorAuthentication = async (req, res, next) => {
    if(req.headers.authorization) {
        let payLoad = await jwt.verify(req.headers.authorization, process.env.SECRET); 
        if(!payLoad.isVendor) return res.status(401).json({status : "Failed", message : "Unauthorized"})
    } else {
        return res.status(401).json({status : "Failed", message : "Unauthorized"})
    }
    next();
}
const userAuthentication = async (req, res, next) => {
    if(req.headers.authorization) {
        let payLoad = await jwt.verify(req.headers.authorization, process.env.SECRET); 
        if(!payLoad.isUser) return res.status(401).json({status : "Failed", message : "Unauthorized"})
    } else {
        return res.status(401).json({status : "Failed", message : "Unauthorized"})
    }
    next();
}

module.exports = {vendorAuthentication , userAuthentication};