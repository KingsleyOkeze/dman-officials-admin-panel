import React, { createContext, useState } from "react";
import { useRef } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


    // MODAL FUNCTIONS 
    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };
    
    // const handleConfirmDelete = (item) => {
    //     // Perform delete operation here
    //     console.log(`Deleted product: ${item}`);
    //     setModalOpen(false);
    //     setSelectedItem(null);
    // };
    
    const handleCancelDelete = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };


    return (
        <ModalContext.Provider value={{ 
            isModalOpen, 
            setModalOpen,
            selectedItem,
            setSelectedItem,
            handleDeleteClick,
            handleCancelDelete
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
