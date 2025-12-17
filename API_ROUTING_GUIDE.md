# MyDictionary - API & Routing Guide

## Backend GraphQL API

The backend GraphQL server is running at: `http://localhost:4000/graphql`

### Available Queries

#### 1. SearchWords
Search for words by query string
```graphql
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
    updatedAt
  }
}
```

#### 2. GetWord
Get a single word by ID
```graphql
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
    updatedAt
  }
}
```

### Available Mutations

#### 1. AddWord
Add a new word to the dictionary
```graphql
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
    updatedAt
  }
}
```

#### 2. UpdateWord
Update an existing word
```graphql
mutation UpdateWord($id: ID!, $input: AddWordInput!) {
  updateWord(id: $id, input: $input) {
    id
    word
    phonetic
    partOfSpeech
    definitions
    examples
    synonyms
    antonyms
    createdAt
    updatedAt
  }
}
```

#### 3. DeleteWord
Delete a word by ID
```graphql
mutation DeleteWord($id: ID!) {
  deleteWord(id: $id)
}
```

## Frontend Routing

### Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home/Dictionary | Main search page for looking up words |
| `/words` | Words List | View all words (future enhancement) |
| `/words/[id]` | Word Detail | View, edit, or delete a specific word |

### Navigation Flow

1. **Home Page (/)** 
   - Search for words in real-time
   - Click on a word card to view details
   - Click the FAB (+) button to add a new word

2. **Word Detail Modal (inline)**
   - View word details
   - Edit word information (click Edit button)
   - Delete word (click Delete button)

3. **Word Detail Page (/words/[id])**
   - Full page view of a word
   - Edit word with multiple fields
   - Delete with confirmation dialog
   - Navigate back to home

4. **Words List Page (/words)**
   - Overview page (future implementation)
   - Can be used to display all words in a table format

## Component Integration

### GraphQL Operations

All GraphQL queries and mutations are defined in [frontend/graphql/word.ts](frontend/graphql/word.ts):
- `SEARCH_WORDS` - Search query
- `GET_WORD` - Get single word query
- `ADD_WORD` - Add word mutation
- `UPDATE_WORD` - Update word mutation
- `DELETE_WORD` - Delete word mutation

### Components

1. **Navigation** ([frontend/components/Navigation.tsx](frontend/components/Navigation.tsx))
   - Top navigation bar
   - Links to Home and Words pages

2. **WordDetailModal** ([frontend/components/WordDetailModal.tsx](frontend/components/WordDetailModal.tsx))
   - Modal for viewing word details
   - Inline editing and deletion
   - Used in home page

3. **AddWordModal** ([frontend/components/AddWordModal.tsx](frontend/components/AddWordModal.tsx))
   - Modal for adding new words
   - Form validation
   - Automatic search refresh after adding

## Custom Hooks

### useWord ([frontend/hooks/useWord.ts](frontend/hooks/useWord.ts))
- `useDeleteWord(searchQuery)` - Delete a word mutation
- `useUpdateWord(searchQuery)` - Update a word mutation

## API Configuration

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/
PORT=4000
NODE_ENV=development
```

## Data Flow

```
User Search Input
    ↓
SearchWords Query
    ↓
Display Results (Word Cards)
    ↓
Click Word Card → WordDetailModal
    ↓
Edit/Delete/Close
    ↓
If Updated/Deleted → Refetch SearchWords
```

## Type Definitions

See [frontend/types/word.ts](frontend/types/word.ts) for:
- `WordResult` - Word data structure
- `AddWordInput` - Input for adding/updating words

## Starting Development

1. **Start Backend**
```bash
cd backend
npm run dev
```

2. **Start Frontend**
```bash
cd frontend
npm run dev
```

3. **Access Application**
- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql

## Future Enhancements

- [ ] Pagination for word list
- [ ] Advanced search filters
- [ ] Word pronunciation audio
- [ ] Export/Import dictionary
- [ ] User authentication
- [ ] Favorites/Bookmarks
