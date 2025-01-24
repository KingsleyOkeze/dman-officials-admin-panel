import { FaSearch } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { FiPackage } from "react-icons/fi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { RiTruckLine } from "react-icons/ri";
import "../../styles/pages-styles/home-pages-styles/HomePage.css";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DeleteConfirmationModal from "../../components/ConfirmationModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";
import { ModalContext } from "../../contexts/ModalContext";


// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


function HomePage () {
    const navigate = useNavigate();
    const {
                isModalOpen, 
                setModalOpen, 
                selectedItem, 
                setSelectedItem, 
                handleDeleteClick, 
                handleCancelDelete
            } = useContext(ModalContext); 
    const [customAlert, setCustomAlert] = useState({ visibility: false, status: "", title: "", message: ""});
    const [products, setProducts] = useState([]);
    const [homePageProductStatuses, setHomePageProductStatuses] = useState({});
    const [homePageOrderStatuses, setHomePageOrderStatuses] = useState({});
    
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
            const response = await axios.get("/admin/fetch-home-page-product-statuses");

            if (response.status === 200) {
                console.log('home product statuses', response.data)
                setHomePageProductStatuses(response.data)
            }
        } catch (err) {
            console.log("err fetch-home-page-order-statuses", err)
        }
    };


    const handleFetchHomePageOrderStatuses = async () => {

        try {
            const response = await axios.get("/admin/fetch-home-page-order-statuses");

            if (response.status === 200) {
                console.log('home order statuses', response.data)
                setHomePageOrderStatuses(response.data)
            }
        } catch (err) {
            console.log("err fetch-home-page-order-statuses", err)
        }
    };

    // PAGINATION
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(5); // Total number of pages (example)

    const handleFetchProducts = async () => {

        try {
            const response = await axios.get(`/admin/fetch-products?page=${paginationIndex}`);

            if (response.status === 200) {
                console.log('product are', response.data.result)
                setProducts(response.data.result)
            }
        } catch (error) {
            if (error.response) {
                console.log("error fetching products", error);
                const status = error.response.data.status;
                const errMessage = error.response.data.error;

            
                if (status === 400 || status === 500) {
                    setCustomAlert(
                        { 
                            visibility: true, 
                            status: "error", 
                            title: "Error", 
                            message: errMessage
                        }
                    );
                }
                if (status === 401) {
                    setCustomAlert(
                        { 
                            visibility: true, 
                            status: "error", 
                            title: "Error", 
                            message: errMessage
                        }
                    );
                }
            } else {
                setCustomAlert(
                    { 
                        visibility: true, 
                        status: "error", 
                        title: "Error", 
                        message: "An unknown error occured!"
                    }
                );
            }
        }
    }
  
    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-products?page=${newPaginationIndex}`);
      
            if (response.data.result) {
                console.log("fetched data", response.data.result)
                setProducts(response.data.result);
                  
            }
        }
    };
  
    const handleNextFunction = async () => {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-products?page=${newPaginationIndex}`);
          
            if (response.data) {
                console.log("fetched data", response.data.result)
                setProducts(response.data.result);
            }
        }
          
    };


    const handleDeleteProduct = async (productId) => {
    
        try {
            const response = await axios.delete(`/admin/delete-product/${productId}`);

            if (response.status === 200) {
                handleFetchProducts()
            }
        } catch (err) {
            console.error("Error deleting product:", err);
           
        } finally {
            setModalOpen(false);
            setSelectedItem(null);
        }
    };





    useEffect(() => {
        handleFetchProducts();
        handleFetchHomePageProductStatuses();
        handleFetchHomePageOrderStatuses()
    }, []);


    

    return(
        <div className="home-page-container">
             {customAlert.visibility === true && (
                <Alert
                    status={customAlert.status}
                    title={customAlert.title}
                    message={customAlert.message}
                />
            )}
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
                <div className="home-page-table-container">
                   <p>ALL PRODUCT</p>
                   <table className="home-page-table" style={{ height: products.length < 7 ? '100vh' : ''}} >
                       <thead className="home-page-table-head">
                           <tr>
                               <th>Product Name</th>
                                <th>Categories</th>
                                <th>Sub Categories</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="home-page-table-body">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="home-page-img-and-product-name-container">
                                            <span>
                                                <img src={product.productImageUrl[0]} className="home-page-table-img"/>
                                            </span> 
                                            <span
                                                className="home-page-table-product-name">
                                                {product.productName}
                                            </span>
                                        </td>  
                                        <td>{product.productCategory}</td>
                                        <td>{product.productSubCategory}</td>
                                        <td>{product.productPrice}</td>
                                        <td>
                                            <FiEdit 
                                                className="home-page-table-edit-icon"
                                                onClick={() => {
                                                    navigate(`/admin/edit-product-page/${product._id}`) 
                                                }}/>
                                        </td>
                                        <td>
                                            <FaRegTrashCan 
                                                className="home-page-delete-icon"
                                                onClick={() => {
                                                    handleDeleteClick(product)
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="home-page-no-records-message">
                                        No records found
                                    </td>
                                </tr>
                            )
                            }     
                        </tbody>
                    </table>

                </div>

                {/* Pagination Section */}
                <div className="home-page-pagination-container">
                    <button
                        className="home-page-pagination-button pagination-prev"
                        onClick={handlePreviousFunction}
                        disabled={paginationIndex === 0}
                    >
                        Previous
                    </button>
                        <span className="home-page-pagination-status">
                            {paginationIndex + 1} / {totalPages}
                        </span>
                    <button
                        className="home-page-pagination-button pagination-next"
                        onClick={handleNextFunction}
                        disabled={paginationIndex + 1 === totalPages}
                    >
                        Next
                    </button>
                </div>


            </div>
            {/* Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={() => handleDeleteProduct(selectedItem?._id)}
                message={`Are you sure you want to delete "${selectedItem?.productName}"?`}
            />

        </div>
    )
}


export default HomePage;