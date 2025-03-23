import React from 'react';
import { X } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';

const PropertyDetails = () => {
	const { selectedProperty, setSelectedProperty, formatCurrency, getStatusColor, availablePropertiesCount, totalPropertiesCount } = useProperty();

	const handleClose = () => {
		setSelectedProperty(null);
	};

	if (!selectedProperty) {
		return (
			<div>
				<h2 className="text-xl font-bold mb-4">Development Overview</h2>
				<p className="mb-6">
					Click on a property in the map to view details. Balmoston offers a range of property types including detached, semi-detached, and terraced
					homes in a beautiful setting.
				</p>

				<div className="mb-6 prim-fg-1">
					<h3 className="font-semibold mb-2">Available Properties</h3>
					<div className="bg-gray-50 p-4 rounded available-prop">
						<div className="grid grid-cols-2 gap-4 prim-fg-1">
							<div>
								<div className="text-2xl font-bold">{availablePropertiesCount}</div>
								<div className="text-sm">Available</div>
							</div>
							<div>
								<div className="text-2xl font-bold">{totalPropertiesCount}</div>
								<div className="text-sm">Total Properties</div>
							</div>
						</div>
					</div>
				</div>

				<button className="w-full py-2 prim-bg-1 text-white rounded hover:underline transition-colors">Download Brochure</button>
			</div>
		);
	}

	return (
		<div className="relative">
			<button className="absolute top-0 right-0 p-1 bg-white rounded-full shadow hover:bg-gray-100" onClick={handleClose}>
				<X size={16} />
			</button>

			<h2 className="text-xl font-bold mb-3 pr-6">{selectedProperty.title}</h2>

			<div className="mb-3">
				<div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(selectedProperty.status)}`}>
					{selectedProperty.status}
				</div>
				<div className="inline-block ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">{selectedProperty.type}</div>
			</div>

			<div className="mb-4">
				<img src={selectedProperty.imageUrl} alt={`${selectedProperty.title} exterior`} className="w-full h-40 object-cover rounded mb-2" />
			</div>

			<div className="text-2xl font-bold prim-fg-1 mb-4">{formatCurrency(selectedProperty.price)}</div>

			<div className="grid grid-cols-3 gap-4 mb-4">
				<div className="text-center">
					<div className="font-semibold text-lg">{selectedProperty.bedrooms}</div>
					<div className="text-sm text-gray-500">Bedrooms</div>
				</div>
				<div className="text-center">
					<div className="font-semibold text-lg">{selectedProperty.bathrooms}</div>
					<div className="text-sm text-gray-500">Bathrooms</div>
				</div>
				<div className="text-center">
					<div className="font-semibold text-lg">{selectedProperty.squareFootage}</div>
					<div className="text-sm text-gray-500">Sq Ft</div>
				</div>
			</div>

			{selectedProperty.description && (
				<div className="mb-4">
					<h3 className="font-semibold mb-1">Description</h3>
					<p className="text-sm text-gray-600">{selectedProperty.description}</p>
				</div>
			)}

			{selectedProperty.features && selectedProperty.features.length > 0 && (
				<div className="mb-4">
					<h3 className="font-semibold mb-1">Features</h3>
					<ul className="text-sm text-gray-600">
						{selectedProperty.features.map((feature, index) => (
							<li key={index} className="flex items-start mb-1">
								<span className="mr-2">•</span>
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			<button className="w-full py-2 prim-bg-1 text-white rounded transition-colors">Request Information</button>
		</div>
	);
};

export default PropertyDetails;
