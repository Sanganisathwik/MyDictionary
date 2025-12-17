export interface WordResult {
  id: string;
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definitions: string[];
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
  createdAt: string;
}

export interface AddWordInput {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definitions: string[];
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
}
