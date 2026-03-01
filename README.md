# PrimeTrade Backend Intern Assignment

## Tech Stack
Backend: Node.js, Express, PostgreSQL, Prisma  
Frontend: React (Vite) + Tailwind CSS  
Auth: JWT  
Validation: Zod  
Docs: Swagger  

---

## Setup Instructions

### 1. Clone repo
git clone https://github.com/nitinkapil25/primetrade.git

### 2. Install backend dependencies
`npm install`

### 3. Configure environment variables
Create `.env` in project root:

`PORT=3000`  
`DATABASE_URL=your_db_url`  
`JWT_SECRET=your_secret`

### 4. Run migrations
`npx prisma migrate dev`

### 5. Start backend
`npm run dev`

---

## Frontend Setup

`cd client`  
`npm install`  
`npm run dev`

---

## API Documentation
`http://localhost:3000/api-docs`

---

## Notes For Evaluator
- Register a user via `POST /api/v1/auth/register`, then login to get JWT.
- Use that JWT to test protected task endpoints.
- Swagger includes request/response examples for all implemented routes.

---

## Features
- JWT Authentication
- Role-based access control (USER/ADMIN)
- Task CRUD
- Protected routes
- Request validation
- Swagger API docs
- Frontend integration


## 👨‍💻 Author

Nithin Kapil  
GitHub: https://github.com/nitinkapil25