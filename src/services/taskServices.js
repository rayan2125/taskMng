const Task  = require ("../models/taskModels.js");
const { Op } = require ("sequelize");


const VALID_STATUSES = ["pending", "in_progress", "done"];
 const createTaskService = async (data) => {
    const { user, body } = data;
  body.user_id = user?.id;
  const { title, status } = body;

  try {
    
    if (!title || !title.trim()) {
      return {
        success: false,
        status: 400,
        message: "Title is required. !!!",
      };
    }

    
    if (status && !VALID_STATUSES.includes(status)) {
      return {
        success: false,
        status: 400,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}. !!!`,
      };
    }

   
    const existingTitle = await Task.findOne({
      where: { title, user_id: user?.id },
    });

    if (existingTitle) {
      return {
        success: false,
        status: 409,
        message: "Task with this title already exists. !!!",
      };
    }

    
    const result = await Task.create(body);
    return {
      success: true,
      status: 201,
      message: "Task created successfully. !!!",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};



 const getAllTaskService = async (data) => {
  const { user, body } = data;

  let { page = 1, limit = 10, search = "", status } = body;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  const offset = (page - 1) * limit;

  try {
   
    const where = { user_id: user.id };

    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    if (status) {
      where.status = status; 
    }

    const { rows: tasks, count: total } = await Task.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,
      status: 200,
      message: "Tasks retrieved successfully. !!!",
      data: {
        tasks,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};



 const getTaskByIdService = async (data) => {
  const { user, params } = data;
  const { id } = params;

  try {
    const result = await Task.findOne({ where: { id, user_id: user?.id } });

    if (!result) {
      return {
        success: false,
        status: 404,
        message: "Task not found. !!!",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Task retrieved successfully. !!!",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};

 const updateTaskService = async (data) => {
  const { user, body, params } = data;
  const { id } = params;
  const { title, status } = body;

  try {
   
    if (title && !title.trim()) {
      return {
        success: false,
        status: 400,
        message: "Title cannot be empty. !!!",
      };
    }


    if (status && !VALID_STATUSES.includes(status)) {
      return {
        success: false,
        status: 400,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}. !!!`,
      };
    }

  
    if (title) {
      const existingTitle = await Task.findOne({
        where: { title, user_id: user.id },
      });

      if (existingTitle && existingTitle.id !== Number(id)) {
        return {
          success: false,
          status: 409,
          message: "Another task with this title already exists. !!!",
        };
      }
    }

 
    const [updated] = await Task.update(body, {
      where: { id, user_id: user.id },
    });

    if (!updated) {
      return {
        success: false,
        status: 404,
        message: "Task not found or not authorized. !!!",
      };
    }

    const updatedTask = await Task.findOne({
      where: { id, user_id: user.id },
    });

    return {
      success: true,
      status: 200,
      message: "Task updated successfully. !!!",
      data: updatedTask,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};

 const deleteTaskService = async (data) => {
  const { user, params } = data;
  const { id } = params;

  try {
    const deleted = await Task.destroy({
      where: { id, user_id: user.id },
    });

    if (!deleted) {
      return {
        success: false,
        status: 404,
        message: "Task not found or not authorized. !!!",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Task deleted successfully. !!!",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message,
    };
  }
};


module.exports={
    createTaskService,
    getAllTaskService,
    getTaskByIdService,
    updateTaskService,
    deleteTaskService
}
