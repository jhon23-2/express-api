class CustomError extends Error {
	constructor(message, code) {
		super(message)
		this.code = code
	}
}

const getCustomError = (message, code) => {
	return new CustomError(message, code);
}

module.exports = {
	CustomError,
	getCustomError
}