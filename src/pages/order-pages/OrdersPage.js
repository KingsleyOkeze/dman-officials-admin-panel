import { useEffect, useState } from "react";
import "../../styles/pages-styles/order-pages-styles/OrdersPage.css"
import { TfiReload } from "react-icons/tfi";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";

function OrdersPage () {
    const navigate = useNavigate();
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('All Orders');
    const [orders, setOrders] = useState([
        // {
        //     billingName: "Daniel Wilson",
        //     orderAccount: "DW33445",
        //     payment: "$500.00",
        //     status: "Processing",
        //     date: "2024-10-10",
        //     id: 5
        //     },
        //     { 
        //     billingName: "Daniel Wilson",
        //     orderAccount: "DW33445",
        //     payment: "$500.00",
        //     status: "Processing",
        //     date: "2024-10-10",
        //     id: 5
        //     },
    ]);  
    const [color, setColor] = useState(['#007AFF', '#008C00', '#FFA500', '#B80000', '#A020F0']);


    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(5); // Total number of pages (example)

    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-orders?page=${newPaginationIndex}`);
    
            if (response.data.result) {
                console.log("fetched data", response.data.result)
                setOrders(response.data.result);
                
            }
        }
    };

    const handleNextFunction = async () => {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-orders?page=${newPaginationIndex}`);
        
            if (response.data) {
                console.log("fetched data", response.data.result)
                setOrders(response.data.result);
            }
        }
        
    };


    const fetchOrders = async () => {
        const response = await axios.get(`/admin/fetch-orders?page=${paginationIndex}`);

        if (response.data) {
            console.log("fetched data", response.data.result)
            setOrders(response.data.result);
            setTotalPages(response.data.totalPages)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


    
    const filterArr = ['status', 'pending', 'completed', 'shipped'];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
  
    
    const handleFilterClick = (item) => {
      setFilterPicked(item);
      setShowFilterDrop(false);
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

                    <TfiReload className="order-refresh-icon"/>
                </div>
            </div>

            <div className="orders-page-table-container">
                <p>ALL ORDER</p>
                <table className="orders-page-table" style={{ height: orders.length === 0 ? '75vh' : ''}}>
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
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr onClick={() => navigate("/admin/order-details-page")}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{
                                        background: color[Math.floor(Math.random() * color.length)]
                                        }}
                                        className="orders-page-table-index">{orders.findIndex(i => i.id === order.id)}</span> 
                                        {order.customerFirstName} {order.customerLastName}
                                        </td>
                                    <td>{order.orderAmount}</td>
                                    <td>{order.payment}</td>
                                    <td>{order.status}</td>
                                    <td>{order.createdAt}</td>
                                    <td><FiEdit className="order-edit-icon"/></td>
                                    <td><FaRegTrashCan className="order-delete-icon"/></td>
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
                        {paginationIndex + 1} / {totalPages}
                    </span>
                <button
                    className="order-page-pagination-button pagination-next"
                    onClick={handleNextFunction}
                    disabled={paginationIndex + 1 === totalPages}
                >
                    Next
                </button>
            </div>

  




        </div>
    )
}


export default OrdersPage;






