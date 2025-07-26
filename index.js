const express = require('express')
const taskRoutes = require('./router/taskRouter')
const handlerError = require('./middleware/error-handler')
const handlerNotFound = require('./middleware/not-found')


const app = express()
const PORT = process.env.PORT || 3000

// middleware to parse JSON
app.use(express.json())

// path and handler for to map the routes and controllers
app.use('/api/v1/task',taskRoutes);

//middleware handlers
app.use(handlerError)
app.use(handlerNotFound)

app.listen(PORT, ()=> {
  console.log(`Listen on por ${PORT} => http://localhost:${PORT}`)
})
