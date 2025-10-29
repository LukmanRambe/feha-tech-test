# Full-Stack Project (Next.js + Express.js + Prisma)

## Overview
This repository contains a full-stack web application built with:
- **Frontend:** Next.js (in `/client`)
- **Backend:** Express.js with Prisma ORM (in `/server`)
- 
## Prerequisites
Before running the project, ensure the following are installed:
- **Node.js** (v18 or later)
- **npm** or **yarn**
- **PostgreSQL** (or another supported database)
- 
## Setup Instructions
### 1. Clone the Repository
```bash
git clone <repository-url>  
cd <repository-folder>
```

### 2. Backend Setup (`/server`)
```bash
cd server  
npm install  
```

Create a `.env` file inside the `server` directory:  
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"  
PORT=4000  
```
Initialize Prisma:
```bash
npx prisma migrate dev  
npx prisma generate  
```

Run backend:  
```bash
npm run dev  
```
Backend runs on http://localhost:5000

### 3. Frontend Setup (`/client`)
```bash
cd ../client  
npm install  
```

Create a `.env.local` file inside the `client` directory:  
```
NEXT_PUBLIC_API_URL=http://localhost:3000  
```

Run frontend:  
```bash
npm run dev  
```
Frontend runs on http://localhost:3000

## Common Commands
### Prisma
```bash
npx prisma studio  
npx prisma migrate dev  
npx prisma generate
```

### Backend Scripts
```bash
npm run dev  
npm run build  
npm start
```

### Frontend Scripts
```bash
npm run dev  
npm run build  
npm start
```
## Production Build and Deployment
### Build
```bash
cd server  
npm run build  
cd ../client  
npm run build
### Start
cd server  
npm start  
cd ../client  
npm start
```
