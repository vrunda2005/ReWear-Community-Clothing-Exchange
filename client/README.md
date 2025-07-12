
# ReWear - Community Clothing Exchange

A full-stack web application for a community-driven clothing exchange platform.  
It consists of a React + TypeScript + TailwindCSS frontend** and an Express.js + MongoDB backend, with JWT-based authentication

##  Features

- Community-driven clothing exchange platform
- User signup & login with secure JWT authentication
- React frontend styled with MUI & TailwindCSS
- MongoDB database integration
- Docker-ready development container
- Fully TypeScript-enabled frontend
- Linting & formatting with ESLint and Prettier

## Tech Stack

### Frontend (`rewear-client`)
- [React](https://react.dev/) 18
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- ESLint & Prettier

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + Mongoose
- [JWT](https://jwt.io/) for authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- dotenv for configuration


## Project Structure

```
backend/
├── server.js
├── routes/
│   └── authRoutes.js
├── controllers/
│   └── authController.js
├── config/
│   └── db.js
│
rewear-client/
├── src/
│   ├── main.tsx
│   └── ...
├── index.html
├── vite.config.ts
├── tsconfig.*.json
│
.devcontainer/
│   └── devcontainer.json

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (cloud or local)

### Clone the repository
bash
git clone <your-repo-url>
cd ReWear-Community-Clothing-Exchange

### Backend setup
bash
cd backend
npm install


Create `.env` file:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

Run backend:
```bash
node server.js
```

Backend runs on: [http://localhost:5000](http://localhost:5000)

---

### Frontend setup
```bash
cd rewear-client
npm install
```

Run frontend:
```bash
npm run dev
```

Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

### Base URL
`/api/auth`
 Method  Endpoint   Description        
 POST    /signup    Register new user 
 POST    /login     Login user        

---

##  Environment Variables

Variable      Description               
`PORT`        Backend server port (default 5000) 
`MONGO_URI`   MongoDB connection string 
`JWT_SECRET`  Secret key for JWT        

---

## Dev Container

If using GitHub Codespaces or VS Code Dev Containers:
- Includes Node.js 20 container
- Pre-configured with ESLint, Prettier, TailwindCSS extensions
- Post-create command: `npm install`

---

##  Scripts

### Frontend (`rewear-client`)

 Command            Description                 

`npm run dev`       Start development server   
`npm run build`     Build production assets    
`npm run preview`   Preview production build 
`npm run lint`      Lint the codebase          

### Backend
 Command            Description           

 `node server.js` Start backend server 

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -m 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a Pull Request


