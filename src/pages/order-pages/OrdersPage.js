import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/order-pages-styles/OrdersPage.css"
import { TfiReload } from "react-icons/tfi";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import { ModalContext } from "../../contexts/ModalContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function OrdersPage () {
    const { accessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const {
            isModalOpen, 
            setModalOpen, 
            selectedItem, 
            setSelectedItem, 
            handleDeleteClick, 
            handleCancelDelete
        } = useContext(ModalContext);
    const [orders, setOrders] = useState([]);  
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('All Orders');
    const [color, setColor] = useState(['#007AFF', '#008C00', '#FFA500', '#B80000', '#A020F0']);

    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)


    const filterArr = [
        'All Orders', 
        'Pending', 
        'Processing',  
        'Shipped', 
        'Delivered', 
        'Cancelled',
        'Deleted'
    ];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
  
    
    const handleFilterClick = (item) => {
      setFilterPicked(item);
      setShowFilterDrop(false);
    };


    const handleFetchOrders = async () => {
        try { 
        const response = await axios.get(
            `/admin/fetch-orders?page=${paginationIndex}&orderStatus=${filterPicked.replace(/\s+/g, '')}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
            },
        });

        if (response.data) {
            console.log("fetched data", response.data.result)
            setOrders(response.data.result);
            setTotalPages(response.data.totalPages)
        }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } 
                // 401 errors are handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }

    useEffect(() => {
        handleFetchOrders();
    }, [])


    useEffect(() => {
        setPaginationIndex(0);
        handleFetchOrders();
    }, [filterPicked]);

    useEffect(() => {
        handleFetchOrders();
    }, [paginationIndex]);
      
    const handlePreviousFunction = () => {
        if (paginationIndex > 0) {
          setPaginationIndex(paginationIndex - 1);
        }
    };
      
    const handleNextFunction = () => {
        if (paginationIndex < totalPages) {
          setPaginationIndex(paginationIndex + 1);
        }
    };


    const handleConfirmDeleteOrder = async (orderId) => {
       
        try {

            // Call the DELETE API
            const response = await axios.delete(
                `/admin/delete-order/${orderId}`,
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log(response.data.message);
                handleFetchOrders();
                showAlert("success", response.data.message); 
            }
        } catch (err) {
            console.log('err deleting coupon', err)
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (
                    status === 400 || 
                    status === 403 || 
                    status === 404 || 
                    status === 500
                ) {
                    showAlert(status, errMessage)
                } 
                // 401 errors handled by AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        } finally {
            setModalOpen(false);
            setSelectedItem(null);
        }
    };


    return(
        <div className="order-page-container">
            <div className="order-page-header">
                <h3>Orders</h3>
                <div className="order-page-filter-and-refresh-container">
                    <div className="order-page-filter-drop-down-container">
                        <div className="order-page-drop-down-filter-box" onClick={handleFilterDropdownClick}>
                            <small className="order-page-drop-down-filter-small-border-text">filter order by status</small>
                       
                            <p>{filterPicked}</p>
                            
                            {
                                showFilterDropDown ? 
                                   <TiArrowSortedUp className="order-page-drop-down-icon"/>
                                : 
                                <TiArrowSortedDown className="order-page-drop-down-icon"/>
                            }
                        </div>
                        {showFilterDropDown === true ? (
                            <ul className="order-page-dropdown-menu">
                                {filterArr.map((item) => (
                                    <li key={item} onClick={() => handleFilterClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>

                    <TfiReload 
                        className="order-refresh-icon"
                        onClick={handleFetchOrders}
                    />
                </div>
            </div>

            <div className="orders-page-table-container">
                <p>ALL ORDER</p>
                <table className="orders-page-table" style={{ height: orders?.length === 0 ? '75vh' : ''}}>
                    <thead className="orders-page-table-head">
                        <tr>
                            <th>Billing Name</th>
                            <th>Order Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="orders-page-table-body">
                        {orders && orders?.length > 0 ? (
                            orders.map((order, index) => (
                                <tr>
                                    <td style={{ display: 'flex', alignItems: 'center' }}
                                        onClick={() => navigate(`/admin/order-details-page/${order._id}`)}>
                                        <span 
                                            style={{
                                                background: color[Math.floor(Math.random() * color.length)]
                                            }}
                                            className="orders-page-table-index"
                                        >
                                            {orders.findIndex(i => i._id === order._id) + 1}
                                        </span> 
                                            {order.customerRef.firstName} {order.customerRef.lastName}
                                        </td>
                                    <td>{order.orderTotalAmount}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.createdAt}</td>
                                    <td><FiEdit className="order-edit-icon"/></td>
                                    <td>
                                        <FaRegTrashCan 
                                            className="order-delete-icon"
                                            onClick={() =>{ 
                                                handleDeleteClick(order)
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="order-page-no-records-message">
                                    No records found
                                </td>
                            </tr>
                        )
                        }
                        
                    </tbody>
                </table>

            </div>

            {/* Pagination Section */}
            <div className="order-page-pagination-container">
                <button
                    className="order-page-pagination-button pagination-prev"
                    onClick={handlePreviousFunction}
                    disabled={paginationIndex === 0}
                >
                    Previous
                </button>
                    <span className="order-page-pagination-status">
                        {totalPages ? paginationIndex + 1 : 0} / {totalPages ? totalPages : 0}
                    </span>
                <button
                    className="order-page-pagination-button pagination-next"
                    onClick={handleNextFunction}
                    disabled={paginationIndex + 1 === totalPages}
                >
                    Next
                </button>
            </div>

  
            {/* Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={() => handleConfirmDeleteOrder(selectedItem?._id)}
                message={`Are you sure you want to delete this order?`}
            /> 


        </div>
    )
}


export default OrdersPage;