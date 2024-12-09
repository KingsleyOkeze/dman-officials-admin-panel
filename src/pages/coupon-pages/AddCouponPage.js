import { useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/AddCouponPage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import Alert from "../../components/Alert";


function AddCouponPage () {

    const [customAlert, setCustomAlert] = useState({ visibility: false, status: "", title: "", message: ""});

    const [couponName, setCouponName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [product, setProduct] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    // const [usageLimit, setUsageLimit] = useState(0)
    const [expirationDate, setExpirationDate] = useState('');
    const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState('Select Discount');
    const [couponStatus, setCouponStatus] = useState('Select status');
    const [couponCategory, setCouponCategory] = useState('Select category');
    const [couponSubCategory, setCouponSubCategory] = useState('Select sub category');
    
    // DROP DOWNS CATEGORY 
    const [discountDropDownListIsOpen, setDiscountDropDownListIsOpen] = useState(false);
    const [statusDropDownListIsOpen, setStatusDropDownListIsOpen] = useState(false);
    const [categoryDropDownListIsOpen, setCategoryDropDownListIsOpen] = useState(false);
    const [subCategoryDropDownListIsOpen, setSubCategoryDropDownListIsOpen] = useState(false);
    

    const discounts = ['Percentage off', 'Flat discount'];
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
      setCouponDiscount(discount);
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
        console.log(couponName,couponCode,product, discountAmount, expirationDate, minimumPurchaseAmount, couponDiscount, couponStatus, couponCategory, couponSubCategory)
        try {
            const response = await axios.post("/admin/add-coupon", {
                couponName: couponName.toUpperCase(),
                couponCode,
                discountType: couponDiscount,
                discountAmount,
                minimumPurchaseAmount,
                status: couponStatus,
                category: couponCategory,
                subCategory: couponSubCategory,
                product,
                expirationDate,
                // usageLimit,
            });
    
            if (response.data) {
                setCustomAlert(
                    { 
                        visibility: true, 
                        status: "success", 
                        title: "Success", 
                        message: response.data.message
                    }
                );  
            } 
        } catch (error) {
            if (error.response) {
                console.log("add coupon error", error);
                const status = error.response.data.status;
                const errMessage = error.response.data.error;

            
                if (status === 400 || status === 500) {
                    setCustomAlert(
                        { 
                            visibility: true, 
                            status: "error", 
                            title: "Error", 
                            message: errMessage
                        }
                    );
                }
                if (status === 401) {
                    setCustomAlert(
                        { 
                            visibility: true, 
                            status: "error", 
                            title: "Error", 
                            message: errMessage
                        }
                    );
                }
            } else {
                setCustomAlert(
                    { 
                        visibility: true, 
                        status: "error", 
                        title: "Error", 
                        message: "An unknown error occured!"
                    }
                );
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
            {customAlert.visibility === true && (
                <Alert
                    status={customAlert.status}
                    title={customAlert.title}
                    message={customAlert.message}
                />
            )}
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
                        <p className="add-coupon-first-section-dropdown-p">{couponDiscount}</p>
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
                            onChange={(e) => setDiscountAmount(e.target.value)}
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
                            placeholder="Enter min purchase amount"
                            onChange={(e) => setMinimumPurchaseAmount(e.target.value)}
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
                        <label>Product</label>
                    </div>
                    <div className="add-coupon-second-section-input-container">
                        <input type="text" 
                            placeholder="Enter product name" 
                            onChange={(e) => setProduct(e.target.value)} 
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