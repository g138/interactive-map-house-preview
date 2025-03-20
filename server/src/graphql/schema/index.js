const { gql } = require('apollo-server-express');

// Type definitions
const typeDefs = gql`
	type Property {
		id: ID!
		title: String!
		description: String
		type: String!
		status: String!
		price: Float!
		bedrooms: Int!
		bathrooms: Int!
		squareFootage: Int!
		features: [String!]
		imageUrl: String!

		# Only use x/y coordinates
		x: Float! # X coordinate on map
		y: Float! # Y coordinate on map
		width: Float! # Width of clickable area
		height: Float! # Height of clickable area
		section: String!
		plotNumber: String!
	}

	input PropertyFilterInput {
		priceMin: Float
		priceMax: Float
		bedrooms: Int
		status: String
		section: String
	}

	type Query {
		property(id: ID!): Property
		getHouseByLocation(x: Float!, y: Float!): Property
		listProperties(filter: PropertyFilterInput): [Property!]!
	}

	type Mutation {
		requestPropertyViewing(propertyId: ID!, name: String!, email: String!, phone: String): Boolean!
	}
`;

module.exports = { typeDefs };
