import { createContext, useEffect, useState } from 'react';

// Create the context
export const SubHeaderContext = createContext();

// Create a provider component
export const SubHeaderProvider  = ({ children }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isSubHeaderOpen, setIsSubHeaderOpen] = useState(screenWidth >= 986 ? true : false);

    const toggleSubHeader = () => {
        setIsSubHeaderOpen(!isSubHeaderOpen);
    };
    
    return (
        <SubHeaderContext.Provider value={{ isSubHeaderOpen, setIsSubHeaderOpen, toggleSubHeader }}>
            {children}
        </SubHeaderContext.Provider>
    );
}