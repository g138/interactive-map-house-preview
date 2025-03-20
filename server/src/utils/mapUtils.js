/**
 * Checks if a point is inside a polygon using ray-casting algorithm
 * @param {Object} point - The point {x, y}
 * @param {Array} polygon - Array of coordinates [x1, y1, x2, y2, ...]
 * @returns {Boolean} True if the point is inside the polygon
 */
const isPointInPolygon = (point, polygon) => {
	const x = point.x;
	const y = point.y;
	let inside = false;

	for (let i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
		const xi = polygon[i];
		const yi = polygon[i + 1];
		const xj = polygon[j];
		const yj = polygon[j + 1];

		const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

		if (intersect) inside = !inside;
		j = i;
	}

	return inside;
};

module.exports = {
	isPointInPolygon,
};
