const { body, validationResult } = require('express-validator');
const { createTask, getUserTasks, updateTask, deleteTask, getTaskById } = require('../services/taskService');

const taskValidation = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').optional().trim()
];

const getTasks = async (req, res) => {
  try {
    const { search = '' } = req.query;
    const tasks = await getUserTasks(req.user.userId, search);
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching tasks' });
  }
};

const createNewTask = async (req, res) => {
  try {
    console.log('Creating task with data:', req.body);
    console.log('User ID:', req.user.userId);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { title, description } = req.body;
    const task = await createTask(title, description, req.user.userId);
    console.log('Task created:', task);
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ error: 'Server error creating task' });
  }
};

const updateExistingTask = async (req, res) => {
  try {
    console.log('Updating task:', req.params.id, 'with data:', req.body);
    console.log('User ID:', req.user.userId);
    
    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await getTaskById(parseInt(id), req.user.userId);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    await updateTask(parseInt(id), req.user.userId, updateData);
    const updatedTask = await getTaskById(parseInt(id), req.user.userId);
    
    console.log('Task updated:', updatedTask);
    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Task update error:', error);
    res.status(500).json({ error: 'Server error updating task' });
  }
};

const deleteExistingTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await getTaskById(parseInt(id), req.user.userId);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await deleteTask(parseInt(id), req.user.userId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting task' });
  }
};

module.exports = {
  getTasks,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
  taskValidation
};