const express = require('express')
const taskRoutes = require('./router/task-route')
const handlerNotFoundPage = require('./middleware/not-found-page')



const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 3000

// middleware to parse JSON
app.use(express.json())

// path and handler for to map the routes and controllers
app.use('/api/v1/task',taskRoutes);

//middleware handlers
app.use(handlerNotFoundPage)


app.listen(PORT, ()=> {
  console.log(`Listen on por ${PORT} => http://localhost:${PORT}`)
})
