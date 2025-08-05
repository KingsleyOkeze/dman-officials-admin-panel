import { FaSearch } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import "../../styles/pages-styles/home-pages-styles/HomePage.css";
import { useContext, useEffect, useRef, useState } from "react";
import Alert from "../../components/Alert";
import HomeProductStatusesOverview from "./home-product-statuses-overview/HomeProductStatusesOverview";
import HomeOrderStatusesOverview from "./home-order-statuses-overview/HomeOrderStatusesOverview";
import HomeTable from "./home-table/HomeTable";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import axios from "axios";


function HomePage () {
    const navigate = useNavigate(); 
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const { searchInput, setSearchInput, totalPages, searchResult } = useContext(SearchContext);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searchTotalPages, setSearchTotalPages] = useState(0);

    const [showProductStatuses, setShowProductStatuses] = useState(true);
    const [showProductOrderStatuses, setShowProductOrderStatuses] = useState(true);

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
    
        if (searchInput.length > 0) {
            if (screenWidth < 986) {
                setShowProductStatuses(false);
                setShowProductOrderStatuses(false);
            } else {
                setShowProductStatuses(false);
                setShowProductOrderStatuses(false); // Show on large screens
            }
        } else {
            setShowProductStatuses(true);
            setShowProductOrderStatuses(true); // Show when no search input
        }
    }, [searchInput, screenWidth]); // Removed unnecessary dependencies
    

    

    return(
        <div className="home-page-container">
             {/*customAlert.visibility === true && (
                <Alert
                    status={customAlert.status}
                    title={customAlert.title}
                    message={customAlert.message}
                />
            )*/}
            <div className="home-page-search-and-header-container">
            <div className="home-page-main-search-container">
                <input type="text" 
                    className="home-page-main-search-input"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="home-page-main-search-input-icon">
                    <FaSearch/>
                </div>
            </div>
            <div className="home-page-main-header-container">
                <p className="home-page-main-header-my-product-text">My Products</p>
                <div className="home-page-main-header-add-new-text-and-icon-container"
                    onClick={() => navigate("/admin/product-page") }>
                    <GrAddCircle className="home-page-main-header-add-new-icon"/>
                    <p className="home-page-main-header-add-new-text">Add New</p>
                </div>
            </div>
            </div>
            <div className="home-page-main-content-container">
                {/* Product status overview boxes*/}
                { showProductStatuses && <HomeProductStatusesOverview/> }

                {/* Order status overview section*/}
                { showProductOrderStatuses && <HomeOrderStatusesOverview /> }

                {/* Home page Table section*/}
                <HomeTable 
                    searchResult={searchResult}
                    searchTotalPages={searchTotalPages}
                    searchInput={searchInput}
                />

            </div>
            

        </div>
    )
}


export default HomePage;