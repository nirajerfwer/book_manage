# 📚 Book Review API

A Node.js + Express application using MongoDB (via Mongoose) to manage books, users, and their reviews.

---

## 🚀 Project Setup Instructions

### ✅ Prerequisites

- [Node.js](https://nodejs.org/en/) installed (v14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or access to a remote MongoDB URI
- `npm` (comes with Node.js)

---

### 📁 Folder Structure Overview

```
Backend/
├── db/
│   ├── books.ts
│   ├── reviews.ts
│   └── user.ts
├── handler/
│   ├── auth_handler.ts
|   ├── books_handler.ts
│   └── reviews_handler.ts
├── middleware/
│   └── auth_middlerware.ts
├── router/
│   ├── auth.ts
|   ├── book.ts
|   ├── review.ts
|   └── search.ts
└── app.js

├── dist/
├── .env
├── package.json
└── README.md
```

---

### ⚙️ Environment Setup

Create a `.env` file in the root of your project:

```env
PORT=3000
mongoDBURL=mongodb://localhost:27017
DatabaseName = book_db
JWTSecreteKey = SecreteKey
```

> Ensure MongoDB is running locally on port 27017 or change the URL accordingly.

---

### 📦 Install Dependencies

```bash
npm install
```

---

## 🧑‍💻 How to Run Locally

```bash
# Start MongoDB server in the background if not already running
mongodb

# Start the Node.js server
npm run start
```

By default, the server will run on [http://localhost:3000](http://localhost:3000)

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

---

## 🗃️ Database Design (MongoDB - `book_db`)

This project uses **3 collections** in the `book_db` database:

### 1. **Users Collection**
| Field     | Type   | Description         |
|-----------|--------|---------------------|
| _id       | ObjectId | Auto-generated ID |
| name      | String | Name of the user    |
| email     | String | email of the user   |
| phone     | Number | phone of the user   |
| password  | String | Hashed password     |
| createdAt | Date     | Auto timestamp    |
| createdAt | Date     | Auto timestamp    |

---

### 2. **Books Collection**
| Field     | Type     | Description         |
|-----------|----------|---------------------|
| _id       | ObjectId | Auto-generated ID   |
| title     | String   | Book title          |
| author    | String   | Author of the book  |
| genre     | String   | Genre of the book   |
| published | Date     | Publication date    |
| createdAt | Date     | Auto timestamp      |
| updatedAt | Date     | Auto timestamp      |

---

### 3. **Reviews Collection**
| Field            | Type     | Description                        |
|------------------|----------|------------------------------------|
| _id              | ObjectId | Auto-generated ID                  |
| userId           | ObjectId | References `User._id`              |
| bookId           | ObjectId | References `Books._id`             |
| rating           | Number   | Rating from 1–5                    |
| rating_Message   | String   | Review comment                     |
| createdAt        | Date     | Auto timestamp                     |
| updatedAt        | Date     | Auto timestamp                     |

---

## 📌 Notes

- This project uses `dotenv` to manage environment variables.
- MongoDB must be running locally or a valid cloud URI provided in `.env`.
- All timestamps (`createdAt`, `updatedAt`) are automatically handled by Mongoose.

---

## 📮 PostMan API

- Find billeasy.postman_collection.json 
- all the apis that are using in project shown there



## 📮 Future Features

- User authentication with JWT
- REST API for CRUD operations on all models
- Search and filter books/reviews
- Pagination
