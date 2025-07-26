const { CustomError } = require('../handlers/custom-error')

const errorHandlerMiddleware = (error, request, response, next) => {
	if (error instanceof CustomError) {
		return response.status(error.code).json({ message: error.message })
	}

	return response.status(500).json({
		message: 'Server Error something has been wrong try again'
	})
}

module.exports = errorHandlerMiddleware