import { useEffect, useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/EditCouponCodePage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import Alert from "../../components/Alert";
import { useParams } from "react-router-dom";

function EditCouponPage () {
    const { couponId } = useParams();
    const [customAlert, setCustomAlert] = useState({ visibility: false, status: "", title: "", message: ""});

    const [couponName, setCouponName] = useState('');
    const [couponCode, setCouponCode] = useState('');
    // const [product, setProduct] = useState('');
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
            console.error(error);
            const status = error.response?.data.status;
            const errMessage = error.response?.data.error;

            if (status === 404 || status === 401 || status === 500) {
                setCustomAlert(
                    { 
                        visibility: true, 
                        status: "error", 
                        title: "Error", 
                        message: errMessage
                    }
                );  
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


    useEffect(() => {
        console.log('coupon is ', couponId)
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`/admin/fetch-coupon-by-id/${couponId}`);
                
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

            } catch (error) {
                if (error.response) {
                    console.log("error fetching coupon by id", error);
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
            } finally {
                // setLoading(false);
            }
        };

        fetchProductById();
    }, [couponId]);


    return(
        <div className="edit-coupon-page-container">
            {customAlert.visibility === true && (
                <Alert
                    status={customAlert.status}
                    title={customAlert.title}
                    message={customAlert.message}
                />
            )}
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
            <div className="edit-coupon-submit-button-container">
                <button 
                    className="edit-coupon-submit-button"
                    onClick={editCouponFunction}>
                        Submit
                    </button>
                <button 
                    className="edit-coupon-cancel-button"
                    >
                        Cancel
                </button>
            </div>
            
        </div>
    )
}

export default EditCouponPage;