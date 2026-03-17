const path = require("path")
const readFile = require("../Utils/readfile")
const writeFile = require("../Utils/writefile")

const DB_PATH = path.join(__dirname, "../Data/data.json")

const getMovies = async (req, res) => {
    try{
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

        const movie = data.find(movie => movie.id === id)

        if(!movie){
            return res.status(404).json({message: "Movie not found"})
        }

        res.status(200).json(movie)

    }catch(e){
        res.status(500).json({message: e.message})
    }
}

const addMovie = async (req, res ) => {
    try{

        const newMovie = req.body

        if(
            !newMovie.id ||
            !newMovie.title ||
            !newMovie.slug ||
            !newMovie.genres ||
            !newMovie.description ||
            !newMovie.posterUrl ||
            !newMovie.releaseDate ||
            newMovie.userRating === undefined
        ){
            return res.status(400).json({message:"Required fields missing"})
        }

        if(
            typeof newMovie.title !== "string" ||
            typeof newMovie.slug !== "string" ||
            typeof newMovie.description !== "string" ||
            typeof newMovie.posterUrl !== "string"
        ){
            return res.status(400).json({message:"Invalid field types"})
        }

        if(!Array.isArray(newMovie.genres)){
            return res.status(400).json({message:"Genres must be an array"})
        }

        if(typeof newMovie.userRating !== "number"){
            return res.status(400).json({message:"User rating must be a number"})
        }

        const data = await readFile(DB_PATH)

        if(data.find(movie => movie.id === newMovie.id)){
            return res.status(400).json({message:"Movie with this ID already exists"})
        }

        newMovie.createdAt = new Date().toISOString()
        newMovie.updatedAt = new Date().toISOString()

        data.push(newMovie)

        await writeFile(DB_PATH, data)

        res.status(201).json({
            message:"Movie added successfully",
            movie:newMovie
        })

    }catch(e){
        res.status(500).json({message:e.message})
    }
}

const updateMovie = async (req, res) => {

    try{

        const id = req.params.id
        const updatedData = req.body
        const data = await readFile(DB_PATH)

        const movieIndex = data.findIndex(movie => movie.id === id)

        if(movieIndex === -1){
            return res.status(404).json({message:"Movie not found"})
        }

        if(updatedData.id !== undefined && updatedData.id !== id){
            return res.status(400).json({message:"ID cannot be updated"})
        }

        if(updatedData.userRating !== undefined && typeof updatedData.userRating !== "number"){
            return res.status(400).json({message:"User rating must be a number"})
        }

        if(updatedData.genres !== undefined && !Array.isArray(updatedData.genres)){
            return res.status(400).json({message:"Genres must be an array"})
        }

        const stringFields = [
            "title",
            "slug",
            "description",
            "posterUrl",
            "bannerUrl",
            "director",
            "language",
            "country",
            "ageRating",
            "status",
            "trailerUrl"
        ]

        for(const field of stringFields){

            if(updatedData[field] !== undefined){

                if(typeof updatedData[field] !== "string" || updatedData[field].trim() === ""){
                    return res.status(400).json({
                        message:`${field} must be a non-empty string`
                    })
                }

            }

        }

        if(Object.keys(updatedData).length === 0){
            return res.status(400).json({message:"No data provided for update"})
        }

        updatedData.updatedAt = new Date().toISOString()

        data[movieIndex] = {
            ...data[movieIndex],
            ...updatedData
        }

        await writeFile(DB_PATH,data)

        res.status(200).json({
            message:"Movie updated successfully",
            movie:data[movieIndex]
        })

    }catch(e){
        res.status(500).json({message:e.message})
    }
}

const deleteMovie = async (req, res) => {

    try{

        const id = req.params.id
        const data = await readFile(DB_PATH)

        const movieIndex = data.findIndex(movie => movie.id === id)

        if(movieIndex === -1){
            return res.status(404).json({message:"Movie not found"})
        }

        data.splice(movieIndex,1)

        await writeFile(DB_PATH,data)

        res.status(200).json({
            message:"Movie deleted successfully"
        })

    }catch(e){
        res.status(500).json({message:e.message})
    }

}

module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
}