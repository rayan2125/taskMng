
const { createTaskService, deleteTaskService, getAllTaskService, getTaskByIdService, updateTaskService } = require ("../services/taskServices.js");

 const  createTaskController = async(req,res)=>{
    try {
        const result = await createTaskService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}
 const  getAllTaskController = async(req,res)=>{
    try {
        const result = await getAllTaskService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}

 const  getTaskByIdController = async(req,res)=>{
    try {
        const result = await getTaskByIdService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}
 const  updateTaskController = async(req,res)=>{
    try {
        const result = await updateTaskService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}

 const  delteTaskController = async(req,res)=>{
    try {
        const result = await deleteTaskService(req);
        return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json(error);  
    }
}

module.exports={
  createTaskController,
  getAllTaskController,
  getTaskByIdController,
  updateTaskController,
  delteTaskController
}