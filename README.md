## Todo App - Nest.js + Next.js
# Author: Khorshed Alam

## A simple To-Do application with: 
- Backend: Nest.js + Sequelize-Typescript + MySQL (JWT auth via a simple login)
- Frontend: Next.js + TypeScript + Tailwind CSS

# This project is a small demo. There is no user registration flow or users table — the app uses a single hardcoded demo user for authentication. The backend issues a JWT for that demo user and protects the /todos endpoints with a middleware that validates the token.

## Demo credentials
- userName: "Sofof Tech"
- password: "123456"

## Prerequisites
- Node.js >= 16
- npm
- Docker & docker-compose

## Start the database (Docker)
- docker-compose up -d
This will start a MySQL container defined in docker-compose.yml.

## Backend
- cd backend
- cp .env.example .env
- npm install
- npm run start:dev
The backend listens on http://localhost:3001 by default.

## Frontend
- cd frontend
- cp .env.example .env
# set API_URL .env.example
# frontend/.env.example should contain:
 NEXT_PUBLIC_API_URL=http://localhost:3001

- npm install
- npm run dev
Open the frontend at http://localhost:3000

## Run tests
A sample Jest test is included in the backend. Run:
- cd backend
- npm run test
