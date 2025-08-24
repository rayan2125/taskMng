const express = require ("express");
const authRouter = require ("./authApi.js");
const taskRouter = require ("./taskApi.js");
const { authChecker } = require ("../../middlewire/authMiddlewire.js");
// import { authChecker } = require "../../middlewire/authMiddlewire.js";

const routers = express.Router();

routers.use("/users",authRouter);
routers.use(authChecker,taskRouter);



module.exports = routers;
