const User = require ("../models/authModels.js");
const jwt = require ("jsonwebtoken");
require("dotenv").config();

 const authChecker = async(req,res,next)=>{
    let secret ="sjjsjsjsjsj";
    let token;
const { authorization } = req.headers;
if (authorization && authorization.startsWith('Bearer ')){
    try {
        token = authorization.split(' ')[1];
        const JWT_SECRET_KEY =secret;
        const { userId } = jwt.verify(token, JWT_SECRET_KEY);
        
        const user = await User.findByPk(userId,{attributes: ["id", "name", "email"],});
        if(!user){
        return res
          .status(401)
          .json({ status: "failed", message: "User not found" });
        }  
        req.user=user?.dataValues;
        next();      
    } catch (error) {
       
        res.status(401).json({ "status": "failed", "message": "Unauthorized User" });
    }
} else {
    res.status(401).json({ "status": "failed", "message": "Unauthorized User, No Token" });
}
}

module.exports={authChecker};