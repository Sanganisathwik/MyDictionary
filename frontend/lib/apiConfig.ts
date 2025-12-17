/**
 * API Configuration and Constants
 * Centralized configuration for GraphQL API endpoints and settings
 */

export const API_CONFIG = {
  // GraphQL Endpoint
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql",
  
  // REST API Base URL (for future use)
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",

  // Apollo Client Settings
  APOLLO: {
    fetchPolicy: "cache-and-network" as const,
    errorPolicy: "all" as const,
  },

  // API Timeouts
  TIMEOUT: 30000, // 30 seconds

  // Search Settings
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    MAX_RESULTS: 50,
    DEBOUNCE_MS: 300,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
};

export const API_ENDPOINTS = {
  GRAPHQL: "/graphql",
};

export const MUTATIONS = {
  ADD_WORD: "addWord",
  UPDATE_WORD: "updateWord",
  DELETE_WORD: "deleteWord",
};

export const QUERIES = {
  SEARCH_WORDS: "searchWords",
  GET_WORD: "getWord",
};

export const ERROR_MESSAGES = {
  SEARCH_FAILED: "Failed to search words",
  GET_WORD_FAILED: "Failed to fetch word",
  ADD_WORD_FAILED: "Failed to add word",
  UPDATE_WORD_FAILED: "Failed to update word",
  DELETE_WORD_FAILED: "Failed to delete word",
  NETWORK_ERROR: "Network error. Please check your connection.",
  VALIDATION_ERROR: "Please check your input and try again.",
};
