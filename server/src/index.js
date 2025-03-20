const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

async function startServer() {
	// Create Express app
	const app = express();

	// Configure CORS properly
	app.use(
		cors({
			origin: 'https://wonderful-ocean-082528d03.6.azurestaticapps.net/', // Your frontend URL
			credentials: true,
			methods: ['GET', 'POST', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		})
	);

	// Create Apollo Server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	// Start Apollo Server
	await server.start();

	// Apply middleware
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: false, // Important: let express handle CORS
	});

	// Start Express server
	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () => {
		console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
	});
}

startServer().catch((err) => {
	console.error('Error starting server:', err);
});
