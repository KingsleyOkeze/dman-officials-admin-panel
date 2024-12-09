import { useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/CouponCodePage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CouponCodePage () {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([
        // {
        //     couponName: "SUMMER2024",
        //     status: "Active",
        //     type: "Percentage",
        //     amount: 15,
        //   },
        //   {
        //     couponName: "WELCOME10",
        //     status: "Inactive",
        //     type: "Fixed",
        //     amount: 10,
        //   },
        //   {
        //     couponName: "FREESHIP50",
        //     status: "Active",
        //     type: "Fixed",
        //     amount: 50,
        //   },
        //   {
        //     couponName: "BLACKFRIDAY",
        //     status: "Active",
        //     type: "Percentage",
        //     amount: 25,
        //   },
        //   {
        //     couponName: "VIPSALE",
        //     status: "Expired",
        //     type: "Fixed",
        //     amount: 100,
        //   },
        //   {
        //     couponName: "NEWYEAR25",
        //     status: "Active",
        //     type: "Percentage",
        //     amount: 25,
        //   },
        //   {
        //     couponName: "FALLSAVINGS",
        //     status: "Inactive",
        //     type: "Fixed",
        //     amount: 20,
        //   },
          
      ]);
    const [emptyResult, setEmptyResult] = useState("");

    const [color, setColor] = useState(['#007AFF', '#008C00']);
  
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(5); // Total number of pages (example)

    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-coupons?page=${newPaginationIndex}`);
    
            if (response.data.result) {
                console.log("fetched data", response.data.result)
                setCoupons(response.data.result);
                
            }
        }
    };

    const handleNextFunction = async () => {
        if (paginationIndex < totalPages - 1) {
            const newPaginationIndex = paginationIndex + 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(`/admin/fetch-coupons?page=${newPaginationIndex}`);
        
            if (response.data) {
                console.log("fetched data", response.data.result)
                setCoupons(response.data.result);
            }
        }
        
    };


    const fetchCoupons = async () => {
        
        try {
            const response = await axios.get(`/admin/fetch-coupons?page=${paginationIndex}`);

            if (response.data) {
                console.log("fetched data", response.data.result)
                setCoupons(response.data.result);
                setTotalPages(response.data.totalPages)
            }
        } catch (error) {
            const status = error.response?.data.status;
            const errMessage = error.response?.data.error;

            if (status === 404) {
                setEmptyResult(errMessage)
            }
            if (status === 401 || status === 500) {
                // setCustomAlert(
                //     { 
                //         visibility: true, 
                //         status: "error", 
                //         title: "Error", 
                //         message: errMessage
                //     }
                // );  
            } else {
                // setCustomAlert(
                //     { 
                //         visibility: true, 
                //         status: "error", 
                //         title: "Error", 
                //         message: "An unknown error occured!"
                //     }
                // );  
            }
        }
        
    }

    useEffect(() => {
        fetchCoupons();
    }, [])









      
    return(
        <div className="coupon-code-page-container">
            <div className="coupon-code-page-header">
                <div className="coupon-code-page-header-and-add-new-container">  
                <h3>Coupon Code</h3>
                <ul>
                    <li onClick={() => navigate("/admin/add-coupon-code-page")}><GrAddCircle className="add-coupon-icon"/><span className="coupon-add-new-text">Add New</span></li>
                </ul>
                </div>
                <div className="coupon-code-page-filter-and-refresh-container">
                    <div className="drop-down-filter">
                        <small className="drop-down-filter-small-border-text">filter coupon by type</small>
                       
                        <p>Fixed</p>
                        <TiArrowSortedDown className="drop-down-icon"/>
                    </div>
               
                    <TfiReload  className="coupon-code-refresh-icon"/>
                </div>
            </div>

            <div className="coupon-code-page-table-container">
                <p>All Coupons</p>
                <table className="coupon-code-page-table" style={{ height: coupons.length === 0 ? '75vh' : ''}}>
                    <thead className="coupon-code-page-table-head">
                        <tr>
                            <th>Coupon Name</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="coupon-code-page-table-body">
                        {coupons.length > 0 ? (
                            coupons.map((coupon, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{
                                        background: color[Math.floor(Math.random() * color.length)]
                                        }}
                                        className="coupon-code-page-table-index">{index + 1}</span> 
                                        {coupon.couponName}
                                    </td>
                                    <td className="coupon-code-page-phone-and-email-container">
                                        {coupon.status}
        
                                    </td>
                                    <td>{coupon.discountType}</td>
                                    <td>{coupon.discountAmount}</td>
                                    <td><FiEdit
                                            className="coupon-code-edit-icon"
                                            onClick={() => navigate("/admin/edit-coupon-code-page")}/></td>
                                    <td><FaRegTrashCan className="coupon-code-delete-icon"/></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="coupon-code-page-no-records-message">
                                    { emptyResult ? emptyResult : "No records found!" }
                                </td>
                            </tr>
                        )
                        }
                        
                    </tbody>
                </table>

            </div>
            {/* Pagination Section */}
            <div className="coupon-code-page-pagination-container">
                <button
                    className="coupon-code-page-pagination-button pagination-prev"
                    onClick={handlePreviousFunction}
                    disabled={paginationIndex === 0}
                >
                    Previous
                </button>
                    <span className="coupon-code-page-pagination-status">
                        {paginationIndex + 1} / {totalPages}
                    </span>
                <button
                    className="coupon-code-page-pagination-button pagination-next"
                    onClick={handleNextFunction}
                    disabled={paginationIndex + 1 === totalPages}
                >
                    Next
                </button>
            </div>

        </div>
    )
}

export default CouponCodePage;