import React, { createContext, useState } from "react";
import { useRef } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [customAlert, setCustomAlert] = useState({ type: null, message: null });
    const alertTimeout = useRef(null);

    const showAlert = (type, message) => {
        setCustomAlert({ type, message });

        // Automatically dismiss the alert after 7 seconds
        alertTimeout.current = setTimeout(() => {
            setCustomAlert({ type: null, message: null });
        }, 7000);

         // Clear any existing timeout to prevent overlap
         if (alertTimeout.current) clearTimeout(alertTimeout);
    };

    return (
        <AlertContext.Provider value={{ 
            customAlert, 
            setCustomAlert, 
            showAlert 
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
