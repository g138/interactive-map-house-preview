const { isPointInPolygon } = require('../../utils/mapUtils');

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

// Resolvers
const resolvers = {
	Query: {
		listProperties: () => {
			return properties;
		},
		getHouseByLocation: (_, { x, y }) => {
			console.log(`Looking for property at coordinates: (${x}, ${y})`);

			// Find property whose area contains the clicked point
			const property = properties.find((property) => {
				const halfWidth = property.width / 2;
				const halfHeight = property.height / 2;

				// Check if point is within rectangular area
				return x >= property.x - halfWidth && x <= property.x + halfWidth && y >= property.y - halfHeight && y <= property.y + halfHeight;
			});

			if (property) {
				console.log(`Found property: ${property.title}`);
			} else {
				console.log('No property found at these coordinates');
			}

			return property || null;
		},
	},
};

module.exports = { resolvers };
