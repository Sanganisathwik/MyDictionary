export const typeDefs = `
  type Word {
    id: ID!
    word: String!
    phonetic: String
    partOfSpeech: String!
    definitions: [String!]!
    examples: [String!]
    synonyms: [String!]
    antonyms: [String!]
    createdAt: String!
    updatedAt: String!
  }

  input AddWordInput {
    word: String!
    phonetic: String
    partOfSpeech: String!
    definitions: [String!]!
    examples: [String!]
    synonyms: [String!]
    antonyms: [String!]
  }

  type Query {
    searchWords(query: String!): [Word!]!
    getWord(id: ID!): Word
    getAllWords: [Word!]!
  }

  type Mutation {
    addWord(input: AddWordInput!): Word!
    updateWord(id: ID!, input: AddWordInput!): Word
    deleteWord(id: ID!): Boolean!
  }
`;
