// client/src/components/FilterPanel.js
import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

const FilterPanel = ({ onApplyFilters, onResetFilters }) => {
	const [priceMin, setPriceMin] = useState('');
	const [priceMax, setPriceMax] = useState('');
	const [bedrooms, setBedrooms] = useState('');

	const handleApplyFilters = () => {
		const filters = {};

		if (priceMin) filters.priceMin = parseInt(priceMin, 10);
		if (priceMax) filters.priceMax = parseInt(priceMax, 10);
		if (bedrooms) filters.bedrooms = parseInt(bedrooms, 10);

		onApplyFilters(filters);
	};

	const handleResetFilters = () => {
		setPriceMin('');
		setPriceMax('');
		setBedrooms('');
		onResetFilters();
	};

	return (
		<div className="mb-4 bg-white rounded-md shadow-md p-3">
			<div className="flex justify-between items-center mb-2">
				<div className="flex items-center">
					<Filter size={18} className="mr-2 text-gray-600" />
					<h3 className="font-semibold">Filter Properties</h3>
				</div>
			</div>

			<div className="space-y-3">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Price Range (€)</label>
					<div className="flex space-x-2">
						<input
							type="number"
							placeholder="Min"
							className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:prim-bg-1 focus:prim-bg-1 sm:text-sm"
							value={priceMin}
							onChange={(e) => setPriceMin(e.target.value)}
						/>
						<input
							type="number"
							placeholder="Max"
							className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:prim-bg-1 focus:prim-bg-1 sm:text-sm"
							value={priceMax}
							onChange={(e) => setPriceMax(e.target.value)}
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
					<select
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:prim-bg-1 focus:prim-bg-1 sm:text-sm"
						value={bedrooms}
						onChange={(e) => setBedrooms(e.target.value)}>
						<option value="">Any</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5+</option>
					</select>
				</div>

				<div className="flex space-x-2 pt-2">
					<button
						className="w-1/2 px-4 py-2  text-white rounded-md prim-bg-1 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:prim-bg-1"
						onClick={handleApplyFilters}>
						Apply Filters
					</button>
					<button
						className="w-1/2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						onClick={handleResetFilters}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
