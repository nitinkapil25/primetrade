import {
  createTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById
} from '../services/taskService.js';

export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    return next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await getAllTasks(req.user);

    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks
    });
  } catch (error) {
    return next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id, req.user);

    return res.status(200).json({
      success: true,
      message: 'Task fetched successfully',
      data: task
    });
  } catch (error) {
    return next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await updateTaskById(req.params.id, req.body, req.user);

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    return next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteTaskById(req.params.id, req.user);

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    return next(error);
  }
};
