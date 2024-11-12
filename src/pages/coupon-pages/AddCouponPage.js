import "../../styles/pages-styles/coupon-pages-styles/AddCouponPage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";

function AddCouponPage () {

    return(
        <div className="add-coupon-page-container">
            <h3 className="add-coupon-page-h3">Add Coupon</h3>
            <p className="add-coupon-page-sub-head">Creating new Coupon</p>
            <div className="add-coupon-first-section-container">
                <div className="add-coupon-first-section-input-container">
                    <label>Coupon code </label>
                    <div className="add-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="add-coupon-first-section-input-container">
                    <label>Discount type</label>
                    <div className="add-coupon-first-section-dropdown">
                        <p>Select discount type</p>
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="add-coupon-first-section-input-container">
                    <label>Discount amount</label>
                    <div className="add-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="add-coupon-first-section-input-container">
                    <label>Minimum purchase amount</label>
                    <div className="add-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
            </div>
            <div className="add-coupon-second-section-container">
                <div className="add-coupon-second-section-input-container">
                    <label>Date</label>
                    <div className="add-coupon-second-section-input-div">
                        <input type="date" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="add-coupon-second-section-input-container">
                    <label>Status</label>
                    <div className="add-coupon-second-section-dropdown">
                        <p>Select status</p>
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="add-coupon-second-section-input-container">
                    <label>Category</label>
                    <div className="add-coupon-second-section-dropdown">
                        <p>Select category</p>
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="add-coupon-second-section-input-container">
                    <label>Sub-Category</label>
                    <div className="add-coupon-second-section-dropdown">
                        <p>Select sub category</p>
                        <TiArrowSortedDown className="add-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="add-coupon-second-section-input-container">
                    <label>Product</label>
                    <div className="add-coupon-second-section-input-container">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
            </div>
            <button className="add-coupon-submit-button">Submit</button>
        </div>
    )
}

export default AddCouponPage;