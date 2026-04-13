# Todo-List-REST-API

A simple RESTful API for managing a TODO list using **Node.js**, **Express**, and **JSON file storage**. This API supports CRUD operations: Create, Read, Update, Delete todos.

---

## Features

* List all todos ✅
* Add a new todo ✅
* Update a todo ✅
* Delete a todo ✅
* JSON-based storage (no database required)
* Basic request logging middleware
* Input validation for new todos

---

## Tech Stack

* Node.js
* Express.js
* JSON file as persistent storage
* Postman (for API testing)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RRThrsh/Todo-List-REST-API.git
cd Todo-List-REST-API
```

2. Install dependencies:

```bash
npm install
```

3. Run the server:

```bash
npm run dev
```

---

## API Testing (Postman)

You can use **Postman** (or Thunder Client) to test the API endpoints.

### Base URL

```
http://localhost:3000/todos
```

### Endpoints

#### Get all todos

* Method: GET
* URL:

```
/todos
```

#### Add a new todo

* Method: POST
* URL:

```
/todos
```

* Body (JSON):

```json
{
  "title": "Sample task"
}
```

#### Update a todo

* Method: PUT
* URL:

```
/todos/:id
```

* Example:

```
/todos/1
```

* Body (JSON):

```json
{
  "title": "Updated task",
  "completed": true
}
```

#### Delete a todo

* Method: DELETE
* URL:

```
/todos/:id
```

* Example:

```
/todos/1
```

---

## Notes

* The browser can only send **GET requests**, so tools like Postman are required to test **POST, PUT, and DELETE** endpoints.
* Make sure the server is running before sending requests.
