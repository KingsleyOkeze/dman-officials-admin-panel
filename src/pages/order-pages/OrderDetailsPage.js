import "../../styles/pages-styles/order-pages-styles/OrderDetailsPage.css"
import { TiArrowSortedDown } from "react-icons/ti";

function OrderDetailsPage () {

    return(
        <div className="order-details-page-container">
            <h3 className="order-details-head-h3">Order Details</h3>
            
            <div className="order-details-body-container">
                <div className="order-body-top-header">
                    <p><span>Name:</span> Igwe Okeze</p>
                    <p><span>Order ID:</span> 7768558559</p>
                    <p><span>Date:</span> 26th October, 2024</p>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">ITEMS</p>
                    <ul>
                        <li>Item user bought 1 X N14,000</li>
                        <li>Item user bought 1 X N14,000</li>
                        <li>Item user bought 1 X N14,000</li>
                        <li>Item user bought 1 X N14,000</li>
                    </ul>
                    <p>TOTAL PRICE: <b>₦56,000.00</b></p>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">SHIPPING ADDRESS</p>
                    <ul>
                        <li><span className="order-list-span">Name:</span> John Doe</li>
                        <li><span className="order-list-span">Address:</span> 45 Adebayo</li>
                        <li><span className="order-list-span">City</span>Ikeja</li>
                        <li><span className="order-list-span">State:</span> Lagos</li>
                        <li><span className="order-list-span">Postal code:</span> 1000001</li>
                        <li><span className="order-list-span">Country/Region:</span> Nigeria</li>
                        <li><span className="order-list-span">Phone Number:</span> +234905647690</li>
                    </ul>
                    <p>TOTAL PRICE: <b>₦</b>56,000.00</p>
                </div>
                <div className="order-details-sub-container">
                    <p className="order-details-sub-title">PAYMENT DETAILS</p>
                    <ul>
                        <li><span className="order-list-span">Payment Method:</span> Credit Card</li>
                        <li><span className="order-list-span">Coupon Code:</span> N/A</li>
                        <li><span className="order-list-span">Order Sub Total:</span> N56,000</li>
                        <li><span className="order-list-span">Discount:</span> N0.00</li>
                        <li><span className="order-list-span">Grand Total:</span> N56,000</li>
                    </ul>
                    <p>TOTAL PRICE: <b>₦</b>56,000.00</p>
                </div>
                <div className="order-detail-bottom-status-container">
                    <p>ORDER STATUS:</p>
                    <div className="order-details-drop-down-filter">
                        <small className="order-details-drop-down-filter-small-border-text">filter order by status</small>
                       
                        <p>Status</p>
                        <TiArrowSortedDown className="order-details-drop-down-icon"/>
                    </div>
                </div>
                <div className="order-detail-bottom-tracking-container">
                    <p>TRACKING URL:</p>
                    <div className="order-details-drop-down-filter">
                        <small className="order-details-drop-down-filter-small-border-text">filter order by status</small>
                       
                        <p>Tracking Url</p>
                        <TiArrowSortedDown className="order-details-drop-down-icon"/>
                    </div>
                </div>
                <div className="order-details-button-container">
                    <button className="order-details-cancel-button">Cancel</button>
                    <button className="order-details-save-button">Save changes</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsPage;