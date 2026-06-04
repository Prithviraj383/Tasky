# Tasky Backend

A collaborative workspace management backend inspired by tools like Trello, Jira, and Notion.

This project focuses on building a production-style backend architecture with authentication, workspace management, boards, tasks, and role-based collaboration.

---

## Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Workspace Management
- Create Workspace
- View User Workspaces
- Workspace Ownership

### Board Management
- Create Boards
- View Boards inside a Workspace

### Task Management
- Create Tasks
- Update Task Status
- Delete Tasks
- View Tasks by Board

### Backend Architecture
- RESTful APIs
- PostgreSQL Database
- Layered Architecture
- Centralized Error Handling
- Request Validation

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication
- JWT (JSON Web Tokens)
- bcrypt

### Development Tools
- Nodemon
- Postman
- dotenv

---

## Project Structure

```text
src/
│
├── routes/
├── controllers/
├── services/
├── middleware/
├── validators/
├── configs/
├── db/
│
├── app.js
└── server.js
```

### Folder Responsibilities

#### routes
Defines API endpoints.

#### controllers
Handles request and response logic.

#### services
Contains business logic.

#### middleware
Authentication and error-handling middleware.

#### validators
Request validation schemas.

#### db
Database connection and query utilities.

---

## Database Schema

### Users

```sql
users
------
id
name
email
password
created_at
```

### Workspaces

```sql
workspaces
-----------
id
name
owner_id
created_at
updated_at
```

### Workspace Members

```sql
workspace_members
-----------------
workspace_id
user_id
role
joined_at
```

### Boards

```sql
boards
------
id
workspace_id
name
created_by
created_at
```

### Tasks

```sql
tasks
-----
id
board_id
title
description
status
assigned_to
created_by
created_at
updated_at
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

#### Login User

```http
POST /auth/login
```

### Workspaces

#### Create Workspace

```http
POST /workspace
```

#### Get User Workspaces

```http
GET /workspace
```

### Boards

#### Create Board

```http
POST /board
```

#### Get Workspace Boards

```http
GET /workspace/:id/boards
```

### Tasks

#### Create Task

```http
POST /task
```

#### Get Tasks

```http
GET /board/:id/tasks
```

#### Update Task

```http
PATCH /task/:id
```

#### Delete Task

```http
DELETE /task/:id
```

---

## Authentication Flow

1. User registers.
2. Password is hashed before storage.
3. User logs in.
4. Server generates a JWT token.
5. Client includes JWT in Authorization header.
6. Protected routes verify the token using middleware.

---

## Running the Project

### Clone Repository

```bash
git clone <repository-url>
cd tasky-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/tasky
JWT_SECRET=your_secret_key
```

### Start Development Server

```bash
npm run dev
```

---

## Future Enhancements

### Phase 2
- Role-Based Access Control (RBAC)
- Workspace Invitations
- Comments
- Activity Logs
- Pagination
- Filtering

### Phase 3
- WebSockets using Socket.IO
- Live Task Updates
- Real-Time Collaboration
- Notifications
- Presence Tracking

---

## Learning Objectives

This project is designed to strengthen:

- Backend Architecture
- PostgreSQL Database Design
- Authentication & Authorization
- REST API Development
- Service Layer Pattern
- Relational Data Modeling
- Real-Time Backend Concepts
- Scalable Application Design

---

## Inspiration

This project is inspired by collaborative software platforms such as:

- Trello
- Jira
- Notion
- Linear