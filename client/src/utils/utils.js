// Format currency
export const formatCurrency = (amount) => {
	return new Intl.NumberFormat('en-IE', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0,
	}).format(amount);
};

// Get status color
export const getStatusColor = (status) => {
	switch (status) {
		case 'AVAILABLE':
			return 'bg-green-600';
		case 'RESERVED':
			return 'bg-orange-500';
		case 'SOLD':
			return 'bg-red-600';
		case 'COMING_SOON':
			return 'bg-purple-600';
		default:
			return 'bg-gray-500';
	}
};
