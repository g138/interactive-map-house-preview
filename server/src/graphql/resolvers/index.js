const properties = [
	{
		id: '1',
		title: '4 Bedroom Detached - Plot 14',
		description: 'A beautiful 4 bedroom detached home...',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 715, // The center X coordinate of plot 9
		y: 85, // The center Y coordinate of plot 9
		width: 15, // Width of the clickable area
		height: 15, // Height of the clickable area
		section: 'The Grove',
		plotNumber: '9',
	},
	{
		id: '2',
		title: '4 Bedroom Detached - Plot 13',
		description: 'A beautiful 4 bedroom detached home...',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 735, // The center X coordinate of plot 9
		y: 85, // The center Y coordinate of plot 9
		width: 15, // Width of the clickable area
		height: 15, // Height of the clickable area
		section: 'The Grove',
		plotNumber: '9',
	},
	{
		id: '3',
		title: '4 Bedroom Detached - Plot 12',
		description: 'A beautiful 4 bedroom detached home...',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 750, // The center X coordinate of plot 9
		y: 85, // The center Y coordinate of plot 9
		width: 15, // Width of the clickable area
		height: 15, // Height of the clickable area
		section: 'The Grove',
		plotNumber: '9',
	},
	{
		id: '4',
		title: '4 Bedroom Detached - Plot 11',
		description: 'A beautiful 4 bedroom detached home...',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 770, // The center X coordinate of plot 9
		y: 85, // The center Y coordinate of plot 9
		width: 15, // Width of the clickable area
		height: 15, // Height of the clickable area
		section: 'The Grove',
		plotNumber: '9',
	},
	{
		id: '5',
		title: '4 Bedroom Detached - Plot 10',
		description: 'A beautiful 4 bedroom detached home...',
		type: 'DETACHED',
		status: 'AVAILABLE',
		price: 450000,
		bedrooms: 4,
		bathrooms: 3,
		squareFootage: 1800,
		features: ['Energy-efficient heating system', 'Contemporary kitchen', 'Spacious garden', 'Off-street parking'],
		imageUrl: '/images/placeholder-house.jpg',
		x: 790, // The center X coordinate of plot 9
		y: 85, // The center Y coordinate of plot 9
		width: 15, // Width of the clickable area
		height: 15, // Height of the clickable area
		section: 'The Grove',
		plotNumber: '9',
	},
];

const propertyRepository = require('../../repositories/propertyRepository');

// Resolvers
const resolvers = {
	Query: {
		property: async (_, { id }) => {
			return propertyRepository.getPropertyById(id);
		},

		getHouseByLocation: async (_, { x, y }) => {
			console.log(`Looking for property at coordinates: (${x}, ${y})`);
			return propertyRepository.getPropertyByCoordinates(x, y);
		},

		listProperties: async (_, { filter }) => {
			// Convert GraphQL filter to MongoDB filter
			const mongoFilter = {};

			if (filter) {
				if (filter.priceMin !== undefined && filter.priceMax !== undefined) {
					mongoFilter.price = { $gte: filter.priceMin, $lte: filter.priceMax };
				} else if (filter.priceMin !== undefined) {
					mongoFilter.price = { $gte: filter.priceMin };
				} else if (filter.priceMax !== undefined) {
					mongoFilter.price = { $lte: filter.priceMax };
				}

				if (filter.bedrooms !== undefined) {
					mongoFilter.bedrooms = filter.bedrooms;
				}

				if (filter.status !== undefined) {
					mongoFilter.status = filter.status;
				}

				if (filter.section !== undefined) {
					mongoFilter.section = filter.section;
				}
			}

			return propertyRepository.getProperties(mongoFilter);
		},
	},

	Mutation: {
		createProperty: async (_, { input }) => {
			return propertyRepository.createProperty(input);
		},

		updateProperty: async (_, { id, input }) => {
			return propertyRepository.updateProperty(id, input);
		},

		deleteProperty: async (_, { id }) => {
			return propertyRepository.deleteProperty(id);
		},

		requestPropertyViewing: async (_, { propertyId, name, email, phone }) => {
			// In a real implementation, you would save this to a separate collection
			console.log(`Request viewing for property ${propertyId} from ${name} (${email})`);
			return true;
		},
	},

	Property: {
		id: (parent) => {
			// Debug the parent object
			console.log('Parent object:', parent);

			// Check for MongoDB _id (most likely)
			if (parent._id) {
				return parent._id.toString();
			}

			// Check for existing id
			if (parent.id) {
				return parent.id;
			}

			// If neither exists, log error and return a placeholder
			console.error('Property missing both _id and id:', parent);
			return 'unknown-id';
		},
	},
};

module.exports = { resolvers };
