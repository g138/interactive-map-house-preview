// Sample data for development
const properties = [
    {
      id: '1',
      title: '4 Bedroom Detached - Plot 9',
      description: 'A beautiful 4 bedroom detached home located in the desirable Grove section.',
      type: 'DETACHED',
      status: 'AVAILABLE',
      price: 450000,
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 1800,
      features: [
        'Energy-efficient heating system',
        'Contemporary kitchen',
        'Spacious garden',
        'Off-street parking'
      ],
      imageUrl: '/placeholder-house.jpg',
      mapCoordinates: [720, 150, 740, 150, 740, 170, 720, 170],
      section: 'The Grove',
      plotNumber: '9'
    },
    {
      id: '2',
      title: '3 Bedroom Semi-Detached - Plot 10',
      description: 'This charming 3 bedroom semi-detached property offers a perfect balance of comfort and style.',
      type: 'SEMI_DETACHED',
      status: 'RESERVED',
      price: 380000,
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1500,
      features: [
        'High-quality finishes',
        'Fitted wardrobes',
        'Modern kitchen appliances',
        'Downstairs WC'
      ],
      imageUrl: '/placeholder-house.jpg',
      mapCoordinates: [740, 180, 760, 180, 760, 200, 740, 200],
      section: 'The Grove',
      plotNumber: '10'
    },
  ];
  
  // Point-in-polygon algorithm for coordinate lookup
  const isPointInPolygon = (point, polygon) => {
    const x = point.x;
    const y = point.y;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
      const xi = polygon[i];
      const yi = polygon[i + 1];
      const xj = polygon[j];
      const yj = polygon[j + 1];
      
      const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          
      if (intersect) inside = !inside;
      j = i;
    }
    
    return inside;
  };
  
  // Resolvers
  const resolvers = {
    Query: {
      property: (_, { id }) => {
        return properties.find(property => property.id === id);
      },
      propertyByCoordinates: (_, { x, y }) => {
        return properties.find(property => 
          isPointInPolygon({ x, y }, property.mapCoordinates)
        );
      },
      listProperties: () => {
        return properties;
      }
    }
  };
  
  module.exports = { resolvers };