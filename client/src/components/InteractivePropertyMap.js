/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { GET_PROPERTIES, GET_HOUSE_BY_LOCATION } from '../apollo/queries';
import PropertyDetails from './PropertyDetails';
import { useProperty } from '../context/PropertyContext';
import Header from './Header';

const InteractivePropertyMap = () => {
	const { selectedProperty, setSelectedProperty, properties, setProperties } = useProperty();
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const svgRef = useRef(null);

	const { loading, error, data } = useQuery(GET_PROPERTIES);

	useEffect(() => {
		if (data?.listProperties) {
			setProperties(data.listProperties);
		}
	}, [data, setProperties]);

	// Add event listeners to SVG elements
	useEffect(() => {
		const handleSvgLoad = () => {
			const houseData = [];

			setTimeout(() => {
				if (!svgRef.current) return;

				const svgDoc = svgRef.current.contentDocument;
				if (!svgDoc) return;

				const housesGroup = svgDoc.getElementById('Houses__x26__Apartments');

				if (!housesGroup) {
					console.error("Couldn't find the Houses & Apartments group in the SVG");
					return;
				}

				const groupElements = housesGroup.querySelectorAll('g[id]');

				groupElements.forEach((group) => {
					const groupId = group.getAttribute('id');
					const textElements = group.querySelectorAll('text tspan');
					const textContents = Array.from(textElements).map((el) => el.textContent);
					const rectElement = group.querySelector('rect');

					const groupData = {
						house_id: groupId,
						text: textContents.length > 0 ? textContents : [],
						x: rectElement ? parseFloat(rectElement.getAttribute('x')) : null,
						y: rectElement ? parseFloat(rectElement.getAttribute('y')) : null,
						element: group,
					};

					group.addEventListener('click', (e) => {
						e.stopPropagation();
						var x = groupData.x;
						var y = groupData.y;

						getHouseByLocation({ variables: { x, y } });
					});
				});
			}, 500);
		};

		// Set up event listener for when the SVG loads
		const svgElement = svgRef.current;
		if (svgElement) {
			svgElement.addEventListener('load', handleSvgLoad);

			return () => {
				svgElement.removeEventListener('load', handleSvgLoad);
			};
		}
	}, [properties, setSelectedProperty]);

	// Set up a lazy query for fetching property by click location
	const [getHouseByLocation, { loading: locationLoading }] = useLazyQuery(GET_HOUSE_BY_LOCATION, {
		onCompleted: (data) => {
			if (data.getHouseByLocation) {
				setSelectedProperty(data.getHouseByLocation);
			} else {
				setSelectedProperty(null);
			}
		},
	});

	// Zoom controls
	const handleZoomIn = () => {
		setScale((prevScale) => Math.min(prevScale * 1.2, 3));
	};

	const handleZoomOut = () => {
		setScale((prevScale) => Math.max(prevScale / 1.2, 0.5));
	};

	const handleReset = () => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-gray-50">
			{/* Header */}
			<Header />

			<div className="flex flex-col lg:flex-row flex-1 p-4">
				<div className="flex-1 bg-white rounded-md shadow-md overflow-hidden mb-4 lg:mb-0 lg:mr-4">
					<div className="flex justify-between items-center p-4 border-b">
						<h2 className="text-lg font-semibold prim-fg-1">Interactive Property Map</h2>

						<div className="flex">
							<button className="p-1 mr-1 border rounded hover:bg-gray-50" onClick={handleZoomIn}>
								<ZoomIn size={18} />
							</button>
							<button className="p-1 mr-1 border rounded hover:bg-gray-50" onClick={handleZoomOut}>
								<ZoomOut size={18} />
							</button>
							<button className="p-1 mr-1 border rounded hover:bg-gray-50" onClick={handleReset}>
								<Maximize size={18} />
							</button>
						</div>
					</div>

					<div className="p-2 relative">
						{loading ? (
							<div className="flex justify-center items-center h-64">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
							</div>
						) : error ? (
							<div className="flex flex-col justify-center items-center h-64 text-center">
								<h3 className="text-lg font-semibold mb-1">Error Loading Map Data</h3>
								<p className="text-gray-600 max-w-md mb-4">We were unable to load the property map data. Please try again later.</p>
								<button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => window.location.reload()}>
									Retry
								</button>
							</div>
						) : (
							<div className="relative overflow-hidden">
								<div>
									<object
										ref={svgRef}
										data="/images/Balmoston_Sample.svg"
										type="image/svg+xml"
										className="max-w-full block"
										style={{ pointerEvents: 'auto' }}
									/>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Property details panel */}
				<div className="w-full lg:w-1/3 property-details rounded-md shadow-md p-4">
					<PropertyDetails />
				</div>
			</div>
		</div>
	);
};

export default InteractivePropertyMap;
