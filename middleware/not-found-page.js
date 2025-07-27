const notFoundMiddleware = (request, response) => {
	return response.status(404)
		.json({
			message: `Route ${request.originalUrl} not found`
		})
}

module.exports = notFoundMiddleware