import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/CouponCodePage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationModal from "../../components/ConfirmationModal";
import { ModalContext } from "../../contexts/ModalContext";

function CouponCodePage () {
    const navigate = useNavigate();
    const {
        isModalOpen, 
        setModalOpen, 
        selectedItem, 
        setSelectedItem, 
        handleDeleteClick, 
        handleCancelDelete
    } = useContext(ModalContext);
    const [showFilterDropDown, setShowFilterDrop] = useState(false);
    const [filterPicked, setFilterPicked] = useState('All Types');
    const [coupons, setCoupons] = useState([]);
    const [emptyResult, setEmptyResult] = useState("");

    const [color, setColor] = useState(['#007AFF', '#008C00']);
  
    const [paginationIndex, setPaginationIndex] = useState(0); // Track current page
    const [totalPages, setTotalPages] = useState(5); // Total number of pages (example)


    const filterArr = ['All Types', 'Percentage Off', 'Flat Discount'];

    const handleFilterDropdownClick = () => {
        setShowFilterDrop(!showFilterDropDown);
    };
  
    
    const handleFilterClick = (item) => {
      setFilterPicked(item);
      setShowFilterDrop(false);
    };



    const handlePreviousFunction = async () => {
        if (paginationIndex > 0) { 
            const newPaginationIndex = paginationIndex - 1;
            setPaginationIndex(newPaginationIndex);
            const response = await axios.get(
                `/admin/fetch-coupons?page=${newPaginationIndex}&discountType=${filterPicked.toLowerCase()}`
            );
    
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
            const response = await axios.get(
                `/admin/fetch-coupons?page=${newPaginationIndex}&discountType=${filterPicked.toLowerCase()}`
            );
        
            if (response.data) {
                console.log("fetched data", response.data.result)
                setCoupons(response.data.result);
            }
        }
        
    };


    const handleFetchCoupons = async () => {
        
        try {
            const response = await axios.get(
                `/admin/fetch-coupons?page=${paginationIndex}&discountType=${filterPicked.replace(/\s+/g, '')}`
            );

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


    const handleConfirmDeleteCoupon = async (couponId) => {
       
        try {

            // Call the DELETE API
            const response = await axios.delete(
                `/admin/delete-coupon/${couponId}`
            );

            if (response.status === 200) {
                console.log(response.data.message);
                handleFetchCoupons();
                // setCoupons(response.data);
                // setCouponId(""); 
            }
        } catch (err) {
            console.log('err deleting coupon', err)
            if (err.response) {

                // Handle server errors
                // setError(err.response.data.error || "Failed to delete coupon.");
            } else {
                // Handle network or unexpected errors
                // setError("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setModalOpen(false);
            setSelectedItem(null);
        }
    };




    useEffect(() => {
        handleFetchCoupons();
    }, [])


    useEffect(() => {
        handleFetchCoupons();
    }, [filterPicked])


      
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
                            <small className="coupon-code-page-drop-down-filter-small-border-text">filter coupon by type</small>
                       
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
               
                    <TfiReload 
                        className="coupon-code-page-refresh-icon"
                        onClick={handleFetchCoupons}
                    />
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
                                    <td>
                                        <FiEdit
                                            className="coupon-code-edit-icon"
                                            onClick={() => {
                                                navigate(`/admin/edit-coupon-code-page/${coupon._id}`)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <FaRegTrashCan 
                                            className="coupon-code-delete-icon"
                                            onClick={() =>{ 
                                                handleDeleteClick(coupon)
                                            }}
                                        />
                                    </td>
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

            {/* Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={() => handleConfirmDeleteCoupon(selectedItem?._id)}
                message={`Are you sure you want to delete "${selectedItem?.couponName}"?`}
            />  

        </div>
    )
}

export default CouponCodePage;