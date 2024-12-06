import { useEffect, useState } from "react";
import "../../styles/pages-styles/customer-pages-styles/CustomersPage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import axios from "axios";

function CustomersPage () {
    const [customers, setCustomers] = useState([
        // {
        //   username: "john_doe",
        //   phone: "+1234567890",
        //   email: "john.doe@example.com",
        //   password: "password123", // Typically, passwords should be hashed
        //   country: "United States",
        //   dob: "1990-02-15",
        //   joiningDate: "2022-01-10",
        //   deleted: false,
        //   id: 1
        // },
        // {
        // //   username: "jane_smith",
        //   phone: "+0987654321",
        //   email: "jane.smith@example.com",
        //   password: "securePass456",
        //   country: "Canada",
        //   dob: "1985-11-22",
        //   joiningDate: "2021-08-05",
        //   deleted: false,
        //   id: 2
        // },
        // {
        //   username: "alex_jones",
        //   phone: "+1122334455",
        //   email: "alex.jones@example.com",
        //   password: "pass789!@#",
        //   country: "Australia",
        //   dob: "1993-07-30",
        //   joiningDate: "2023-03-19",
        //   deleted: true,
        //   id: 3
        // },
        // {
        //   username: "lisa_lee",
        //   phone: "+9988776655",
        //   email: "lisa.lee@example.com",
        //   password: "myPassword789",
        //   country: "United Kingdom",
        //   dob: "1989-04-11",
        //   joiningDate: "2020-05-21",
        //   deleted: false,
        //   id: 4
        // },
        // {
        //   username: "mike_brown",
        //   phone: "+6677889900",
        //   email: "mike.brown@example.com",
        //   password: "mike123Pass",
        //   country: "Germany",
        //   dob: "1995-09-12",
        //   joiningDate: "2019-12-15",
        //   deleted: true,
        //   id: 5
        // }
      ]);



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
  
  
      const fetchCustomers = async () => {
          const response = await axios.get(`/admin/fetch-customers?page=${paginationIndex}`);
  console.log('customer own', response.data.result)
          if (response.data) {
              console.log("fetched data", response.data.result)
              setCustomers(response.data.result);
              setTotalPages(response.data.totalPages)
          }
      }
  
      useEffect(() => {
        fetchCustomers();
      }, [])
  
  
  
  


















   
    return(
        <div className="customers-page-container">
            <div className="customers-page-header">
                <h3>Customers</h3>
                <div className="customers-page-filter-and-refresh-container">
                    <div className="drop-down-filter">
                        <small className="drop-down-filter-small-border-text">filter order by status</small>
                       
                        <p>All Customers</p>
                        <TiArrowSortedDown className="drop-down-icon"/>
                    </div>
               
                    <TfiReload  className="customers-refresh-icon"/>
                </div>
            </div>

            <div className="customers-page-table-container">
                <p>All Customers</p>
                <table className="customers-page-table">
                    <thead className="customers-page-table-head">
                        <tr>
                            <th>Username</th>
                            <th>Phone/Email</th>
                            <th>Password</th>
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
                                    <td>{customer.password}</td>
                                    <td>{customer.country}</td>
                                    <td>{customer.dob}</td>
                                    <td>{customer.createdAt}</td>
                    
                                    <td><FaRegTrashCan className="customers-delete-icon"/></td>
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





            

        </div>
    )
}

export default CustomersPage;