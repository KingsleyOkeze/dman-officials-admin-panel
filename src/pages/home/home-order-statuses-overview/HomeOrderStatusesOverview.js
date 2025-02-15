import { useContext, useEffect } from "react";
import "../../../styles/pages-styles/home-pages-styles/home-order-statuses-overview-styles/HomeOrderStatusesOverview.css";
import { RiTruckLine } from "react-icons/ri";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";


// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function HomeOrderStatusesOverview () {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { accessToken, adminId } = useContext(AuthContext);
    const [homePageOrderStatuses, setHomePageOrderStatuses] = useState({});
    // const { searchInput, handleSearchInput, searchResult } = useContext(SearchContext);
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            // setIsSubHeaderOpen(width >= 786); // Automatically open for large screens
        };

        handleResize(); // Ensure it runs on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    // Data for the chart
    const data = {
        labels: [
            "All Orders",
            "Pending",
            "Processing",
            "Cancelled",
            "Shipped",
            "Delivered"
        ],
        datasets: [
          {
            label: "Total",
            data: [
                homePageOrderStatuses.allOrders,
                homePageOrderStatuses.pendingOrders,
                homePageOrderStatuses.processingOrders,
                homePageOrderStatuses.cancelledOrders,
                homePageOrderStatuses.shippedOrders,
                homePageOrderStatuses.deliveredOrders
            ],
            backgroundColor: [
              "#A020F0", // Purple
              "#FFA500", // Orange
              "#000000", // Black
              "#B80000", // Red
              "#007AFF", // Blue
              "#008C00", // Green
            ],
            borderColor: [
              "#A020F0", // Purple
              "#FFA500", // Orange
              "#000000", // Black
              "#B80000", // Red
              "#007AFF", // Blue
              "#008C00", // Green
            ],
            borderWidth: 1,
          },
        ],
    };
      

    // Options for customization
    const options = {
        maintainAspectRatio: true, // Ensures the chart remains proportional
        responsive: true,
            plugins: {
                legend: {
                display: false, // Hide the legend
            },
        },
    };

    
    


    const handleFetchHomePageOrderStatuses = async () => {

        try {
            const response = await axios.get("/admin/fetch-home-page-order-statuses",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log('home order statuses', response.data)
                setHomePageOrderStatuses(response.data)
            }
        } catch (err) {
            console.log("err fetch-home-page-order-statuses", err)
        }
    };



    useEffect(() => {
        handleFetchHomePageOrderStatuses();
    }, [])


    // Conditionally return empty JSX if searchInput is not empty
    // if (searchInput.length > 0 && screenWidth <= 986) {
    //     return <></>; // Renders nothing
    // }

    return (
        <>
            <div className="home-page-order-details-section">
                <p className="home-page-order-details-section-head">ORDER DETAILS</p>
                <div className="home-page-order-details-section-doughnut-container">
                    <Doughnut data={data} options={options}/>
                </div>
                <div className="home-page-page-order-all-statuses-container">
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-first-list-logo-container">
                            <RiTruckLine className="home-page-order-status-first-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>{homePageOrderStatuses.allOrders} Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-second-list-logo-container">
                            <RiTruckLine className="home-page-order-status-second-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>Pending Orders</p>
                            <p>{homePageOrderStatuses.pendingOrders} Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-third-list-logo-container">
                            <RiTruckLine className="home-page-order-status-third-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>Processing Orders</p>
                            <p>{homePageOrderStatuses.processingOrders} Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-fourth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-fourth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>Cancelled Orders</p>
                            <p>{homePageOrderStatuses.cancelledOrders} Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-fifth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-fifth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>Shipped Orders</p>
                            <p>{homePageOrderStatuses.shippedOrders} Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-sixth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-sixth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>Delivered Orders</p>
                            <p>{homePageOrderStatuses.deliveredOrders} Done</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeOrderStatusesOverview;