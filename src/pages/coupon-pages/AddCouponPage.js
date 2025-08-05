import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/AddCouponPage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import Alert from "../../components/Alert";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function AddCouponPage () {
    const { accessToken, refreshAccessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);

    const [couponName, setCouponName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscountAmount, setCouponDiscountAmount] = useState('');
    const [usageLimit, setUsageLimit] = useState(0);
    const [expirationDate, setExpirationDate] = useState('');
    const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState(0);
    const [couponDiscountType, setCouponDiscountType] = useState('Select Discount');
    const [couponStatus, setCouponStatus] = useState('Select Status');
    const [couponCategory, setCouponCategory] = useState('Select Category');
    const [couponSubCategory, setCouponSubCategory] = useState('Select Sub Category');
    
    // DROP DOWNS CATEGORY 
    const [discountDropDownListIsOpen, setDiscountDropDownListIsOpen] = useState(false);
    const [statusDropDownListIsOpen, setStatusDropDownListIsOpen] = useState(false);
    const [categoryDropDownListIsOpen, setCategoryDropDownListIsOpen] = useState(false);
    const [subCategoryDropDownListIsOpen, setSubCategoryDropDownListIsOpen] = useState(false);
    

    const discounts = ['Percentage Off', 'Flat Discount'];
    const status = ['Active', 'Inactive', 'Expired'];
    const categories = ['Mens Wear', 'Footwear', 'Accessory'];
    const subCategories = ['T Shirt', 'Hoodie', 'Sweat Shirt', 'Bullup 500'];
 

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



    const addCouponFunction = async () => {
        console.log(couponName,couponCode, usageLimit, couponDiscountAmount, expirationDate, minimumPurchaseAmount, couponDiscountType, couponStatus, couponCategory, couponSubCategory)
        try {
            const response = await axios.post("/admin/add-coupon", {
                couponName: couponName.toUpperCase(),
                couponCode: couponCode.toUpperCase(),
                discountType: couponDiscountType.replace(/\s+/g, ''),// Remove spaces from `couponDiscountType`
                discountAmount: couponDiscountAmount,
                minimumPurchaseAmount,
                status: couponStatus,
                category: couponCategory.replace(/\s+/g, ''),
                subCategory: couponSubCategory.replace(/\s+/g, ''),
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
            } 
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(addCouponFunction);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    };
    

    useEffect(() => {
        // setTimeout(() => {
        //     if (customAlert) {
        //         setCustomAlert(false);
        //     }
        // }, 5000);
    }, [customAlert]);


    return(
        <div className="add-coupon-page-container">
            {customAlert.type ? (<Alert />) : "" }
            <h3 className="add-coupon-page-h3">Add Coupon</h3>
            <p className="add-coupon-page-sub-head">Creating new Coupon</p>
            <div className="add-coupon-first-section-container">
                <div className="add-coupon-first-section-input-container">
                    <div className="add-coupon-label">
                        <label className="label">Coupon Name </label>
                    </div>
                    <div className="add-coupon-first-section-input-div">
                        <input type="text" 
                            placeholder="Enter coupon name"
                            onChange={(e) => setCouponName(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="add-coupon-first-section-input-container">
                    <div className="add-coupon-label">
                        <label>Coupon code </label>
                    </div>
                    <div className="add-coupon-first-section-input-div">
                        <input type="text" 
                            placeholder="Eg: SUMMER SALE" 
                            onChange={(e) => setCouponCode(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="add-coupon-first-section-drop-down-container">
                    <div className="add-coupon-label">
                        <label>Discount type</label>
                    </div>
                    <div className="add-coupon-second-section-dropdown" onClick={handleDiscountDropdownClick}>
                        <p className="add-coupon-first-section-dropdown-p">{couponDiscountType}</p>
                        {
                        discountDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {discountDropDownListIsOpen === true ? (
                            <ul className="add-coupon-dropdown-menu">
                                {discounts.map((category) => (
                                    <li key={category} onClick={() => handleDiscountClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="add-coupon-first-section-input-container">
                    <div className="add-coupon-label">
                        <label className="label" >Discount amount</label>
                    </div>
                    <div className="add-coupon-first-section-input-div">
                        <input type="number" 
                            placeholder="Eg: 20"
                            onChange={(e) => setCouponDiscountAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="add-coupon-first-section-input-container">
                    <div className="add-coupon-label">
                        <label>Minimum purchase amount</label>
                    </div>
                    <div className="add-coupon-first-section-input-div">
                        <input type="number" 
                            min={0}
                            value={minimumPurchaseAmount}
                            placeholder="Enter min purchase amount"
                            onChange={(e) => {
                                // Remove any leading zeros from the input value
                                const value = parseInt(e.target.value.replace(/^0+/, ''), 10);

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
            <div className="add-coupon-second-section-container">
                <div className="add-coupon-second-section-input-container">
                    <div className="add-coupon-label">
                       <label>Date</label>
                    </div>
                    <div className="add-coupon-second-section-input-div">
                        <input type="date" 
                            placeholder="Enter expiration date" 
                            onChange={(e) => setExpirationDate(e.target.value)} 
                            required
                        />
                    </div>
                </div>
                <div className="add-coupon-second-section-drop-down-container">
                    <div className="add-coupon-label">
                        <label>Status</label>
                    </div>
                    <div className="add-coupon-second-section-dropdown" onClick={handleStatusDropdownClick}>
                        <p className="add-coupon-first-section-dropdown-p">{couponStatus}</p>
                        {
                        statusDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {statusDropDownListIsOpen === true ? (
                            <ul className="add-coupon-dropdown-menu">
                                {status.map((category) => (
                                    <li key={category} onClick={() => handleStatusClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="add-coupon-second-section-drop-down-container">
                    <div className="add-coupon-label">
                        <label>Category</label>
                    </div>
                        <div className="add-coupon-second-section-dropdown" onClick={handleCategoryDropdownClick}>
                        <p className="add-coupon-second-section-dropdown-p">{couponCategory}</p>
                        {
                        categoryDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {categoryDropDownListIsOpen === true ? (
                            <ul className="add-coupon-dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="add-coupon-second-section-drop-down-container">
                    <div className="add-coupon-label">
                        <label>Sub-Category</label>
                    </div>
                    <div className="add-coupon-second-section-dropdown" onClick={handleSubCategoryDropdownClick}>
                        <p className="add-coupon-second-section-dropdown-p">{couponSubCategory}</p>
                        {
                        subCategoryDropDownListIsOpen ? 
                            <TiArrowSortedUp />
                        : 
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                                    
                        }      
                    </div>
                    {subCategoryDropDownListIsOpen === true ? (
                            <ul className="add-coupon-dropdown-menu">
                                {subCategories.map((category) => (
                                    <li key={category} onClick={() => handleSubCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                    ) : <></>} 
                </div>
                <div className="add-coupon-second-section-input-container">
                    <div className="add-coupon-label">
                        <label>Usage limit</label>
                    </div>
                    <div className="add-coupon-second-section-input-container">
                        <input type="number" 
                            min={1}
                            value={usageLimit}
                            placeholder="Eg: 15" 
                            onChange={(e) => {
                                // Remove any leading zeros from the input value
                                const value = parseInt(e.target.value.replace(/^0+/, ''), 10);
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
            <div className="add-coupon-submit-button-container">
                <button 
                    className="add-coupon-submit-button"
                    onClick={addCouponFunction}>
                        Submit
                    </button>
                <button 
                    className="add-coupon-cancel-button"
                    onClick={addCouponFunction}>
                        Cancel
                </button>
            </div>
            
        </div>
    )
}

export default AddCouponPage;