import { useContext, useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/home-product-statuses-overview-styles/HomeProductStatusesOverview.css";
import { FiPackage } from "react-icons/fi";
import { PiDotsThreeVertical } from "react-icons/pi";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { SearchContext } from "../../../contexts/SearchContext";
import { ModalContext } from "../../../contexts/ModalContext";


function HomeProductStatusesOverview () {
    const { accessToken, adminId } = useContext(AuthContext);
    const [homePageProductStatuses, setHomePageProductStatuses] = useState({});
    const { handleDeleteClick } = useContext(ModalContext);

    // CONVERT THE VALUES FOR EACH ITEMS IN homePageProductStatuses state TO PERCENTAGE
    const firstBoxProgress = (homePageProductStatuses.allProducts / homePageProductStatuses.allProducts) * 100;
    const secondBoxProgress = (homePageProductStatuses.outOfStock / homePageProductStatuses.allProducts) * 100;
    const thirdBoxProgress = (homePageProductStatuses.limitedStock / homePageProductStatuses.allProducts) * 100;
    const fourthBoxProgress = (homePageProductStatuses.availableStock / homePageProductStatuses.allProducts) * 100;

    const firstBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#007aff", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${firstBoxProgress}%`, // Dynamic width based on progress prop
        },
    }
    const secondsBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#B80000", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${secondBoxProgress}%`, // Dynamic width based on progress prop
       },
    }
    const thirdBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#FFA500", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${thirdBoxProgress}%`, // Dynamic width based on progress prop
        },
    }
    const fourthBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#008C00", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${fourthBoxProgress}%`, // Dynamic width based on progress prop
        },
    }

    const handleFetchHomePageProductStatuses = async () => {

        try {
            const response = await axios.get("/admin/fetch-home-page-product-statuses",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log('home product statuses', response.data)
                setHomePageProductStatuses(response.data)
            }
        } catch (err) {
            console.log("err fetch-home-page-order-statuses", err)
        }
    };


    useEffect(() => {
        handleFetchHomePageProductStatuses();
    }, []);


    useEffect(() => {
        handleFetchHomePageProductStatuses();
    }, [handleDeleteClick]); // Refetch when an item is deleted.

    return (
        <>
            <div className="home-page-overview-boxes-container">
                <div className="home-page-overview-first-box">
                    <div className="home-page-overview-box-head">
                        <span className="home-page-overview-first-box-package-icon-span">
                            <FiPackage className="home-page-overview-first-box-package-icon"/>
                        </span>
                        <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                    </div>
                    <p className="home-page-overview-first-box-title">All Products</p>
                    <div className="home-page-overview-first-box-progress-bar-container">
                        <div style={firstBoxStyles.bar}></div>
                    </div>
                    <p className="home-page-overview-first-box-number">{homePageProductStatuses.allProducts} Products</p>
                </div>
                <div className="home-page-overview-second-box">
                    <div className="home-page-overview-box-head">
                        <span className="home-page-overview-second-box-package-icon-span">
                            <FiPackage className="home-page-overview-second-box-package-icon"/>
                        </span>
                        <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                    </div>
                    <p className="home-page-overview-second-box-title">Out of stock</p>
                    <div className="home-page-overview-second-box-progress-bar-container">
                        <div style={secondsBoxStyles.bar}></div>
                    </div>
                    <p className="home-page-overview-second-box-number">{homePageProductStatuses.outOfStock} Products</p>
                </div>
                <div className="home-page-overview-third-box">
                    <div className="home-page-overview-box-head">
                        <span className="home-page-overview-third-box-package-icon-span">
                            <FiPackage className="home-page-overview-third-box-package-icon"/>
                        </span>
                        <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                    </div>
                    <p className="home-page-overview-third-box-title">Limited stock</p>
                    <div className="home-page-overview-third-box-progress-bar-container">
                        <div style={thirdBoxStyles.bar}></div>
                    </div>
                    <p className="home-page-overview-third-box-number">{homePageProductStatuses.limitedStock} Products</p>
                </div>
                <div className="home-page-overview-fourth-box">
                    <div className="home-page-overview-box-head">
                        <span className="home-page-overview-fourth-box-package-icon-span">
                            <FiPackage className="home-page-overview-fourth-box-package-icon"/>
                        </span>
                        <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                    </div>
                    <p className="home-page-overview-fourth-box-title">Available stock</p>
                    <div className="home-page-overview-fourth-box-progress-bar-container">
                        <div style={fourthBoxStyles.bar}></div>
                    </div>
                    <p className="home-page-overview-fourth-box-number">{homePageProductStatuses.availableStock} Products</p>
                </div>
            </div>
            
        </>
    )
}

export default HomeProductStatusesOverview;