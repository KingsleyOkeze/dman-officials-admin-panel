import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/customer-pages-styles/CustomersPage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { TiArrowSortedUp } from "react-icons/ti";

import axios from "axios";
import { ModalContext } from "../../contexts/ModalContext";
import ConfirmationModal from "../../components/ConfirmationModal";

function CustomersPage () {
    const {
            isModalOpen, 
            setModalOpen, 
            selectedItem, 
            setSelectedItem, 
            handleDeleteClick, 
            handleCancelDelete
        } = useContext(ModalContext); 
    const [customers, setCustomers] = useState([]);
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('All Orders');
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(5); // Total number of pages (example)
  
    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-customers?page=${newPaginationIndex}`);
      
            if (response.data.result) {
                console.log("fetched data", response.data.result)
                setCustomers(response.data.result); 
            }
        }
    };
  
    const handleNextFunction = async () => {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-customers?page=${newPaginationIndex}`);
          
            if (response.data) {
                console.log("fetched data", response.data.result)
                setCustomers(response.data.result);
            }
        }
          
    };
  
  
    const handleFetchCustomers = async () => {
        const response = await axios.get(`/admin/fetch-customers?page=${paginationIndex}`);
        console.log('customer own', response.data.result)
        if (response.data) {
            console.log("fetched data", response.data.result)
            setCustomers(response.data.result);
            setTotalPages(response.data.totalPages)
        }
    }
  
    useEffect(() => {
        handleFetchCustomers();
    }, [])
  
  
    const filterArr = ['status', 'pending', 'completed', 'shipped'];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
    
      
    const handleFilterClick = (item) => {
        setFilterPicked(item);
        setShowFilterDrop(false);
    };
  
  
    const handleDeleteCustomerAccount = async (customerId) => {
        try {
            // Call the DELETE API with the customer's ID
            const response = await axios.delete(`/admin/delete-customer/${customerId}`);
            
            // Check if the deletion was successful
            if (response.status === 200) {
                // console.log('Customer account deleted successfully:', response.data.message);
                // alert('Customer account deleted successfully!');
                handleFetchCustomers();
            }
        } catch (error) {
            console.error('Error deleting customer account:', error);
    
            if (error.response) {
                // Handle server errors
                alert(error.response.data.error || 'Failed to delete customer account.');
            } else {
                // Handle network or unexpected errors
                alert('An unexpected error occurred. Please try again later.');
            }
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
               
                    <TfiReload  className="customers-page-refresh-icon"/>
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
                            <th>Joinging Date</th>
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
                                        {customer.customerFirstName} {customer.customerLastName}
                                    </td>
                                    <td className="customers-page-phone-and-email-container">
                                        <div>{customer.phoneNumber}</div>
                                        <div>{customer.email}</div>
                                    </td>
                                    {/* <td>{customer.password}</td> */}
                                    <td>{customer.country}</td>
                                    <td>{customer.dob}</td>
                                    <td>{customer.createdAt}</td>
                    
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
                        {paginationIndex + 1} / {totalPages}
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