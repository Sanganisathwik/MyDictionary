# Dictionary Application

A full-stack dictionary application built with Next.js, Apollo GraphQL, MongoDB, and Material-UI.

## Project Structure

```
MyDictionary/
├── backend/          # Express + Apollo GraphQL server
│   ├── src/
│   │   ├── models/   # MongoDB models
│   │   ├── schema/   # GraphQL schema and resolvers
│   │   └── index.ts  # Server entry point
│   └── package.json
├── frontend/         # Next.js + React application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── graphql/      # GraphQL queries
│   ├── lib/          # Redux store, Apollo client, theme
│   └── types/        # TypeScript types
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Environment Setup

### Backend (.env)
Create a `.env` file in the `backend` directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/dictionary
NODE_ENV=development
```

### Frontend (.env.local)
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Installation

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Running the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud connection
```

### 2. Start the Backend Server
```bash
cd backend
npm run dev
```
The GraphQL server will start at `http://localhost:4000/graphql`

### 3. Start the Frontend
```bash
cd frontend
npm run dev
```
The Next.js app will start at `http://localhost:3000`

## Features

- **Search Words**: Search for words in the dictionary
- **View Details**: Click on a word to see full details including definitions, examples, synonyms, and antonyms
- **Add Words**: Add new words to the dictionary with the floating action button
- **Material-UI Design**: Modern, responsive UI with Material Design components
- **Redux State Management**: Global state management for search functionality
- **GraphQL API**: Efficient data fetching with Apollo Client and Server

## API Endpoints

### Queries
- `searchWords(query: String!)`: Search for words matching the query
- `getWord(id: ID!)`: Get a specific word by ID

### Mutations
- `addWord(input: AddWordInput!)`: Add a new word to the dictionary
- `updateWord(id: ID!, input: AddWordInput!)`: Update an existing word
- `deleteWord(id: ID!)`: Delete a word from the dictionary

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Material-UI (MUI)
- Apollo Client
- Redux Toolkit
- Emotion (styling)

### Backend
- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB with Mongoose
- TypeScript

## Scripts

### Backend
- `npm run dev`: Start development server with ts-node
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Run production server

### Frontend
- `npm run dev`: Start Next.js development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check the connection string in `backend/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Run `npm run dev -- -p 3001` to use a different port

### TypeScript Errors
- Run `npm install` in both directories
- Restart the TypeScript server in VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

## License

MIT
