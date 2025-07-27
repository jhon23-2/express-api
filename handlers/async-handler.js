const asyncWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next) // ← this line needs to be inside an async function!
		} catch (error) {
			next(error)
		}
	}
}

module.exports = asyncWrapper