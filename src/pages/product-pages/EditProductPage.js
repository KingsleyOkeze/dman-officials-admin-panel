import "../../styles/pages-styles/product-pages-styles/EditProductPage.css";
import image from "../../images/image.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { MdError } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import Alert from "../../components/Alert";

function EditProductPage () {
    return(
        <div className="edit-product-page-container">
            <h3 className="edit-product-page-head-h3">Edit Product</h3>
            {/* <Alert className="edit-product-page-alert"/> */}
            <div className="edit-product-page-sub-head-container">
            <p className="edit-product-page-sub-head">Editting a Product</p>
            <p className="edit-product-page-sub-head-added-date">Added date: 2024-10-24 10:59pm</p>
            </div>
            <div className="edit-product-images-container">
                <div className="edit-product-image-div">
                    <LiaTimesSolid className="edit-product-remove-image-icon"/>
                    <CiImageOn className="edit-product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="edit-product-image-div">
                   <LiaTimesSolid className="edit-product-remove-image-icon"/>
                    <CiImageOn className="edit-product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="edit-product-image-div">
                    <LiaTimesSolid className="edit-product-remove-image-icon"/>
                    <CiImageOn className="edit-product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="edit-product-image-div">
                    <LiaTimesSolid className="edit-product-remove-image-icon"/>
                    <CiImageOn className="edit-product-image-icon"/>
                    <p>First Image</p>
                </div>
            </div>

            <div className="edit-product-input-section">
                <div className="edit-product-input-container">
                    <label>Product Name * </label>
                    <div>
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="edit-product-input-container">
                    <label>Product Details * </label>
                    <div>
                        <textarea type="text" placeholder="Product description" />
                    </div>
                </div>
                <div className="edit-product-specs-section">
                    <div className="edit-product-sub-specs">
                        <p>Category</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Size</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Brand</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Price</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Offer price</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Quality</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Color</p>
                        <div className="edit-product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <div className="edit-product-timer-container">
                    <p>Timer <input type="checkbox" className="edit-product-timer-checkbox"/></p>
                    <div className="edit-all-time-container">
                        <div>
                            <p><span>12</span> Hrs </p>
                        </div>
                        <div>
                            <p><span>56</span> Mins </p>
                        </div>
                        <div>
                            <p><span>31</span> Secs</p>
                        </div>

                    </div>
                </div> 
                <div className="edit-product-button-container">
                   <button className="edit-product-save-button">Submit changes</button>
                   <button className="edit-product-cancel-button">Cancel</button>
                </div>

            </div>






        </div>
    )
}

export default EditProductPage;