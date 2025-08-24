const express = require ("express");
const { singin, singup } = require ("../../controllers/authControllers.js");

const authRouter = express.Router();
authRouter.post("/register",singup);
authRouter.post("/login",singin);

module.exports = authRouter;;