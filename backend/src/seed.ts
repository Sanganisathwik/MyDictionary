import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Word } from './models/Word';

dotenv.config();

const mockWords = [
  {
    word: "Serendipity",
    partOfSpeech: "Noun",
    definitions: ["The occurrence and development of events by chance in a happy or beneficial way."],
    examples: ["We found the restaurant by pure serendipity."],
    phonetic: "/ˌserənˈdɪpɪti/",
    synonyms: ["chance", "luck", "fortune"],
    antonyms: []
  },
  {
    word: "Ephemeral",
    partOfSpeech: "Adjective",
    definitions: ["Lasting for a very short time."],
    examples: ["Fashions are ephemeral, changing with every season."],
    phonetic: "/ɪˈfem(ə)rəl/",
    synonyms: ["transient", "fleeting", "temporary"],
    antonyms: ["permanent", "lasting", "enduring"]
  },
  {
    word: "Luminous",
    partOfSpeech: "Adjective",
    definitions: ["Full of or shedding light; bright or shining, especially in the dark."],
    examples: ["The luminous dial on his watch glowed in the darkness."],
    phonetic: "/ˈluːmɪnəs/",
    synonyms: ["bright", "radiant", "glowing"],
    antonyms: ["dark", "dim", "dull"]
  },
  {
    word: "Petrichor",
    partOfSpeech: "Noun",
    definitions: ["A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather."],
    examples: ["The air was filled with the scent of petrichor after the storm."],
    phonetic: "/ˈpetrɪkɔː/",
    synonyms: ["earthy smell", "rain scent"],
    antonyms: []
  },
  {
    word: "Mellifluous",
    partOfSpeech: "Adjective",
    definitions: ["(of a voice or words) sweet or musical; pleasant to hear."],
    examples: ["She had a rich, mellifluous voice that captivated the audience."],
    phonetic: "/meˈlɪfluəs/",
    synonyms: ["sweet", "melodious", "dulcet"],
    antonyms: ["harsh", "grating", "discordant"]
  },
  {
    word: "Solitude",
    partOfSpeech: "Noun",
    definitions: ["The state or situation of being alone."],
    examples: ["He enjoyed the peace and solitude of the woods."],
    phonetic: "/ˈsɒlɪtjuːd/",
    synonyms: ["isolation", "seclusion", "loneliness"],
    antonyms: ["company", "companionship", "togetherness"]
  },
  {
    word: "Aurora",
    partOfSpeech: "Noun",
    definitions: ["A natural electrical phenomenon characterized by the appearance of streamers of reddish or greenish light in the sky."],
    examples: ["We traveled north to see the aurora borealis."],
    phonetic: "/ɔːˈrɔːrə/",
    synonyms: ["northern lights", "polar lights"],
    antonyms: []
  },
  {
    word: "Ineffable",
    partOfSpeech: "Adjective",
    definitions: ["Too great or extreme to be expressed or described in words."],
    examples: ["The ineffable beauty of the sunset left us speechless."],
    phonetic: "/ɪnˈefəb(ə)l/",
    synonyms: ["indescribable", "inexpressible", "unspeakable"],
    antonyms: ["expressible", "definable", "describable"]
  },
  {
    word: "Sonorous",
    partOfSpeech: "Adjective",
    definitions: ["(of a person's voice or other sound) imposingly deep and full."],
    examples: ["The actor had a sonorous voice that filled the theater."],
    phonetic: "/ˈsɒnərəs/",
    synonyms: ["resonant", "rich", "deep"],
    antonyms: ["thin", "weak", "quiet"]
  },
  {
    word: "Eloquence",
    partOfSpeech: "Noun",
    definitions: ["Fluent or persuasive speaking or writing."],
    examples: ["A preacher of great power and eloquence."],
    phonetic: "/ˈeləkwəns/",
    synonyms: ["articulateness", "fluency", "expressiveness"],
    antonyms: ["inarticulateness", "ineloquence"]
  },
  {
    word: "Ethereal",
    partOfSpeech: "Adjective",
    definitions: ["Extremely delicate and light in a way that seems too perfect for this world."],
    examples: ["Her ethereal beauty captivated everyone in the room."],
    phonetic: "/ɪˈθɪərɪəl/",
    synonyms: ["delicate", "exquisite", "dainty", "graceful", "heavenly"],
    antonyms: ["substantial", "earthly", "tangible", "heavy"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dictionary';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Word.deleteMany({});
    // console.log('🗑️  Cleared existing words');

    // Check if words already exist to avoid duplicates
    const existingWords = await Word.find({ word: { $in: mockWords.map(w => w.word) } });
    const existingWordNames = existingWords.map(w => w.word);

    // Filter out words that already exist
    const newWords = mockWords.filter(w => !existingWordNames.includes(w.word));

    if (newWords.length === 0) {
      console.log('ℹ️  All mock words already exist in the database');
    } else {
      // Insert mock data
      await Word.insertMany(newWords);
      console.log(`✅ Successfully seeded ${newWords.length} words to the database`);
      console.log('Words added:', newWords.map(w => w.word).join(', '));
    }

    if (existingWordNames.length > 0) {
      console.log(`ℹ️  ${existingWordNames.length} words already existed:`, existingWordNames.join(', '));
    }

    // Display total count
    const totalCount = await Word.countDocuments();
    console.log(`📊 Total words in database: ${totalCount}`);

    // Close connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
