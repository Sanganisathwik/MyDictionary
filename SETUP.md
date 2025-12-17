# Dictionary Application - Setup Guide

## ✅ What Has Been Completed

### Backend Setup
- ✅ MongoDB models with Word schema
- ✅ GraphQL type definitions and resolvers
- ✅ Search, add, update, and delete functionality
- ✅ Express server with Apollo GraphQL
- ✅ CORS configuration
- ✅ Environment variables setup (.env file)

### Frontend Setup
- ✅ Redux store configuration with search reducer
- ✅ Apollo Client configured for GraphQL queries
- ✅ Material-UI theme and styling
- ✅ React components (HomePage, AddWordModal, WordDetailModal)
- ✅ GraphQL queries for searching and adding words
- ✅ TypeScript type definitions
- ✅ Environment variables setup (.env.local file)
- ✅ Tailwind CSS configuration
- ✅ CSS module declarations
- ✅ Successfully built and tested

## 🚀 Quick Start

### Prerequisites
Ensure you have installed:
- Node.js (v18+)
- MongoDB ([Download](https://www.mongodb.com/try/download/community))

### Step 1: Start MongoDB
```powershell
# If MongoDB is installed as a service, it should auto-start
# To verify MongoDB is running:
mongosh  # or mongo (for older versions)
# You should see a MongoDB shell prompt
```

### Step 2: Install Dependencies
```powershell
cd C:\Users\sanga\Downloads\SATHWIK\Documents\MyDictionary\MyDictionary

# Install all dependencies
npm install

# Or install individually:
cd backend && npm install
cd ../frontend && npm install
```

### Step 3: Start Both Servers
```powershell
# Option 1: Using the concurrent script
cd C:\Users\sanga\Downloads\SATHWIK\Documents\MyDictionary\MyDictionary
npm run dev

# Option 2: Start servers separately in different terminal windows
# Terminal 1 - Backend:
cd backend
npm run dev

# Terminal 2 - Frontend:
cd frontend
npm run dev
```

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **GraphQL API**: http://localhost:4000/graphql

## 📁 File Structure

```
MyDictionary/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Word.ts              # MongoDB Word model
│   │   ├── schema/
│   │   │   ├── typeDefs.ts         # GraphQL schema
│   │   │   └── resolvers.ts        # GraphQL resolvers
│   │   └── index.ts                 # Server entry point
│   ├── .env                         # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   ├── providers.tsx           # Redux & Apollo providers
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── AddWordModal.tsx        # Add word dialog
│   │   └── WordDetailModal.tsx     # Word detail dialog
│   ├── graphql/
│   │   └── word.ts                 # GraphQL queries & mutations
│   ├── lib/
│   │   ├── apollo.ts               # Apollo Client setup
│   │   ├── store.ts                # Redux store
│   │   ├── theme.ts                # MUI theme
│   │   └── store/
│   │       └── slices/
│   │           └── searchSlice.ts  # Search state management
│   ├── types/
│   │   ├── word.ts                 # Word types
│   │   └── css.d.ts               # CSS module declarations
│   ├── .env.local                  # Frontend environment variables
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                     # Root package.json
├── start-dev.ps1                   # PowerShell script to start both servers
└── README.md                        # This file
```

## 🔌 API Endpoints

### GraphQL Queries
```graphql
# Search words
query SearchWords($query: String!) {
  searchWords(query: $query) {
    id
    word
    phonetic
    partOfSpeech
    definitions
    examples
    synonyms
    antonyms
    createdAt
  }
}

# Get word by ID
query GetWord($id: ID!) {
  getWord(id: $id) {
    id
    word
    phonetic
    partOfSpeech
    definitions
    examples
    synonyms
    antonyms
    createdAt
  }
}
```

### GraphQL Mutations
```graphql
# Add new word
mutation AddWord($input: AddWordInput!) {
  addWord(input: $input) {
    id
    word
    phonetic
    partOfSpeech
    definitions
    examples
    synonyms
    antonyms
    createdAt
  }
}

# Update word
mutation UpdateWord($id: ID!, $input: AddWordInput!) {
  updateWord(id: $id, input: $input) {
    id
    word
    # ... other fields
  }
}

# Delete word
mutation DeleteWord($id: ID!) {
  deleteWord(id: $id)
}
```

## 🛠 Configuration Files

### Backend Environment (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/dictionary
NODE_ENV=development
```

### Frontend Environment (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📋 Available Scripts

### Backend
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start Next.js development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Root
```bash
npm run dev              # Start both backend and frontend concurrently
npm run backend          # Start backend only
npm run frontend         # Start frontend only
```

## ⚠️ Troubleshooting

### MongoDB Connection Error
**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`
**Solution**:
1. Start MongoDB service: `net start MongoDB` (Windows)
2. Or verify MongoDB is running: `mongosh`
3. Check `backend/.env` has correct `MONGODB_URI`

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::4000`
**Solution**:
```powershell
# Kill the process using the port
# For port 4000:
lsof -i :4000  # Find process ID
kill -9 <PID>  # Kill the process

# Or change the port in backend/.env:
PORT=4001
```

### Components Not Found
**Problem**: `Cannot find module '@/components/WordDetailModal'`
**Solution**:
1. Restart the TypeScript server (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
2. Delete `.next` folder and rebuild
3. Ensure files exist: `frontend/components/AddWordModal.tsx` and `frontend/components/WordDetailModal.tsx`

### Build Errors
**Solution**:
```powershell
# Clean install
rm node_modules -r -force
rm package-lock.json
npm install

# Rebuild
npm run build
```

## 🎨 Features

- 🔍 **Search Dictionary**: Search words by name or definition
- ➕ **Add Words**: Add new words with full details (phonetic, definitions, examples, synonyms, antonyms)
- 📖 **Word Details**: View complete information about each word
- 🎯 **Fast Search**: Real-time search with minimum 2 characters
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Material Design**: Clean, modern UI with Material-UI components
- ⚡ **Type Safe**: Full TypeScript support for type safety
- 🔄 **Real-time Updates**: Redux state management for search state

## 📚 Tech Stack

### Frontend
- Next.js 15.1
- React 19.2
- TypeScript 5
- Material-UI 6.1
- Apollo Client 3.11
- Redux Toolkit 2.3
- Tailwind CSS 3.4
- Emotion (CSS-in-JS)

### Backend
- Node.js with Express
- Apollo Server 3.13
- MongoDB with Mongoose 8.20
- TypeScript 5
- GraphQL 16.12
- CORS support

## 🚀 Deployment

For production deployment:

1. **Set environment variables** on production servers
2. **Build both applications**:
   ```bash
   npm run build
   ```
3. **Start production servers**:
   - Backend: `npm start` (uses `dist/index.js`)
   - Frontend: `npm start` (uses Next.js production build)

## 📝 License

MIT

## 🤝 Support

If you encounter any issues, ensure:
1. Node.js and npm are up to date
2. MongoDB is running
3. Ports 3000 and 4000 are available
4. All environment variables are correctly set
5. Try restarting both servers

---

**Ready to start? Run `npm run dev` in the root directory!** 🎉
