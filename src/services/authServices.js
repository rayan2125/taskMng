const User = require ("../models/authModels.js");
const { comparePassword, generatedHashPassword } =require( "../utility/hashPassword.js");
const jwt = require ("jsonwebtoken");
require("dotenv").config();
let secret ="sjjsjsjsjsj";
 const signupService = async (data) => {
  let payload = data?.body;
  let {name, email, password } = payload;

  try {
    
    if (!name || !email || !password) {
      return {
        success: false,
        status: 400,
        message: "all feilds are required. !!!",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        status: 400,
        message: "Password must be at least 6 characters long. !!!",
      };
    }

   
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        status: 409,
        message: "This email already exists. Please try another email. !!!",
      };
    }

   
    let hashPassword = await generatedHashPassword(password, 10);
    payload.password = hashPassword;

   
    const result = await User.create(payload);
    
   
    const { password: _, ...userData } = result.toJSON();

    return {
      success: true,
      status: 201,
      message: "User registered successfully. !!!",
      data: userData,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};

 const signinService = async (data) => {
  const { email, password } = data?.body;

  try {
    if (!email || !password) {
      return {
        success: false,
        status: 400,
        message: "Email and password are required. !!!",
      };
    }

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return {
        success: false,
        status: 404,
        message: "User not found. !!!",
      };
    }

    let isMatch = await comparePassword(password, existingUser.password);

    if (!isMatch) {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials. !!!",
      };
    }

    let token = jwt.sign(
      { userId: existingUser.id },
     secret, 
      { expiresIn: "24h" }
    );

    return {
      success: true,
      status: 200,
      message: "Login successful. !!!",
      token,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};


module.exports = {
  signinService,
  signupService,
};

