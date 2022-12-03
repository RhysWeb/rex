import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<DataContext.Provider value={{ flipped, setFlipped }}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
