const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createTask = async (title, description, userId) => {
  console.log('Creating task in service:', { title, description, userId });
  try {
    const task = await prisma.task.create({
      data: { title, description, userId }
    });
    console.log('Task created in database:', task);
    return task;
  } catch (error) {
    console.error('Database error creating task:', error);
    throw error;
  }
};

const getUserTasks = async (userId, search = '') => {
  const whereClause = {
    userId
  };
  
  if (search) {
    whereClause.title = {
      contains: search
    };
  }
  
  return await prisma.task.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });
};

const updateTask = async (taskId, userId, data) => {
  return await prisma.task.updateMany({
    where: { id: taskId, userId },
    data
  });
};

const deleteTask = async (taskId, userId) => {
  return await prisma.task.deleteMany({
    where: { id: taskId, userId }
  });
};

const getTaskById = async (taskId, userId) => {
  return await prisma.task.findFirst({
    where: { id: taskId, userId }
  });
};

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
  getTaskById
};