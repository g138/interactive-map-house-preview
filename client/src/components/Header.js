import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white shadow-sm py-4 px-4 sm:px-6">
			{/* Desktop Header */}
			<div className="hidden md:flex justify-between items-center">
				<img src="/images/glenveagh_logo.svg" alt="Glenveagh Logo" className="max-w-full block h-8" />

				<h1 className="text-2xl font-bold prim-fg-1">Balmoston, Donabate</h1>

				<button className="px-3 py-2 prim-bg-1 text-white rounded-md hover:bg-opacity-90 transition-colors">Contact Sales</button>
			</div>

			{/* Mobile Header */}
			<div className="flex md:hidden justify-between items-center">
				<img src="/images/glenveagh_logo.svg" alt="Glenveagh Logo" className="max-w-full block h-7" />

				{/* Always visible centered title */}
				<h1 className="text-lg font-bold prim-fg-1 absolute left-1/2 transform -translate-x-1/2">Balmoston, Donabate</h1>

				<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 rounded-md text-gray-600 hover:bg-gray-100 ml-auto">
					{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="md:hidden pt-4 pb-3 mt-2 border-t">
					<button className="w-full px-3 py-2 prim-bg-1 text-white rounded-md hover:bg-opacity-90 transition-colors mb-3">Contact Sales</button>
					<p className="text-gray-600 text-sm">Interactive property map for the Balmoston development</p>
				</div>
			)}
		</header>
	);
};

export default Header;
