import React from 'react';

const Header = () => {
	return (
		<header className="bg-white shadow-sm py-4 px-6">
			<div className="flex justify-between items-center">
				<img src="/images/glenveagh_logo.svg" alt="Gelnveafh Logo" className="max-w-full block h-8" />

				<h1 className="text-2xl font-bold prim-fg-1">Balmoston, Donabate</h1>

				<button className="px-3 py-2 prim-bg-1 text-white rounded-md hover:underline">Contact Sales</button>
			</div>
		</header>
	);
};

export default Header;
