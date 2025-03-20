import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
	query GetProperties {
		listProperties {
			id
			title
			price
			bedrooms
			bathrooms
			squareFootage
			status
			type
			imageUrl
			x
			y
			width
			height
			section
			plotNumber
		}
	}
`;

export const GET_PROPERTY = gql`
	query GetProperty($id: ID!) {
		property(id: $id) {
			id
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
			width
			height
			section
			plotNumber
		}
	}
`;

export const GET_HOUSE_BY_LOCATION = gql`
	query GetHouseByLocation($x: Float!, $y: Float!) {
		getHouseByLocation(x: $x, y: $y) {
			id
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
			width
			height
			section
			plotNumber
		}
	}
`;
