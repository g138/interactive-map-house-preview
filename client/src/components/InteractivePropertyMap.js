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
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [cursor, setCursor] = useState('grab');
	const mapContainerRef = useRef(null);

	// Update cursor based on dragging state
	useEffect(() => {
		setCursor(isDragging ? 'grabbing' : 'grab');
	}, [isDragging]);

	// Prevent default wheel behavior
	useEffect(() => {
		const mapContainer = mapContainerRef.current;

		if (mapContainer) {
			const preventDefault = (e) => e.preventDefault();
			mapContainer.addEventListener('wheel', preventDefault, { passive: false });

			return () => {
				mapContainer.removeEventListener('wheel', preventDefault);
			};
		}
	}, []);

	// Fetch properties using Apollo Client
	const { loading, error, data } = useQuery(GET_PROPERTIES);

	// Update properties in context when data is loaded
	useEffect(() => {
		if (data?.listProperties) {
			setProperties(data.listProperties);
		}
	}, [data, setProperties]);

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

	// Mouse events for drag and zoom
	const handleMouseDown = (e) => {
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;

		requestAnimationFrame(() => {
			const dx = (e.clientX - dragStart.x) / scale;
			const dy = (e.clientY - dragStart.y) / scale;

			setPosition({
				x: position.x + dx,
				y: position.y + dy,
			});

			setDragStart({ x: e.clientX, y: e.clientY });
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	// Mouse wheel zoom
	const handleWheel = (e) => {
		e.preventDefault();

		// Determine zoom direction
		const delta = e.deltaY < 0 ? 1.1 : 0.9;

		// Calculate cursor position relative to the map
		const rect = mapContainerRef.current.getBoundingClientRect();
		const cursorX = (e.clientX - rect.left) / scale;
		const cursorY = (e.clientY - rect.top) / scale;

		// Calculate new scale
		const newScale = Math.min(Math.max(scale * delta, 0.5), 3);

		// Adjust position to zoom toward cursor position
		const scaleFactor = newScale / scale;
		const newX = cursorX - (cursorX - position.x) * scaleFactor;
		const newY = cursorY - (cursorY - position.y) * scaleFactor;

		// Update state
		setScale(newScale);
		setPosition({ x: newX, y: newY });
	};

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

	// Handle map click to select properties
	const handleMapClick = (e) => {
		if (loading || isDragging) return;

		const rect = mapContainerRef.current.getBoundingClientRect();
		const x = Math.round((e.clientX - rect.left) / scale - position.x);
		const y = Math.round((e.clientY - rect.top) / scale - position.y);

		console.log(`Clicked at coordinates: (${x}, ${y})`);

		// Use GraphQL query to find property at these coordinates
		getHouseByLocation({ variables: { x, y } });
	};

	// Render property rectangles
	const renderPropertyRectangles = () => {
		return properties.map((property) => {
			// Check if this property is selected
			const isSelected = selectedProperty && selectedProperty.id === property.id;
			const fillColor = isSelected ? 'rgba(20, 184, 166, 0.5)' : 'rgba(20, 184, 166, 0.2)';
			const strokeColor = isSelected ? 'rgb(20, 184, 166)' : 'rgba(20, 184, 166, 0.6)';

			// Calculate rectangle coordinates
			const halfWidth = property.width / 2;
			const halfHeight = property.height / 2;
			const x = property.x - halfWidth;
			const y = property.y - halfHeight;

			return <rect key={property.id} x={x} y={y} width={property.width} height={property.height} fill={fillColor} stroke={strokeColor} strokeWidth="2" />;
		});
	};

	return (
		<div className="flex flex-col w-full min-h-screen bg-gray-50">
			{/* Header */}
			<Header />

			{/* Main content */}
			<div className="flex flex-col lg:flex-row flex-1 p-4">
				{/* Map container */}
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
							<div
								ref={mapContainerRef}
								className="relative overflow-hidden"
								style={{ cursor }}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
								onClick={handleMapClick}
								onWheel={handleWheel}>
								<div
									style={{
										transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
										transformOrigin: '0 0',
										transition: isDragging ? 'none' : 'transform 0.1s ease-out',
									}}>
									<img src="/images/Balmoston_Sample.svg" alt="Balmoston Donabate Property Map" className="max-w-full block" />

									{/* Property Overlays */}
									<svg
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											pointerEvents: 'none',
										}}>
										{renderPropertyRectangles()}
									</svg>
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
