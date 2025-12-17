import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

const startServer = async () => {
  const app = express();
  
  // Placeholder for GraphQL schema
  const typeDefs = `
    type Query {
      hello: String
    }
  `;
  
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer().catch(err => console.error(err));
