import "../../styles/pages-styles/coupon-pages-styles/EditCouponCodePage.css"
import { SlCalender } from "react-icons/sl";
import { TiArrowSortedDown } from "react-icons/ti";

function EditCouponPage () {

    return(
        <div className="edit-coupon-page-container">
            <h3 className="edit-coupon-page-h3">Edit Coupon</h3>
            <p className="edit-coupon-page-sub-head">Creating new Coupon</p>
            <div className="edit-coupon-first-section-container">
                <div className="edit-coupon-first-section-input-container">
                    <label>Coupon code </label>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <label>Discount type</label>
                    <div className="edit-coupon-first-section-dropdown">
                        <p>Select discount type</p>
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <label>Discount amount</label>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="edit-coupon-first-section-input-container">
                    <label>Minimum purchase amount</label>
                    <div className="edit-coupon-first-section-input-div">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
            </div>
            <div className="edit-coupon-second-section-container">
                <div className="edit-coupon-second-section-input-container">
                    <label>Date</label>
                    <div className="edit-coupon-second-section-input-div">
                        <input type="date" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="edit-coupon-second-section-input-container">
                    <label>Status</label>
                    <div className="edit-coupon-second-section-dropdown">
                        <p>Select status</p>
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="edit-coupon-second-section-input-container">
                    <label>Category</label>
                    <div className="edit-coupon-second-section-dropdown">
                        <p>Select category</p>
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="edit-coupon-second-section-input-container">
                    <label>Sub-Category</label>
                    <div className="edit-coupon-second-section-dropdown">
                        <p>Select sub category</p>
                        <TiArrowSortedDown className="edit-coupon-drop-down-icon"/>
                    </div>
                </div>
                <div className="edit-coupon-second-section-input-container">
                    <label>Product</label>
                    <div className="edit-coupon-second-section-input-container">
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
            </div>
            <button className="edit-coupon-submit-button">Submit</button>
        </div>
    )
}

export default EditCouponPage;