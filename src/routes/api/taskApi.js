const express = require ("express");
const { createTaskController, delteTaskController, getAllTaskController, getTaskByIdController, updateTaskController } = require ("../../controllers/taskControllers.js");


const taskRouter = express.Router();

taskRouter.route("/tasks").get(getAllTaskController).post(createTaskController);
taskRouter.route("/tasks/:id").get(getTaskByIdController).put(updateTaskController).delete(delteTaskController);

module.exports = taskRouter;