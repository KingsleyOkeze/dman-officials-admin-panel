import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchContext = createContext(); 

export const SearchProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchTotalPages, setSearchTotalPages] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    // const previousPath = useRef(location.pathname); // Store the previous path


    const handleSearchInput = async () => {
        if (searchInput.length > 0) {
            try {
                const response = await axios.get(
                    `/customer/search-product?searchInput=${searchInput}&page=0&limit=7`
                );

                if (response.status === 200) {
                    console.log('search result is', response.data.result);
                    setSearchResult(response.data.result);
                    setSearchTotalPages(response.data.totalPages);
            }
            } catch (err) {
            // if (err.response) {
            //     const status = err.response.status;
            //     const errMessage = err.response.data.error;
            //     if (status) {
            //         showAlert("error", errMessage);
            //     }
            // } else {
            //     showAlert("error", "Unknown error occurred while searching!");
            // }
            console.log("err searching ", err)
            }
        } 
    };

    useEffect(() => {
        handleSearchInput();
    }, [searchInput])

    return (
        <SearchContext.Provider value={{
            searchInput, 
            setSearchInput,
            handleSearchInput,
            searchResult,
            searchTotalPages
        }}>
            {children}
        </SearchContext.Provider>
    )
}