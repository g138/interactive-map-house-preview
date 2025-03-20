import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { PropertyProvider } from './context/PropertyContext';

import InteractivePropertyMap from './components/InteractivePropertyMap';
import './App.css';

function App() {
	return (
		<ApolloProvider client={client}>
			<PropertyProvider>
				<InteractivePropertyMap />
			</PropertyProvider>
		</ApolloProvider>
	);
}

export default App;
