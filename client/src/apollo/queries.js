import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
	query GetProperties($filter: PropertyFilterInput) {
		listProperties(filter: $filter) {
			id
			house_id
			title
			description
			price
			bedrooms
			bathrooms
			squareFootage
			status
			type
			features
			imageUrl
			x
			y
			section
			text
		}
	}
`;

export const GET_PROPERTY = gql`
	query GetProperty($id: ID!) {
		property(house_id: $id) {
			id
			house_id
			title
			description
			price
			bedrooms
			bathrooms
			squareFootage
			status
			type
			features
			imageUrl
			x
			y
			section
			text
		}
	}
`;

export const GET_HOUSE_BY_LOCATION = gql`
	query GetHouseByLocation($x: Float!, $y: Float!) {
		getHouseByLocation(x: $x, y: $y) {
			id
			house_id
			title
			description
			price
			bedrooms
			bathrooms
			squareFootage
			status
			type
			features
			imageUrl
			x
			y
			section
			text
		}
	}
`;
