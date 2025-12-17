import { gql } from "@apollo/client";

export const SEARCH_WORDS = gql`
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
`;

export const GET_ALL_WORDS = gql`
  query GetAllWords {
    getAllWords {
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
`;

export const GET_WORD = gql`
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
`;

export const ADD_WORD = gql`
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
`;

export const UPDATE_WORD = gql`
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
`;

export const DELETE_WORD = gql`
  mutation DeleteWord($id: ID!) {
    deleteWord(id: $id)
  }
`;
