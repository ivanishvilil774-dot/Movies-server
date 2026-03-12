# Movies Collection REST API

## Project Theme
**Movies Collection** – a custom-themed REST API to manage a collection of movies using a JSON file as the database.

---

## Project Overview
This project is a **Node.js + Express REST API** that allows users to **create, read, update, and delete movies**.  
Instead of a traditional database, it uses a **local JSON file** (`data/data.json`) for persistent storage.  
Controllers handle all logic, routes define endpoints, and utilities manage file reading/writing.


---

## API Endpoints

| Method | Endpoint            | Description                          | Request Body (JSON)                                                                 |
|--------|-------------------|--------------------------------------|-----------------------------------------------------------------------------------|
| GET    | `/movies`          | Retrieve all movies                   | N/A                                                                               |
| GET    | `/movies/:id`      | Retrieve a single movie by ID         | N/A                                                                               |
| POST   | `/movies`          | Add a new movie                       | `{ "id": "string", "name": "string", "category": "string", "description": "string", "rating": number, "createdAt": "YYYY-MM-DD" }` |
| PUT    | `/movies/:id`      | Update an existing movie              | Partial or full movie object (ID cannot be updated)                               |
| DELETE | `/movies/:id`      | Delete a movie by ID                  | N/A                                                                               |

---

## Example Requests

**Add a movie (POST /movies)**

```json
{
  "id": "101",
  "name": "Inception",
  "category": "sci-fi",
  "description": "Mind-bending thriller",
  "rating": 9,
  "createdAt": "2010-07-16"
}

Update a movie (PUT /movies/101)

{
  "rating": 10,
  "description": "Updated description for Inception"
}

Response Example (GET /movies/101)

{
  "id": "101",
  "name": "Inception",
  "category": "sci-fi",
  "description": "Updated description for Inception",
  "rating": 10,
  "createdAt": "2010-07-16"
}
Validation & Error Handling

Required fields (name, category, description, rating, createdAt) are validated.

rating must be a number; createdAt must be a valid date.

Duplicate movie IDs are not allowed.

Updating a movie cannot change its ID.

Returns proper HTTP status codes:

200 OK → Successful GET, PUT, DELETE

201 Created → Successful POST

400 Bad Request → Validation errors

404 Not Found → Movie not found

500 Internal Server Error → File read/write or server error

How to Run

Install dependencies

npm install

Create .env file (optional)

PORT=3000

Start the server

node server.js
# or
nodemon server.js

Test API
Use Postman, Thunder Client, or Insomnia to test endpoints.

JSON Database

Located at data/data.json. Example structure:

[
  {
    "id": "67",
    "name": "Harry Potter",
    "category": "fantasy",
    "description": "Wizarding adventures",
    "rating": 10,
    "createdAt": "2008-03-10"
  },
  {
    "id": "78",
    "name": "Interstellar",
    "category": "sci-fi",
    "description": "Space exploration epic",
    "rating": 10,
    "createdAt": "2014-11-07"
  }
]
Technologies Used

Node.js – Server runtime

Express – Web framework for REST API

JSON File – Database for persistent storage

fs/promises – File operations (read/write)

dotenv – Optional environment configuration

Notes

All controllers use utility functions to read/write JSON files.

The API is fully RESTful.

This project follows the assignment requirement of no external database.
