# Author: Khorshed Alam
# Todo App - Nest.js + Next.js

## Prerequisites
- Node.js >= 16
- Docker & docker-compose

## Start DB
docker-compose up -d

## Backend
cd backend
cp .env.sample .env   # or create .env with DB/JWT settings
npm install
npm run start:dev
# backend listens at http://localhost:3001

## Frontend
cd frontend
npm install
# set API_URL .env.local
npm run dev
# frontend at http://localhost:3000

## Run tests
cd backend
npm run test