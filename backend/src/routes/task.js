const express = require('express');
const { getTasks, createNewTask, updateExistingTask, deleteExistingTask, taskValidation } = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', getTasks);
router.post('/', taskValidation, createNewTask);
router.put('/:id', updateExistingTask);
router.delete('/:id', deleteExistingTask);

module.exports = router;