import { useContext, useEffect, useState } from "react";
import "../../../styles/pages-styles/home-pages-styles/home-table-styles/HomeTable.css"
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
// import DeleteConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../contexts/ModalContext";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { AlertContext } from "../../../contexts/AlertContext";
import Alert from "../../../components/Alert";
// import { SearchContext } from "../../../contexts/SearchContext";

function HomeTable ({ searchTotalPages, searchResult, searchInput }) {
    const navigate = useNavigate();
    const { accessToken, refreshAccessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);
    
    const {
                isModalOpen, 
                setModalOpen, 
                selectedItem, 
                setSelectedItem, 
                handleDeleteClick, 
                handleCancelDelete
            } = useContext(ModalContext); 
    const [products, setProducts] = useState([]);
    
    // PAGINATION
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)

    const handleFetchProducts = async () => {

        try {
            const response = await axios.get(`/admin/fetch-products?page=${paginationIndex}&limit=7`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log('product are', response.data.result)
                setProducts(response.data.result);
                setTotalPages(response.data.totalPages)
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleFetchProducts);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }
  
    const handlePreviousFunction = async () => {
        try {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-products?page=${newPaginationIndex}&limit=7`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
      
            if (response.data.result) {
                console.log("fetched data", response.data.result)
                setProducts(response.data.result);
                  
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handlePreviousFunction);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };
  
    const handleNextFunction = async () => {
        try {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-products?page=${newPaginationIndex}&limit=7`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
          
            if (response.data) {
                console.log("fetched data", response.data.result)
                setProducts(response.data.result);
            }
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleNextFunction);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
          
    };


    const handleDeleteProduct = async (productId) => {
    
        try {
            const response = await axios.delete(`/admin/delete-product/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                handleFetchProducts();
                showAlert("success", response.data.message);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(() => handleDeleteProduct(productId));
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
           
        } finally {
            setModalOpen(false);
            setSelectedItem(null);
        }
    };


    useEffect(() => {
        setProducts(searchResult);
    }, [searchResult]);

    useEffect(() => {
        if (searchTotalPages) {
            setTotalPages(searchTotalPages);
        }
    }, [searchTotalPages]);

    useEffect(() => {
        if (searchInput.length === 0) {
            handleFetchProducts();
        }
    }, [searchInput])

    useEffect(() => {
        handleFetchProducts();
    }, [accessToken]);

    return (
        <>
            {customAlert.type ? (<Alert />) : "" }
            <div 
                className="home-page-table-container" 
                style={{ 
                    height: products.length < 7 ? '100vh' : '',
                }} 
            >
                   <p>ALL PRODUCT</p>
                   <table className="home-page-table">
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
                    {/* Pagination Section */}
                    <div 
                        className="home-page-pagination-container"
                        style={{ 
                            position: products.length < 7 ? 'absolute' : '',
                            bottom: products.length < 7 ? 0 : '',
                        }}
                    >
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
        </>
    )
}


export default HomeTable;