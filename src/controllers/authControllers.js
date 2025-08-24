
const {signinService,signupService} = require ("../services/authServices.js");


 const  singup = async(req,res)=>{
    try {
        const result = await signupService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}
 const  singin = async(req,res)=>{
    try {
        const result = await signinService(req);
       
        return res.status(result.status).json(result);
    } catch (error) {
      
      return res.status(500).json(error);  
    }
}

module.exports={
  singup,singin
}