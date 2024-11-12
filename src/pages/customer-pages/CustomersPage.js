import { useState } from "react";
import "../../styles/pages-styles/customer-pages-styles/CustomersPage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";

function CustomersPage () {
    const [customers, setCustomers] = useState([
        {
          username: "john_doe",
          phone: "+1234567890",
          email: "john.doe@example.com",
          password: "password123", // Typically, passwords should be hashed
          country: "United States",
          dob: "1990-02-15",
          joiningDate: "2022-01-10",
          deleted: false,
          id: 1
        },
        {
          username: "jane_smith",
          phone: "+0987654321",
          email: "jane.smith@example.com",
          password: "securePass456",
          country: "Canada",
          dob: "1985-11-22",
          joiningDate: "2021-08-05",
          deleted: false,
          id: 2
        },
        {
          username: "alex_jones",
          phone: "+1122334455",
          email: "alex.jones@example.com",
          password: "pass789!@#",
          country: "Australia",
          dob: "1993-07-30",
          joiningDate: "2023-03-19",
          deleted: true,
          id: 3
        },
        {
          username: "lisa_lee",
          phone: "+9988776655",
          email: "lisa.lee@example.com",
          password: "myPassword789",
          country: "United Kingdom",
          dob: "1989-04-11",
          joiningDate: "2020-05-21",
          deleted: false,
          id: 4
        },
        {
          username: "mike_brown",
          phone: "+6677889900",
          email: "mike.brown@example.com",
          password: "mike123Pass",
          country: "Germany",
          dob: "1995-09-12",
          joiningDate: "2019-12-15",
          deleted: true,
          id: 5
        }
      ]);
   
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
                    <tbody className="customers-page-table-body">
                        {
                            customers.map((customer, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span 
                                        className="customers-page-table-index">{index + 1}</span> 
                                        {customer.username}
                                    </td>
                                    <td className="customers-page-phone-and-email-container">
                                        <div>{customer.phone}</div>
                                        <div>{customer.email}</div>
                                    </td>
                                    <td>{customer.password}</td>
                                    <td>{customer.country}</td>
                                    <td>{customer.dob}</td>
                                    <td>{customer.joiningDate}</td>
                    
                                    <td><FaRegTrashCan className="customers-delete-icon"/></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>



            </div>
        </div>
    )
}

export default CustomersPage;