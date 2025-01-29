import { FaSearch } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import "../../styles/pages-styles/home-pages-styles/HomePage.css";
import { useState } from "react";
import Alert from "../../components/Alert";
import ProductStatusesOverview from "./product-statuses-overview/ProductStatusesOverview";
import OrderStatusesOverview from "./order-statuses-overview/OrderStatusesOverview";
import HomeTable from "./home-table/HomeTable";
import { useNavigate } from "react-router-dom";




function HomePage () {
    const navigate = useNavigate(); 

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
                <input type="text" className="home-page-main-search-input"/>
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
                <ProductStatusesOverview />

                {/* Order status overview section*/}
                <OrderStatusesOverview />

                {/* Home page Table section*/}
                <HomeTable />

            </div>
            

        </div>
    )
}


export default HomePage;