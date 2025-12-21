import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!');
      console.error('Please set MONGODB_URI in your Render environment variables.');
      console.error('Get your connection string from: https://cloud.mongodb.com');
      process.exit(1);
    }
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const app = express();
    
    // Enable CORS - Allow all origins (including Vercel)
    app.use(cors({
      origin: "*",           // This allows Vercel (and everyone) to connect
      credentials: true,     // This allows headers/cookies to pass through
    }));

    // Create Apollo Server
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      context: ({ req }) => ({ req }),
      introspection: true, // Enable introspection in production
      plugins: [
        // Enable GraphQL Playground in production
        {
          async serverWillStart() {
            return {
              async renderLandingPage() {
                const html = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8" />
                    <title>MyDictionary GraphQL</title>
                    <style>body { margin: 0; }</style>
                  </head>
                  <body>
                    <div id="root"></div>
                    <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
                    <script>
                      new window.EmbeddedSandbox({
                        target: '#root',
                        initialEndpoint: '/graphql',
                      });
                    </script>
                  </body>
                  </html>
                `;
                return { html };
              },
            };
          },
        },
      ],
    });
    
    await server.start();
    server.applyMiddleware({ 
      app,
      cors: false, // We handle CORS above
    });

    const PORT = process.env.PORT || 4000;
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();
