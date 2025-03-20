require('dotenv').config();
const { getCollection } = require('../src/db/dbClient');

const sampleProperties = [
	{
		title: '4 Bedroom Detached - Plot 9',
		description: 'A beautiful 4 bedroom detached home located in the desirable Grove section.',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 772,
		y: 155,
		width: 20,
		height: 20,
		section: 'The Grove',
		plotNumber: '9',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: '3 Bedroom Semi-Detached - Plot 10',
		description: 'Charming 3 bedroom semi-detached with high-quality finishes.',
		type: 'SEMI_DETACHED',
		status: 'RESERVED',
		price: 380000,
		bedrooms: 3,
		bathrooms: 2,
		squareFootage: 1500,
		features: ['High-quality finishes', 'Fitted wardrobes', 'Modern kitchen appliances', 'Downstairs WC'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 772,
		y: 190,
		width: 20,
		height: 20,
		section: 'The Grove',
		plotNumber: '10',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	// Add more properties as needed based on your map
];

async function seedDatabase() {
	try {
		const collection = await getCollection(process.env.COSMOS_DB_COLLECTION);

		// Check if data already exists
		const count = await collection.countDocuments();
		if (count > 0) {
			console.log(`Database already contains ${count} properties. Skipping seed.`);
			process.exit(0);
		}

		// Insert sample data
		const result = await collection.insertMany(sampleProperties);
		console.log(`Successfully seeded database with ${result.insertedCount} properties`);
		process.exit(0);
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	}
}

seedDatabase();
