import { useMutation } from "@apollo/client";
import { DELETE_WORD, SEARCH_WORDS, UPDATE_WORD } from "@/graphql/word";
import { AddWordInput, WordResult } from "@/types/word";

export const useDeleteWord = (searchQuery: string = "") => {
  return useMutation<{ deleteWord: boolean }, { id: string }>(DELETE_WORD, {
    refetchQueries: [
      { query: SEARCH_WORDS, variables: { query: searchQuery } },
    ],
  });
};

export const useUpdateWord = (searchQuery: string = "") => {
  return useMutation<
    { updateWord: WordResult },
    { id: string; input: AddWordInput }
  >(UPDATE_WORD, {
    refetchQueries: [
      { query: SEARCH_WORDS, variables: { query: searchQuery } },
    ],
  });
};
