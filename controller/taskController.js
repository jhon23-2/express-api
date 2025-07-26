const pool = require('../db')
const { getCustomError } = require('../handlers/custom-error')

// Controller to find all task database
const getAllTask = async (request, response) => {
	const result = await pool.query(
		`SELECT * FROM tasks`
	)

	return response.json({
		amount: result.rowCount,
		tasks: result.rows
	})
}
// Controller to create task database
const createTask = async (request, response, next) => {
	const data = request.body;

	if (!data) {
		return next(getCustomError('ufs bad request, body cannot be empty', 400))
	}

	const { title, description, status, finishDate } = data

	const result = await pool.query(
		`INSERT INTO tasks (title,description,status,finish_date) VALUES ($1,$2,$3,$4) RETURNING *`
		, [title, description, status, finishDate]
	)

	return response.status(201).json({
		message: 'Task created successfully...',
		task: result.rows[0]
	})
};

// Controller to find task database by id
const getTask = async (request, response, next) => {
	const id = request.params.id

	const result = await pool.query(
		`SELECT * FROM tasks WHERE id=$1`
		, [id])

	if (result.rows.length === 0) {
		return next(getCustomError(`Error to get task, id ${id} not found`,404))
	}

	return response.status(200).json({
		task: result.rows[0]
	})
}
// Controller to update tasks
const updateTask = async (request, response, next) => {
	const id = request.params.id
	const { title, description, status, finishDate } = request.body

	const findById = await pool.query(
		`SELECT * FROM tasks WHERE id=$1`
		, [id])

	if (findById.rows.length === 0) {
		return next(getCustomError(`Error to update task, id ${id} not found`, 404))
	}

	const task = findById.rows[0]

	const updateTitle = title || task.title
	const updateDescription = description || task.description
	const updateStatus = status || task.status
	const updateFinishDate = finishDate || task.finish_date


	const updateResult = await pool.query(
		`UPDATE tasks SET title = $1, description = $2, status = $3, finish_date = $4 WHERE id = $5 RETURNING *`,
		[updateTitle, updateDescription, updateStatus, updateFinishDate, id]
	);

	return response.status(201).json({
		message: 'Task update successfully',
		task: updateResult.rows[0]
	})

}
// Controller to delete task
const deleteTask = async (request, response, next) => {
	const id = request.params.id

	const findById = await pool.query(
		`SELECT * FROM tasks WHERE id=$1`
		, [id])

	if (findById.rows.length === 0) {
		return next(getCustomError(`Error to delete task, id ${id} not found`, 404))
	}

	await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

	return response.status(200).json({ message: 'Task deleted successfully' });

}


module.exports = {
	getAllTask,
	createTask,
	getTask,
	updateTask,
	deleteTask
}