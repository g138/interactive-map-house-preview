const propertyRepository = require('../../repositories/propertyRepository');

// Resolvers
const resolvers = {
	Query: {
		getHouseByLocation: async (_, { x, y }) => {
			console.log(`Looking for property at coordinates: (${x}, ${y})`);
			return propertyRepository.getPropertyByCoordinates(x, y);
		},

		listProperties: async (_, { filter }) => {
			// Convert GraphQL filter to MongoDB filter
			const mongoFilter = {};

			if (filter) {
				// Price range filter
				if (filter.priceMin !== undefined && filter.priceMax !== undefined) {
					mongoFilter.price = { $gte: filter.priceMin, $lte: filter.priceMax };
				} else if (filter.priceMin !== undefined) {
					mongoFilter.price = { $gte: filter.priceMin };
				} else if (filter.priceMax !== undefined) {
					mongoFilter.price = { $lte: filter.priceMax };
				}

				// Bedrooms filter
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

	Property: {
		id: (parent) => {
			if (parent._id) {
				return parent._id.toString();
			}

			if (parent.id) {
				return parent.id;
			}

			console.error('Property missing both _id and id:', parent);
			return 'unknown-id';
		},
	},
};

module.exports = { resolvers };
