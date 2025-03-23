const { gql } = require('apollo-server-express');

// Type definitions
const typeDefs = gql`
	type Property {
		id: ID!
		house_id: String! # Original ID from SVG
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
		x: Float!
		y: Float!
		section: String!
		text: [String]
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
`;

module.exports = { typeDefs };
