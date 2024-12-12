import { useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/CouponCodePage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CouponCodePage () {
    const navigate = useNavigate();
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('All Orders');
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



    const filterArr = ['status', 'pending', 'completed', 'shipped'];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
  
    
    const handleFilterClick = (item) => {
      setFilterPicked(item);
      setShowFilterDrop(false);
    };







      
    return(
        <div className="coupon-code-page-container">
            <div className="coupon-code-page-header">
                <div className="coupon-code-page-header-and-add-new-container">  
                <h3>Coupon Code</h3>
                <div 
                    className="coupon-code-page-add-new-container"
                    onClick={() => navigate("/admin/add-coupon-code-page")}>
                    <p><GrAddCircle className="coupon-code-page-add-coupon-icon"/></p>
                    <p className="coupon-add-new-text">Add New</p>
                </div>
                </div>
                <div className="coupon-code-page-filter-and-refresh-container">
                    <div className="coupon-code-page-filter-drop-down-container">
                        <div className="coupon-code-page-drop-down-filter-box" onClick={handleFilterDropdownClick}>
                            <small className="coupon-code-page-drop-down-filter-small-border-text">filter order by status</small>
                       
                            <p>{filterPicked}</p>
                            
                            {
                                showFilterDropDown ? 
                                   <TiArrowSortedUp className="coupon-code-page-drop-down-icon"/>
                                : 
                                <TiArrowSortedDown className="coupon-code-page-drop-down-icon"/>
                            }
                        </div>
                        {showFilterDropDown === true ? (
                            <ul className="coupon-code-page-dropdown-menu">
                                {filterArr.map((item) => (
                                    <li key={item} onClick={() => handleFilterClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>
               
                    <TfiReload  className="coupon-code-page-refresh-icon"/>
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
                                    <td style={{ display: 'flex', alignItems: 'center', height: '48px'}}>
                                        <span style={{
                                        background: color[Math.floor(Math.random() * color.length)]
                                        }}
                                        className="coupon-code-page-table-index">
                                            {index + 1}
                                        </span> 
                                        <span>
                                            {coupon.couponName}
                                        </span>
                                    </td>
                                    <td className="coupon-code-page-phone-and-email-container">
                                        {coupon.status}
        
                                    </td>
                                    <td>{coupon.discountType}</td>
                                    <td>{coupon.discountAmount}</td>
                                    <td><FiEdit
                                            className="coupon-code-edit-icon"
                                            onClick={() => navigate(`/admin/edit-coupon-code-page/${coupon._id}`)}/></td>
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