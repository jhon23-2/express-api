const express = require('express');
const router = express.Router();

//import all controller 
const {
    getAllTask,
    deleteTask,
    createTask,
    getTask,
    updateTask
} = require('../controller/task-controller')

// handler router to all controller 

router.route('/')
    .get(getAllTask)
    .post(createTask)

router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask)

module.exports = router