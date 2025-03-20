const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

async function startServer() {
  // Create Express app
  const app = express();
  
  // Configure CORS
  app.use(cors());
  
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  // Start Apollo Server
  await server.start();
  
  // Apply middleware
  server.applyMiddleware({ app, path: '/graphql' });
  
  // Start Express server
  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
});