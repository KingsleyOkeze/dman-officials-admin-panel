import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/EditCouponCodePage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";

function EditCouponPage () {
    const { accessToken } = useContext(AuthContext);
    const { couponId } = useParams();
    const { showAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [couponName, setCouponName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscountAmount, setCouponDiscountAmount] = useState('');
    const [usageLimit, setUsageLimit] = useState(0)
    const [expirationDate, setExpirationDate] = useState('');
    const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState(0);
    const [couponDiscountType, setCouponDiscountType] = useState('Select Discount');
    const [couponStatus, setCouponStatus] = useState('Select status');
    const [couponCategory, setCouponCategory] = useState('Select category');
    const [couponSubCategory, setCouponSubCategory] = useState('Select sub category');
    
    // DROP DOWNS CATEGORY 
    const [discountDropDownListIsOpen, setDiscountDropDownListIsOpen] = useState(false);
    const [statusDropDownListIsOpen, setStatusDropDownListIsOpen] = useState(false);
    const [categoryDropDownListIsOpen, setCategoryDropDownListIsOpen] = useState(false);
    const [subCategoryDropDownListIsOpen, setSubCategoryDropDownListIsOpen] = useState(false);
    

    const discounts = ['Percentage Off', 'Flat Discount'];
    const status = ['Active', 'Inactive', 'Expired'];
    const categories = ['Men', 'Women', 'Accessory'];
    const subCategories = ['Top', 'Undies', 'Watch'];
 

    const handleCategoryDropdownClick = () => {
        setCategoryDropDownListIsOpen(!categoryDropDownListIsOpen);
    };
  
    
    const handleCategoryClick = (category) => {
      setCouponCategory(category);
      setCategoryDropDownListIsOpen(false);
    };
  
    const handleStatusDropdownClick = () => {
        setStatusDropDownListIsOpen(!statusDropDownListIsOpen);
    };
  
    
    const handleStatusClick = (status) => {
      setCouponStatus(status);
      setStatusDropDownListIsOpen(false);
    };

    const handleDiscountDropdownClick = () => {
        setDiscountDropDownListIsOpen(!discountDropDownListIsOpen);
    };
  
    
    const handleDiscountClick = (discount) => {
      setCouponDiscountType(discount);
      setDiscountDropDownListIsOpen(false);
    };

    const handleSubCategoryDropdownClick = () => {
        setSubCategoryDropDownListIsOpen(!subCategoryDropDownListIsOpen);
    };
  
    
    const handleSubCategoryClick = (subCategory) => {
      setCouponSubCategory(subCategory);
      setSubCategoryDropDownListIsOpen(false);
    };



    const editCouponFunction = async () => {
        console.log(couponName,couponCode, couponDiscountAmount, expirationDate, minimumPurchaseAmount, couponDiscountType, couponStatus, couponCategory, couponSubCategory)
        setLoading(true); // Enable loading state
        
        if (!couponName.trim()) return "Coupon Name is required";
        if (!couponCode.trim()) return "Coupon Code is required";
        if (couponDiscountType === "Select Discount") return "Please select a discount type";
        if (!couponDiscountAmount || parseFloat(couponDiscountAmount) <= 0) return "Discount amount must be greater than 0";
        if (couponStatus === "Select status") return "Please select a status";
        if (couponCategory === "Select category") return "Please select a category";
        if (couponSubCategory === "Select sub category") return "Please select a sub-category";
        if (!expirationDate) return "Expiration date is required";
        if (minimumPurchaseAmount < 0) return "Minimum purchase amount cannot be negative";
        if (usageLimit < 0) return "Usage limit cannot be negative";

        try {
            const response = await axios.post("/admin/edit-coupon", {
                couponId,
                couponName: couponName.toUpperCase(),
                couponCode: couponCode.toUpperCase(),
                discountType: couponDiscountType.replace(/\s+/g, ''),
                discountAmount: couponDiscountAmount,
                minimumPurchaseAmount,
                status: couponStatus.replace(/\s+/g, ''),
                category: couponCategory,
                subCategory: couponSubCategory,
                expirationDate,
                usageLimit,
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });
    
            if (response.data) {
                showAlert("success", response.data.message);  
                navigate("/admin/coupon-code-page");
            } 
        } catch (err) {
            console.error(err);
         
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
            setLoading(false); // Disable loading state
        }
    };


    useEffect(() => {
        console.log('coupon is ', couponId)
        const handleFetchProductById = async () => {
            try {
                const response = await axios.get(`/admin/fetch-coupon-by-id/${couponId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                        },
                    }    
                );
                
                if (response.status === 200) {
                    console.log("successfully fetched coupon product", response.data)
                    const {
                        category,
                        couponCode,
                        couponName,
                        createdAt,
                        discountAmount,
                        discountType,
                        expirationDate,
                        minimumPurchaseAmount,
                        status,
                        subCategory,
                        usageLimit
                    } = response.data;
          

                    setCouponName(couponName)
                    setCouponCode(couponCode);
                    setCouponDiscountAmount(discountAmount);
                    setExpirationDate(expirationDate);
                    setMinimumPurchaseAmount(minimumPurchaseAmount);
                    setCouponDiscountType(discountType);
                    setCouponStatus(status);
                    setCouponCategory(category);
                    setCouponSubCategory(subCategory);
                    setUsageLimit(usageLimit)
                }

            } catch (err) {
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
                // setLoading(false);
            }
        };

        handleFetchProductById();
    }, [couponId]);


    return(
        <div className="edit-coupon-page-container">
            <h3 className="edit-coupon-page-h3">Edit Coupon</h3>
            <p className="edit-coupon-page-sub-head">Creating new Coupon</p>
            <div className="edit-coupon-first-section-container">
                <div className="edit-coupon-first-section-input-container">
                    <div className="edit-coupon-label">
                        <label className="label">Coupon Name </label>
                    </div>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="text" 
                            placeholder="Enter coupon name"
                            value={couponName}
                            onChange={(e) => setCouponName(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <div className="edit-coupon-label">
                        <label>Coupon code </label>
                    </div>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="text" 
                            placeholder="Eg: SUMMER SALE" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="edit-coupon-first-section-drop-down-container">
                    <div className="edit-coupon-label">
                        <label>Discount type</label>
                    </div>
                    <div className="edit-coupon-second-section-dropdown" onClick={handleDiscountDropdownClick}>
                        <p className="edit-coupon-first-section-dropdown-p">{couponDiscountType}</p>
                        {
                        discountDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {discountDropDownListIsOpen === true ? (
                            <ul className="edit-coupon-dropdown-menu">
                                {discounts.map((category) => (
                                    <li key={category} onClick={() => handleDiscountClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <div className="edit-coupon-label">
                        <label className="label" >Discount amount</label>
                    </div>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="number" 
                            placeholder="Eg: 20"
                            value={couponDiscountAmount}
                            onChange={(e) => setCouponDiscountAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <div className="edit-coupon-label">
                        <label>Minimum purchase amount</label>
                    </div>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="number" 
                            min={0}
                            value={minimumPurchaseAmount}
                            placeholder="Enter min purchase amount"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0) {
                                    setMinimumPurchaseAmount(value);
                                } else {
                                    setMinimumPurchaseAmount(0); // or some other default value
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Second section container*/}
            <div className="edit-coupon-second-section-container">
                <div className="edit-coupon-second-section-input-container">
                    <div className="edit-coupon-label">
                       <label>Date</label>
                    </div>
                    <div className="edit-coupon-second-section-input-div">
                        <input type="date" 
                            value={expirationDate}
                            placeholder="Enter expiration date" 
                            onChange={(e) => setExpirationDate(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="edit-coupon-second-section-drop-down-container">
                    <div className="edit-coupon-label">
                        <label>Status</label>
                    </div>
                    <div className="edit-coupon-second-section-dropdown" onClick={handleStatusDropdownClick}>
                        <p className="edit-coupon-first-section-dropdown-p">{couponStatus}</p>
                        {
                        statusDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {statusDropDownListIsOpen === true ? (
                            <ul className="edit-coupon-dropdown-menu">
                                {status.map((category) => (
                                    <li key={category} onClick={() => handleStatusClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="edit-coupon-second-section-drop-down-container">
                    <div className="edit-coupon-label">
                        <label>Category</label>
                    </div>
                        <div className="edit-coupon-second-section-dropdown" onClick={handleCategoryDropdownClick}>
                        <p className="edit-coupon-second-section-dropdown-p">{couponCategory}</p>
                        {
                        categoryDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {categoryDropDownListIsOpen === true ? (
                            <ul className="edit-coupon-dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="edit-coupon-second-section-drop-down-container">
                    <div className="add-coupon-label">
                        <label>Sub-Category</label>
                    </div>
                    <div className="edit-coupon-second-section-dropdown" onClick={handleSubCategoryDropdownClick}>
                        <p className="edit-coupon-second-section-dropdown-p">{couponSubCategory}</p>
                        {
                        subCategoryDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {subCategoryDropDownListIsOpen === true ? (
                            <ul className="edit-coupon-dropdown-menu">
                                {subCategories.map((category) => (
                                    <li key={category} onClick={() => handleSubCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="edit-coupon-second-section-input-container">
                    <div className="add-coupon-label">
                        <label>Usage limit</label>
                    </div>
                    <div className="edit-coupon-second-section-input-container">
                        <input type="number" 
                            min={1}
                            value={usageLimit}
                            placeholder="Eg: 15" 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value >= 0) {
                                    setUsageLimit(value);
                                } else {
                                    setUsageLimit(1); // or some other default value
                                }
                            }}  
                        />
                    </div>
                </div>
            </div>
            <div className="edit-coupon-button-container">
                <button 
                    className="edit-coupon-submit-button"
                    onClick={editCouponFunction}
                    disabled={loading} // Disable the button while loading
                >
                    {loading ? (
                       <div className="edit-coupon-spinner"></div> // Show spinner when loading
                    ) : (
                        <span>Submit</span> // Show "Submit" text when not loading
                    )}
                </button>
                <button 
                    className="edit-coupon-cancel-button"
                    onClick={() => navigate("/admin/coupon-code-page")}
                    >
                        Cancel
                </button>
            </div>
            
        </div>
    )
}

export default EditCouponPage;