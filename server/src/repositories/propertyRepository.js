const { getCollection } = require('../db/dbClient');
const { ObjectId } = require('mongodb');

class PropertyRepository {
	constructor() {
		this.collectionName = process.env.COSMOS_DB_COLLECTION;
	}

	// Get all properties with optional filtering
	async getProperties(filter = {}) {
		const collection = await getCollection(this.collectionName);
		const properties = await collection.find(filter).toArray();

		// Map _id to id for GraphQL
		return properties;
	}

	// Get a single property by ID
	async getPropertyById(id) {
		const collection = await getCollection(this.collectionName);
		return collection.findOne({ _id: new ObjectId(id) });
	}

	// Get property by coordinates (x,y)
	async getPropertyByCoordinates(x, y) {
		const collection = await getCollection(this.collectionName);
		const properties = await collection.find({}).toArray();

		const property = properties.find((property) => {
			const halfWidth = property.width / 2;
			const halfHeight = property.height / 2;

			return x >= property.x - halfWidth && x <= property.x + halfWidth && y >= property.y - halfHeight && y <= property.y + halfHeight;
		});

		return property;
	}

	// Create a new property
	async createProperty(propertyData) {
		const collection = await getCollection(this.collectionName);
		const result = await collection.insertOne({
			...propertyData,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return { ...propertyData, _id: result.insertedId };
	}

	// Update an existing property
	async updateProperty(id, propertyData) {
		const collection = await getCollection(this.collectionName);

		const result = await collection.findOneAndUpdate(
			{ _id: new ObjectId(id) },
			{
				$set: {
					...propertyData,
					updatedAt: new Date(),
				},
			},
			{ returnDocument: 'after' }
		);

		return result.value;
	}

	// Delete a property
	async deleteProperty(id) {
		const collection = await getCollection(this.collectionName);
		const result = await collection.deleteOne({ _id: new ObjectId(id) });
		return result.deletedCount === 1;
	}

	// Get properties by section
	async getPropertiesBySection(section) {
		const collection = await getCollection(this.collectionName);
		return collection.find({ section }).toArray();
	}
}

module.exports = new PropertyRepository();
