import mongoose, { Schema, Document } from 'mongoose';

export interface IWord extends Document {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definitions: string[];
  examples?: string[];
  synonyms?: string[];
  antonyms?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WordSchema: Schema = new Schema(
  {
    word: { type: String, required: true, index: true },
    phonetic: { type: String },
    partOfSpeech: { type: String, required: true },
    definitions: { type: [String], required: true },
    examples: { type: [String], default: [] },
    synonyms: { type: [String], default: [] },
    antonyms: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Create text index for search functionality
WordSchema.index({ word: 'text', definitions: 'text' });

export const Word = mongoose.model<IWord>('Word', WordSchema);
