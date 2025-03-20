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
    mapCoordinates: [Float!]!
    section: String!
    plotNumber: String!
  }
  
  type Query {
    property(id: ID!): Property
    propertyByCoordinates(x: Float!, y: Float!): Property
    listProperties: [Property!]!
  }
`;

module.exports = { typeDefs };