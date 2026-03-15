const path = require("path")
const readFile = require("../Utils/readfile")
const writeFile = require("../Utils/writefile")

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

        if(
            !newMovie.id ||
            !newMovie.name ||
            !newMovie.category ||
            !newMovie.description ||
            !newMovie.image ||
            newMovie.rating === undefined
        ){
            return res.status(400).json({message:"All required fields must be provided"})
        }

        if(
            typeof newMovie.name !== "string" ||
            typeof newMovie.category !== "string" ||
            typeof newMovie.description !== "string" ||
            typeof newMovie.image !== "string"
        ){
            return res.status(400).json({message:"Name, category, description, and image must be strings"})
        }

        if(newMovie.name.trim() === "" || newMovie.category.trim() === "" || newMovie.description.trim() === "" || newMovie.image.trim() === ""){
            return res.status(400).json({message:"Name, category, description, and image cannot be empty"})
        }

        if(typeof newMovie.rating !== "number"){
            return res.status(400).json({message:"Rating must be a number"})
        }

        // create date automatically
        newMovie.createdAt = new Date().toISOString().split("T")[0]

        const data = await readFile(DB_PATH)

        if(data.find(movie => movie.id === newMovie.id)){
            return res.status(400).json({message:"Movie with this ID already exists"})
        }

        data.push(newMovie)

        await writeFile(DB_PATH,data)

        res.status(201).json({
            message:"Movie added successfully",
            movie:newMovie
        })

    }catch(e){
        res.status(500).json({message:e.message})
    }
}


const updateMovie = async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        const data = await readFile(DB_PATH)

        const movieIndex = data.findIndex(movie => movie.id === id)

        if (movieIndex === -1) {
            return res.status(404).json({ message: "Movie not found" })
        }

        if (updatedData.id !== undefined && updatedData.id !== id) {
            return res.status(400).json({ message: "ID cannot be updated" })
        }

        if (updatedData.rating !== undefined && typeof updatedData.rating !== "number") {
            return res.status(400).json({ message: "Rating must be a number" })
        }

        const stringFields = ["name", "category", "description", "image", "createdAt"]

        for (const field of stringFields) {
            if (updatedData[field] !== undefined) {
                if (typeof updatedData[field] !== "string" || updatedData[field].trim() === "") {
                    return res.status(400).json({
                        message: `${field} must be a non-empty string`
                    })
                }
            }
        }

        // if noting was Updated, return an error
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" })
        }

        data[movieIndex] = {
            ...data[movieIndex],
            ...updatedData
        }

        await writeFile(DB_PATH, data)

        res.status(200).json({
            message: "Movie updated successfully",
            movie: data[movieIndex]
        })
    } catch (e) {
        res.status(500).json({ message: e.message })
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
        res.status(200).json({
            message: "Movie deleted successfully",
            })
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