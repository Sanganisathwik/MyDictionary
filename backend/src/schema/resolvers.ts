import { Word } from '../models/Word';

export const resolvers = {
  Query: {
    searchWords: async (_: any, { query }: { query: string }) => {
      try {
        if (!query || query.trim().length < 2) {
          return [];
        }
        
        // Search by word starting with query or contains the query in definitions
        const words = await Word.find({
          $or: [
            { word: { $regex: query, $options: 'i' } },
            { definitions: { $regex: query, $options: 'i' } }
          ]
        }).sort({ word: 1 }).limit(50);
        
        return words;
      } catch (error) {
        console.error('Error searching words:', error);
        throw new Error('Failed to search words');
      }
    },
    
    getWord: async (_: any, { id }: { id: string }) => {
      try {
        const word = await Word.findById(id);
        if (!word) {
          throw new Error('Word not found');
        }
        return word;
      } catch (error) {
        console.error('Error fetching word:', error);
        throw new Error('Failed to fetch word');
      }
    },
    
    getAllWords: async () => {
      try {
        const words = await Word.find({}).sort({ word: 1 });
        return words;
      } catch (error) {
        console.error('Error fetching all words:', error);
        throw new Error('Failed to fetch all words');
      }
    }
  },

  Mutation: {
    addWord: async (_: any, { input }: { input: any }) => {
      try {
        const word = new Word(input);
        await word.save();
        return word;
      } catch (error) {
        console.error('Error adding word:', error);
        throw new Error('Failed to add word');
      }
    },
    
    updateWord: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const word = await Word.findByIdAndUpdate(id, input, { new: true });
        if (!word) {
          throw new Error('Word not found');
        }
        return word;
      } catch (error) {
        console.error('Error updating word:', error);
        throw new Error('Failed to update word');
      }
    },
    
    deleteWord: async (_: any, { id }: { id: string }) => {
      try {
        const result = await Word.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        console.error('Error deleting word:', error);
        throw new Error('Failed to delete word');
      }
    }
  }
};
