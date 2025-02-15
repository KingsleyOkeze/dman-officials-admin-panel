import { useContext, useEffect, useState } from "react";
import "../../styles/pages-styles/order-pages-styles/OrderDetailsPage.css"
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import Alert from "../../components/Alert";

function OrderDetailsPage () {
    const { accessToken, refreshAccessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);
    const { orderId } = useParams(); 
    const [orderDetails, setOrderDetails] = useState({});

    const [showOrderStatusDropDown, setShowOrderStatusDropDown] = useState(false);
    const [orderStatusPicked, setOrderStatusPicked] = useState("");
    const [showTrackingDropDown, setShowTrackingDropDown] = useState(false);
    const [trackingPicked, setTrackingPicked] = useState('url');


    const orderStatusArr = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const trackingArr = ['url', 'url1'];

    const handleOrderStatusDropdownClick = () => {
        setShowOrderStatusDropDown(!showOrderStatusDropDown);
    };
  
    
    const handleOrderStatusClick = (item) => {
      setOrderStatusPicked(item);
      setShowOrderStatusDropDown(false);
    };


    const handleTrackingDropdownClick = () => {
        setShowTrackingDropDown(!showTrackingDropDown);
    };
  
    
    const handleTrackingClick = (item) => {
      setTrackingPicked(item);
      setShowTrackingDropDown(false);
    };


    const handleFetchOrderDetails = async () => {
        try {
            const response = await axios.get(`/admin/fetch-order-details/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log("order details", response.data.order)
                setOrderDetails(response.data.order);
                setOrderStatusPicked(response.data.order.orderStatus);
                // showAlert("success", response.data.message); 
            }
        } catch (err) {
            console.log("err getting order details", err)
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleFetchOrderDetails);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
        
    }

    useEffect(() => {
        handleFetchOrderDetails();
    }, []);

    const handleUpdateOrderStatus = async () => {
        try {
            const response = await axios.post("/admin/update-order-status", {
                orderId,
                orderCurrentStatus: orderStatusPicked
            },
            {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 200) {
                console.log("updated order status!", response.data.orderStatus);
                setOrderStatusPicked(response.data.orderStatus);
                showAlert("success", response.data.message); 
            } 

        } catch (err) {
            console.log("error updating order status", err);
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleUpdateOrderStatus);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        }
    }
    

    const [totalItemsInCartPrice, setTotalItemsInCartPrice] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        orderDetails && orderDetails.orderedItems && orderDetails.orderedItems.length > 0 && 
        orderDetails.orderedItems.forEach((item) => {
          totalPrice += item.price * item.quantity;
        });
        setTotalItemsInCartPrice(totalPrice);
    }, [orderDetails])
    

    return(
        <div className="order-details-page-container">
            {customAlert.type ? (<Alert />) : "" }
            <h3 className="order-details-head-h3">Order Details</h3>
            
            <div className="order-details-body-container">
                <div className="order-details-body-top-header">
                    <p>
                        <span className="order-details-body-top-header-title">Name:</span> 
                        <span>{orderDetails.firstName} {orderDetails.lastName}</span>
                    </p>
                    <p>
                        <span className="order-details-body-top-header-title">Order ID:</span> 
                        <span>{orderDetails._id}</span>
                    </p>
                    <p>
                        <span className="order-details-body-top-header-title">Date:</span> 
                        <span>{orderDetails.createdAt}</span>
                    </p>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">ITEMS</p>
                    <ul>
                        {
                            orderDetails && orderDetails.orderedItems && 
                            orderDetails.orderedItems.length > 0 && 
                            orderDetails.orderedItems.map((item, index) => (
                                <li key={index}>
                                    {item.productRef.productName} X {item.quantity} <b>₦</b> {item.price}
                                </li>
                            ))
                        }
                
                    </ul>
                    <p>TOTAL PRICE: <b>₦ {totalItemsInCartPrice}</b>
                    </p>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">SHIPPING ADDRESS</p>
                    <ul>
                        <li>
                            <span className="order-list-span-title">Name:</span> 
                            <span>
                                {orderDetails?.customerRef?.firstName} {orderDetails?.customerRef?.lastName}
                            </span>
                        </li>
                        <li>
                            <span className="order-list-span-title">Address:</span> 
                            <span>{orderDetails.address}</span>
                        </li>
                        <li>
                            <span className="order-list-span-title">City</span> 
                            <span>{orderDetails.city}</span>
                        </li>
                        <li>
                            <span className="order-list-span-title">State:</span> 
                            <span>{orderDetails.state}</span>
                        </li>
                        <li>
                            <span className="order-list-span-title">Postal code:</span> 
                            <span>{orderDetails.postalCode}</span>
                        </li>
                        <li>
                            <span className="order-list-span-title">Country/Region:</span> 
                            <span>{orderDetails.country}</span>
                        </li>
                        <li>
                            <span className="order-list-span-title">Phone Number:</span> 
                            <span>{orderDetails.phoneNumber}</span>
                        </li>
                    </ul>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">PAYMENT DETAILS</p>
                    <ul>
                        <li>
                            <span className="order-list-span-title">Payment Method:</span> 
                            {orderDetails.paymentMethod || 'Unknown'}
                        </li>
                        <li>
                            <span className="order-list-span-title">Coupon Code:</span> 
                            {orderDetails.appliedCouponCode || 'N/A'}
                        </li>
                        <li>
                            <span className="order-list-span-title">Order Sub Total:</span> 
                            <b>₦</b>{totalItemsInCartPrice}
                        </li>
                        <li>
                            <span className="order-list-span-title">Discount:</span> 
                            <b>₦</b> {orderDetails.discountAmountApplied || 0.00}
                        </li>
                        <li>
                            <span className="order-list-span-title">Shipping cost:</span> 
                            <b>₦</b> 1,000
                        </li>
                        <li>
                            <span className="order-list-span-title">Grand Total:</span> 
                            <b>₦</b> {orderDetails.orderTotalAmount}
                        </li>
                    </ul>
                </div>
                <div className="order-details-bottom-status-container">
                    <p>ORDER STATUS:</p>
                    <div className="order-details-bottom-order-status-filter-drop-down-container">
                        <div className="order-details-bottom-order-status-drop-down-filter-box" onClick={handleOrderStatusDropdownClick}>
                            <small 
                                className="order-details-bottom-order-status-drop-down-filter-small-border-text"
                            >
                                filter order by status
                            </small>
                       
                            <p>{orderStatusPicked}</p>
                            
                            {
                                showOrderStatusDropDown ? 
                                   <TiArrowSortedUp className="order-details-bottom-order-status-drop-down-icon"/>
                                : 
                                <TiArrowSortedDown className="order-details-bottom-order-status-drop-down-icon"/>
                            }
                        </div>
                        {showOrderStatusDropDown === true ? (
                            <ul className="order-details-bottom-order-status-dropdown-menu">
                                {orderStatusArr.map((item) => (
                                    <li key={item} onClick={() => handleOrderStatusClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>
                </div>
                <div className="order-details-bottom-tracking-container">
                    <p>TRACKING URL:</p>
                    <div className="order-details-bottom-tracking-filter-drop-down-container">
                        <div className="order-details-bottom-tracking-drop-down-filter-box" onClick={handleTrackingDropdownClick}>
                            <small 
                                className="order-details-bottom-tracking-drop-down-filter-small-border-text"
                            >
                                filter order by status
                            </small>
                       
                            <p>{trackingPicked}</p>
                            
                            {
                                showTrackingDropDown ? 
                                   <TiArrowSortedUp className="order-details-bottom-tracking-drop-down-icon"/>
                                : 
                                <TiArrowSortedDown className="order-details-bottom-tracking-drop-down-icon"/>
                            }
                        </div>
                        {showTrackingDropDown === true ? (
                            <ul className="order-details-bottom-tracking-dropdown-menu">
                                {trackingArr.map((item) => (
                                    <li key={item} onClick={() => handleTrackingClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>
                </div>
                <div className="order-details-button-container">
                    <button className="order-details-cancel-button">Cancel</button>
                    <button 
                        className="order-details-save-button"
                        onClick={handleUpdateOrderStatus}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage;