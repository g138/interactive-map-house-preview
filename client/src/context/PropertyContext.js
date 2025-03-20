import React, { createContext, useContext, useState } from 'react';
import { formatCurrency, getStatusColor } from '../utils/utils';

// Create the context
const PropertyContext = createContext();

// Provider component
export const PropertyProvider = ({ children }) => {
	const [selectedProperty, setSelectedProperty] = useState(null);
	const [properties, setProperties] = useState([]);

	// Calculate derived properties
	const availablePropertiesCount = properties.filter((p) => p.status === 'AVAILABLE').length;
	const totalPropertiesCount = properties.length;

	// Value object to be provided to consumers
	const value = {
		selectedProperty,
		setSelectedProperty,
		properties,
		setProperties,
		formatCurrency,
		getStatusColor,
		availablePropertiesCount,
		totalPropertiesCount,
	};

	return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

// Custom hook to use the property context
export const useProperty = () => {
	const context = useContext(PropertyContext);
	if (context === undefined) {
		throw new Error('useProperty must be used within a PropertyProvider');
	}
	return context;
};
