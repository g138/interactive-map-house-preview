const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
const dbName = process.env.COSMOS_DB_NAME;

// Connection cache
let client = null;
let database = null;

async function connectToDatabase() {
	if (database) {
		return database;
	}

	try {
		// Connect to the MongoDB server
		client = await MongoClient.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Get reference to the database
		database = client.db(dbName);
		console.log('Connected to MongoDB successfully');
		return database;
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		throw error;
	}
}

async function getCollection(collectionName) {
	const db = await connectToDatabase();
	return db.collection(collectionName);
}

// Graceful shutdown
process.on('SIGINT', async () => {
	if (client) {
		await client.close();
		console.log('MongoDB connection closed');
	}
	process.exit(0);
});

module.exports = { connectToDatabase, getCollection };
