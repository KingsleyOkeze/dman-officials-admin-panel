import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/customer-pages-styles/CustomersPage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import { ModalContext } from "../../contexts/ModalContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import { formatDate } from "../../utils/dateFormatter";


function CustomersPage () {
    const { accessToken, adminId } = useContext(AuthContext);
    const {
            isModalOpen, 
            setModalOpen, 
            selectedItem, 
            setSelectedItem, 
            handleDeleteClick, 
            handleCancelDelete
        } = useContext(ModalContext); 
    const { showAlert } = useContext(AlertContext);
    const [customers, setCustomers] = useState([]);
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('Newest');
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages (example)
  
  
    const handleFetchCustomers = async () => {
        try { 
            const response = await axios.get(`/admin/fetch-customers?page=${paginationIndex}&limit=7`,
            {
                params: {
                    sortBy: filterPicked
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
            console.log('customer own', response.data.result)
            if (response.data) {
                console.log("fetched data", response.data.result)
                setCustomers(response.data.result);
                // setCurrentPage
                setTotalPages(response.data.totalPages)
            }
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } 
                // 401 errors are handled by the AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            
            console.log("error fetching customer", err)
        }
    }
  

    useEffect(() => {
        if (accessToken && adminId) {
            handleFetchCustomers();
        }
    }, [accessToken, adminId, paginationIndex, filterPicked]);
      
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
  
  
    const filterArr = ['Oldest', 'Newest', 'Deleted'];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
      
    const handleFilterClick = (item) => {
        setFilterPicked(item);
        setShowFilterDrop(false);
        setPaginationIndex(0); // Reset to first page when filter changes
    };
  

    const handleDeleteCustomerAccount = async (customerId) => {
        try {
            // Call the DELETE API with the customer's ID
            const response = await axios.delete(`/admin/delete-customer/${customerId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
            
            // Check if the deletion was successful
            if (response.status === 200) {
                handleFetchCustomers();
                showAlert("success", response.data.message)
            }
        } catch (err) {
            console.error('Error deleting customer account:', err);
    
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } 
                // 401 errors are handled by the AuthContext interceptor
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
            console.log('error deleting customer', err);
        } finally {
            setModalOpen(false);
            setSelectedItem(null);
        }
    };


    return(
        <div className="customers-page-container">
            <div className="customers-page-header">
                <h3>Customers</h3>
                <div className="customers-page-filter-and-refresh-container">
                    <div className="customers-page-filter-drop-down-container">
                        <div className="customers-page-drop-down-filter-box" onClick={handleFilterDropdownClick}>
                            <small className="customers-page-drop-down-filter-small-border-text">filter order by status</small>
                       
                            <p>{filterPicked}</p>
                            
                            {
                                showFilterDropDown ? 
                                   <TiArrowSortedUp className="customers-page-drop-down-icon"/>
                                : 
                                <TiArrowSortedDown className="customers-page-drop-down-icon"/>
                            }
                        </div>
                        {showFilterDropDown === true ? (
                            <ul className="customers-page-dropdown-menu">
                                {filterArr.map((item) => (
                                    <li key={item} onClick={() => handleFilterClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>
               
                    <TfiReload 
                        className="customers-page-refresh-icon"
                        onClick={() => handleFetchCustomers()}
                    />
                </div>
            </div>

            <div className="customers-page-table-container">
                <p>All Customers</p>
                <table className="customers-page-table">
                    <thead className="customers-page-table-head">
                        <tr>
                            <th>Username</th>
                            <th>Phone/Email</th>
                            {/* <th>Password</th> */}
                            <th>Country</th>
                            <th>DOB (DD/MM/YY)</th>
                            <th>Joining Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="customers-page-table-body" style={{ height: customers.length === 0 ? '75vh' : ''}}>
                        {customers.length > 0 ? (
                            customers.map((customer, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span 
                                        className="customers-page-table-index">{index + 1}</span> 
                                        {customer.firstName} {customer.lastName}
                                    </td>
                                    <td className="customers-page-phone-and-email-container">
                                        <div>{customer.phoneNumber}</div>
                                        <div>{customer.email}</div>
                                    </td>
                                    {/* <td>{customer.password}</td> */}
                                    <td>{customer.country}</td>
                                    <td>{formatDate(customer.dob, "dob")}</td>
                                    <td>{formatDate(customer.createdAt)}</td>
                    
                                    <td>
                                        <FaRegTrashCan 
                                            className="customers-delete-icon"
                                            onClick={() =>{ 
                                                handleDeleteClick(customer)
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="customers-page-no-records-message">
                                    No records found
                                </td>
                            </tr>
                        )
                        
                        }
                        
                    </tbody>
                </table>

            </div>


            {/* Pagination Section */}
            <div className="customers-page-pagination-container">
                <button
                    className="customers-page-pagination-button pagination-prev"
                    onClick={handlePreviousFunction}
                    disabled={paginationIndex === 0}
                >
                    Previous
                </button>
                    <span className="customers-page-pagination-status">
                        {totalPages ? paginationIndex + 1 : 0} / {totalPages ? totalPages : 0}
                    </span>
                <button
                    className="customers-page-pagination-button pagination-next"
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
                onConfirm={() => handleDeleteCustomerAccount(selectedItem?._id)}
                message={`Are you sure you want to delete "${selectedItem?.firstName} ${selectedItem?.lastName}"?`}
            /> 


        </div>
    )
}

export default CustomersPage;