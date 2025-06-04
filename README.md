# Fullstack Open Part 3 — Phonebook App (Exercises 3.1–3.22)

 SPA implementation of the Phonebook application from the [Fullstack Open](https://fullstackopen.com/en/) course, [Part 3](https://fullstackopen.com/en/part3/) with the build of the front-end from [Part 2](https://fullstackopen.com/en/part2/). It uses Node.js with Express.js to provide a RESTful API for managing a phonebook.

[Live Demo on Render](https://fso-part3-ii1w.onrender.com)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/serfoll/fso_part3.git
```
### 2. Navigate into the Project Directory
```bash
cd fso_part3
```
### 3. Install Dependencies
Make sure you have Node.js and npm installed. Then run:
```bash
npm install
```
### 4. Start the Development Server
```bash
npm start
```
or
```bash
npm run dev
```

### Tech stack
•	Node.js
•	Express.js
•	Morgan (for logging)

## API Endpoints

| Method | Endpoint           | Description                                     |
|--------|--------------------|-------------------------------------------------|
| GET    | `/api/persons`     | Get all phonebook entries                       |
| GET    | `/api/persons/:id` | Get a single person by ID                       |
| POST   | `/api/persons`     | Add a new person                                |
| PUT    | `/api/persons/:id` | Update an existing person’s number              |
| DELETE | `/api/persons/:id` | Delete a person from the phonebook              |
| GET    | `/info`            | Get general information and current server time |
