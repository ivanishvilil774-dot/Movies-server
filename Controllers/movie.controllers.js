const path = require("path")
const readFile = require("../Utils/readfile")
const writeFile = require("../Utils/writefile")
const { read } = require("fs")

// use file path instead of importing JSON directly
const DB_PATH = path.join(__dirname, "../Data/data.json")

const getMovies = async (req, res) => {
    try{
        // pass the path string to readFile so fs.readFile works correctly
        const data = await readFile(DB_PATH)
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

const getMovieById = async (req, res) => {
    try{
        const id = req.params.id
        const data = await readFile(DB_PATH)
        const movieId = data.find(movie => movie.id === id)

        if(!movieId){
            return res.status(404).json({message: "Movie not found"})
        }

        res.status(200).json(movieId)
    }catch(e){
        res.status(500).json({message: e.message})
    }
}


const addMovie = async (req, res ) => {
    try{
        const newMovie = req.body

        // create date automatically
        newMovie.createdAt = new Date().toISOString().split("T")[0]

        const data = await readFile(DB_PATH)

        if(data.find(movie => movie.id === newMovie.id)){
            return res.status(400).json({message: "Movie with this ID already exists"})
        }

        if(!newMovie.image || newMovie.image.length === 0){
            return res.status(400).json({message: "Image URL cannot be empty"})
        }

        data.push(newMovie)

        await writeFile(DB_PATH, data)

        res.status(201).json({
            message: "Movie added successfully",
            movie: newMovie
        })

    }catch(e){
        res.status(500).json({message: e.message})
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        const data = await readFile(DB_PATH)

        const movieIndex = data.findIndex(movie => movie.id === id)

        if(movieIndex === -1){
            return res.status(404).json({message: "Movie not found"})
        }

        // Prevent ID update
        if(updatedData.id && updatedData.id !== id){
            return res.status(400).json({message: "ID cannot be updated"})
        }

        // Update movie
        data[movieIndex] = {
            ...data[movieIndex], // take old data 
            ...updatedData  // override with new data  
        }

        await writeFile(DB_PATH, data)

        res.status(200).json({
            message: "Movie updated successfully",
            movie: data[movieIndex]
        })

    } catch(e){
        res.status(500).json({message: e.message})
    }
}

const deleteMovie = async (req, res) => {
    try{
        const id = req.params.id
        const data = await readFile(DB_PATH)
        const movieIndex = data.findIndex(movie => movie.id === id)

        if (movieIndex === -1) {
            return res.status(404).json({ message: "Movie not found" })
        }

        // remove the movie and write updated data
        data.splice(movieIndex, 1) /// remove the movie at the found index
        await writeFile(DB_PATH, data) 
        res.status(200).json({ message: "Movie deleted successfully" })
    }catch(e){
        res.status(500).json({message: e.message})
    }
}

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}