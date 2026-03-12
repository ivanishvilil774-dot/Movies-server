const express = require("express")

const { getMovies, getMovieById, addMovie, updateMovie, deleteMovie } = require("../Controllers/movie.controllers")
const moviesRouter = express.Router()

moviesRouter.route("/:id")
    .get(getMovieById)
    .put(updateMovie)
    .delete(deleteMovie)

moviesRouter.route("/")
    .get(getMovies)
    .post(addMovie)



module.exports = moviesRouter