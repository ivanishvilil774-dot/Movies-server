# Movie API

A simple REST API built with **Node.js** and **Express** for managing a movie database stored in a local JSON file.

## Features

- Get all movies
- Get a movie by ID
- Add a new movie
- Update an existing movie
- Delete a movie
- Basic validation for required fields and data types
- Data stored in a local `data.json` file

## Project Structure

```bash
project-folder/
│
├── Controllers/
│   └── movieController.js
│
├── Data/
│   └── data.json
│
├── Utils/
│   ├── readfile.js
│   └── writefile.js
│
├── Routes/
│   └── movieRoutes.js
│
├── app.js
├── package.json
└── README.md
Movie Data Structure

Each movie object contains fields like:

{
  "id": "1",
  "title": "Interstellar",
  "slug": "interstellar",
  "genres": ["Sci-Fi", "Adventure", "Drama"],
  "description": "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
  "posterUrl": "https://example.com/poster.jpg",
  "bannerUrl": "https://example.com/banner.jpg",
  "releaseDate": "2014-11-07",
  "duration": 169,
  "director": "Christopher Nolan",
  "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  "language": "English",
  "country": "USA",
  "imdbRating": 8.7,
  "userRating": 10,
  "ageRating": "PG-13",
  "status": "released",
  "featured": true,
  "trailerUrl": "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  "createdAt": "2026-03-17T12:00:00Z",
  "updatedAt": "2026-03-17T12:00:00Z"
}
Installation

Clone the repository:

git clone <your-repo-link>

Navigate into the project folder:

cd <project-folder>

Install dependencies:

npm install

Start the server:

npm start

Or if you use nodemon:

npm run dev
API Endpoints
1. Get all movies

GET /movies

Returns all movies in the database.

Response
[
  {
    "id": "1",
    "title": "Interstellar"
  }
]
2. Get movie by ID

GET /movies/:id

Returns a single movie by its ID.

Example
GET /movies/1
Response
{
  "id": "1",
  "title": "Interstellar"
}
3. Add a new movie

POST /movies

Adds a new movie to the database.

Required fields

id

title

slug

genres

description

posterUrl

releaseDate

userRating

Example request body
{
  "id": "6",
  "title": "Titanic",
  "slug": "titanic",
  "genres": ["Romance", "Drama"],
  "description": "A love story aboard the Titanic.",
  "posterUrl": "https://example.com/titanic.jpg",
  "releaseDate": "1997-12-19",
  "userRating": 8
}
Success response
{
  "message": "Movie added successfully",
  "movie": {
    "id": "6",
    "title": "Titanic"
  }
}
4. Update a movie

PUT /movies/:id

Updates an existing movie.

Example
PUT /movies/1
Example request body
{
  "title": "Interstellar Updated",
  "userRating": 9
}
Success response
{
  "message": "Movie updated successfully",
  "movie": {
    "id": "1",
    "title": "Interstellar Updated"
  }
}
5. Delete a movie

DELETE /movies/:id

Deletes a movie by ID.

Example
DELETE /movies/1
Success response
{
  "message": "Movie deleted successfully"
}
Validation Rules

The API includes basic validation:

Required fields must be present when adding a movie

genres must be an array

userRating must be a number

String fields must be non-empty strings

Movie id cannot be updated

Duplicate movie IDs are not allowed

Error Handling

Possible error responses include:

400 Bad Request
{
  "message": "Required fields missing"
}
{
  "message": "Invalid field types"
}
{
  "message": "Genres must be an array"
}
404 Not Found
{
  "message": "Movie not found"
}
500 Internal Server Error
{
  "message": "Something went wrong"
}
Technologies Used

Node.js

Express.js

File System (fs)

JSON for data storage

Notes

This project uses a local JSON file as a database

It is good for learning CRUD operations

For production-level apps, a real database like MongoDB or PostgreSQL is recommended

Future Improvements

Add search by title or genre

Add pagination

Add sorting by rating or release date

Add authentication

Use MongoDB instead of a JSON file

Add better validation with Joi or Express Validator

Author

Created by Luka Ivanishvili
