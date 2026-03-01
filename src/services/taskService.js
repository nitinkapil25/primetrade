import { prisma } from '../config/prismaClient.js';

const ALLOWED_STATUSES = ['PENDING', 'COMPLETED'];

const buildError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const getTaskOrThrow = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id }
  });

  if (!task) {
    throw buildError('Task not found', 404);
  }

  return task;
};

const ensureTaskAccess = (task, user) => {
  if (user.role === 'ADMIN') {
    return;
  }

  if (task.userId !== user.id) {
    throw buildError('Forbidden: you cannot access this task', 403);
  }
};

export const createTask = async (payload, user) => {
  const { title, description, status } = payload;

  if (!title || !title.trim()) {
    throw buildError('title is required', 400);
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    throw buildError('status must be PENDING or COMPLETED', 400);
  }

  const createdTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      status: status || 'PENDING',
      userId: user.id
    }
  });

  return createdTask;
};

export const getAllTasks = async (user) => {
  const where = user.role === 'ADMIN' ? {} : { userId: user.id };

  const tasks = await prisma.task.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return tasks;
};

export const getTaskById = async (id, user) => {
  const task = await getTaskOrThrow(id);
  ensureTaskAccess(task, user);
  return task;
};

export const updateTaskById = async (id, payload, user) => {
  const task = await getTaskOrThrow(id);
  ensureTaskAccess(task, user);

  const updateData = {};

  if (payload.title !== undefined) {
    if (!payload.title || !payload.title.trim()) {
      throw buildError('title cannot be empty', 400);
    }
    updateData.title = payload.title.trim();
  }

  if (payload.description !== undefined) {
    updateData.description = payload.description?.trim() || null;
  }

  if (payload.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(payload.status)) {
      throw buildError('status must be PENDING or COMPLETED', 400);
    }
    updateData.status = payload.status;
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: updateData
  });

  return updatedTask;
};

export const deleteTaskById = async (id, user) => {
  const task = await getTaskOrThrow(id);
  ensureTaskAccess(task, user);

  await prisma.task.delete({
    where: { id }
  });
};
