const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, project, assignedTo } = req.body;
    
    const task = new Task({ title, project, assignedTo });
    await task.save();
    
    return res.status(201).send({ task });
  } catch(err) {
    return res.status(400).send({ error: 'Error creating new task.' });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.find({ project: projectId });
    
    return res.status(200).send({ tasks });
  } catch(err) {
    return res.status(400).send({ error: 'Error loading tasks.' });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, completed } = req.body;
    
    const task = await Task.findByIdAndUpdate(taskId, { title, completed }, { new: true });
    
    return res.status(200).send({ task });
  } catch(err) {
    return res.status(400).send({ error: 'Error updating task.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    await Task.findByIdAndDelete(taskId);
    
    return res.status(200).send({ message: 'Task successfully removed!' });
  } catch(err) {
    return res.status(400).send({ error: 'Error deleting task.' });
  }
};

module.exports = { createTask, getTasksByProject, updateTask, deleteTask };
