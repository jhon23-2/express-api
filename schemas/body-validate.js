const z = require('zod')

const schema = z.object({
    title: z.string({
        invalid_type_error: 'Title must be a string value',
        required_error: 'Title is required'
    }).trim().min(1,'Title is required'),
    description: z.string({
        required_error: 'description is required'
    }).trim().min(1,'Description is required'),
    status: z.enum(['pending', 'finished']).optional(),
    finishDate: z.string({
        required_error: 'Finish date is required.'
    }).regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Finish date must be in format YYYY-MM-DD'
    )
})

const validateBody = (body) => {
    return schema.safeParse(body);
}

const validateBodyPatch = (body) => {
    return schema.partial().safeParse(body)
}

module.exports = {
    validateBody,
    validateBodyPatch
}