

````md
# Movies Server API

A simple REST API built with **Node.js** and **Express** for managing a movies collection.  
This project uses a local **JSON file** as the database instead of MongoDB or SQL.

## Project Theme

**Movies Collection**

This API allows users to:

- add a new movie
- get all movies
- get a single movie by ID
- update a movie
- delete a movie

## Technologies Used

- Node.js
- Express.js
- JSON file as database
- File system (`fs`) for reading and writing data

## Project Structure

```bash
Movies-server/
│
├── Controllers/
│   └── movie.controllers.js
│
├── Data/
│   └── data.json
│
├── Routers/
│   └── movies.router.js
│
├── Utils/
│   ├── readfile.js
│   └── writefile.js
│
├── server.js
├── package.json
└── README.md
````

## Features

* Express server running on a configurable port
* JSON file database stored inside the project
* Utility functions for reading and writing data
* Full CRUD operations
* Basic validation
* Error handling with proper HTTP status codes

## Movie Object Structure

Each movie contains fields like:

```json
{
  "id": "1",
  "name": "Inception",
  "category": "Sci-Fi",
  "description": "A mind-bending thriller about dreams within dreams.",
  "image": "https://example.com/inception.jpg",
  "rating": 9,
  "createdAt": "2026-03-15"
}
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ivanishvilil774-dot/Movies-server.git
```

Move into the project folder:

```bash
cd Movies-server
```

Install dependencies:

```bash
npm install
```

## Running the Server

Start the server with:

```bash
node server.js
```

If you use nodemon:

```bash
nodemon server.js
```

The server runs on:

```bash
http://localhost:3000
```

Or on the port set in your environment variables.

## API Endpoints

### 1. Get All Movies

**GET** `/movies`

Returns all movies from the JSON database.

#### Example Request

```http
GET /movies
```

#### Example Response

```json
[
  {
    "id": "1",
    "name": "Inception",
    "category": "Sci-Fi",
    "description": "A mind-bending thriller about dreams within dreams.",
    "image": "https://example.com/inception.jpg",
    "rating": 9,
    "createdAt": "2026-03-15"
  }
]
```

---

### 2. Get Movie by ID

**GET** `/movies/:id`

Returns a single movie by its ID.

#### Example Request

```http
GET /movies/1
```

#### Success Response

```json
{
  "id": "1",
  "name": "Inception",
  "category": "Sci-Fi",
  "description": "A mind-bending thriller about dreams within dreams.",
  "image": "https://example.com/inception.jpg",
  "rating": 9,
  "createdAt": "2026-03-15"
}
```

#### Error Response

```json
{
  "message": "Movie not found"
}
```

---

### 3. Add New Movie

**POST** `/movies`

Adds a new movie to the JSON database.

#### Example Request Body

```json
{
  "id": "2",
  "name": "Interstellar",
  "category": "Sci-Fi",
  "description": "A journey through space and time to save humanity.",
  "image": "https://example.com/interstellar.jpg",
  "rating": 10
}
```

#### Success Response

```json
{
  "message": "Movie added successfully",
  "movie": {
    "id": "2",
    "name": "Interstellar",
    "category": "Sci-Fi",
    "description": "A journey through space and time to save humanity.",
    "image": "https://example.com/interstellar.jpg",
    "rating": 10,
    "createdAt": "2026-03-15"
  }
}
```

#### Error Responses

```json
{
  "message": "All required fields must be provided"
}
```

```json
{
  "message": "Name, category, description, and image must be strings"
}
```

```json
{
  "message": "Rating must be a number"
}
```

```json
{
  "message": "Movie with this ID already exists"
}
```

---

### 4. Update Movie

**PUT** `/movies/:id`

Updates an existing movie by ID.

#### Example Request

```http
PUT /movies/2
```

#### Example Request Body

```json
{
  "name": "Interstellar Updated",
  "rating": 9
}
```

#### Success Response

```json
{
  "message": "Movie updated successfully",
  "movie": {
    "id": "2",
    "name": "Interstellar Updated",
    "category": "Sci-Fi",
    "description": "A journey through space and time to save humanity.",
    "image": "https://example.com/interstellar.jpg",
    "rating": 9,
    "createdAt": "2026-03-15"
  }
}
```

#### Error Responses

```json
{
  "message": "Movie not found"
}
```

```json
{
  "message": "ID cannot be updated"
}
```

```json
{
  "message": "Rating must be a number"
}
```

```json
{
  "message": "name must be a non-empty string"
}
```

---

### 5. Delete Movie

**DELETE** `/movies/:id`

Deletes a movie by ID.

#### Example Request

```http
DELETE /movies/2
```

#### Success Response

```json
{
  "message": "Movie deleted successfully"
}
```

#### Error Response

```json
{
  "message": "Movie not found"
}
```

## Validation Rules

The API validates the following:

* `id` is required
* `name` is required
* `category` is required
* `description` is required
* `image` is required
* `rating` is required
* `name`, `category`, `description`, and `image` must be strings
* `rating` must be a number
* movie `id` must be unique
* movie `id` cannot be changed during update
* updated string fields must not be empty

## Error Handling

The API handles common errors such as:

* movie not found
* invalid request body
* invalid field types
* duplicate movie ID
* server or file read/write errors

HTTP status codes used:

* `200` — Success
* `201` — Created successfully
* `400` — Bad request
* `404` — Not found
* `500` — Internal server error

## Testing the API

You can test the endpoints using:

* Postman
* Thunder Client
* Insomnia

## Example Base URL

```bash
http://localhost:3000/movies
```

## Future Improvements

Possible improvements for this project:

* add search and filtering
* add sorting by rating or date
* add pagination
* improve validation even more
* add automated tests

## Author

Created by Luka Ivanishvili

