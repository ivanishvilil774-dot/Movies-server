const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 3000
const moviesRouter = require("./Routers/movies.router")
const app = express()
const errorHandler = require("errorhandler")

app.use(express.json())
app.use("/movies", moviesRouter)
app.use(errorHandler) // Add error handling middleware

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}).on('error', err => {
    console.error('Failed to start server:', err.message)
    process.exit(1)
})
