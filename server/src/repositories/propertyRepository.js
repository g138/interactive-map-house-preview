const { getCollection } = require('../db/dbClient');

class PropertyRepository {
	constructor() {
		this.collectionName = process.env.COSMOS_DB_COLLECTION;
	}

	// Get all properties with optional filtering
	async getProperties(filter = {}) {
		const collection = await getCollection(this.collectionName);
		const properties = await collection.find(filter).toArray();

		return properties;
	}

	// Get property by coordinates (x,y)
	async getPropertyByCoordinates(x, y) {
		const collection = await getCollection(this.collectionName);
		const properties = await collection.find().toArray();

		const property = properties.find((property) => {
			return property.x === x && property.y === y;
		});

		return property;
	}
}

module.exports = new PropertyRepository();
