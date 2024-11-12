import "../../styles/pages-styles/product-pages-styles/ProductPage.css";
import image from "../../images/image.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";


function ProductPage () {
    return(
        <div className="product-page-container">
            <h3 className="product-page-head-h3">Add Product</h3>
            <p className="product-page-sub-head">Creating new Product</p>
            <div className="product-images-container">
                <div className="product-image-div">
                    {/* <img src={image} width={76.13} height={42.29}/> */}
                    <CiImageOn className="product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="product-image-div">
                    <CiImageOn className="product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="product-image-div">
                    <CiImageOn className="product-image-icon"/>
                    <p>First Image</p>
                </div>
                <div className="product-image-div">
                    <CiImageOn className="product-image-icon"/>
                    <p>First Image</p>
                </div>
            </div>

            <div className="product-input-section">
                <div className="product-input-container">
                    <label>Product Name * </label>
                    <div>
                        <input type="text" placeholder="Enter product name" />
                    </div>
                </div>
                <div className="product-input-container">
                    <label>Product Details * </label>
                    <div>
                        <textarea type="text" placeholder="Product description" />
                    </div>
                </div>
                <div className="product-specs-section">
                    <div className="product-sub-specs">
                        <p>Category</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Size</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Brand</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Price</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Offer price</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Quality</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Color</p>
                        <div className="product-select-drop-down">
                            <p>Select category</p>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                <div className="product-timer-container">
                    <p>Timer <input type="checkbox" className="product-timer-checkbox"/></p>
                    <div className="all-time-container">
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
                <button className="product-create-button">Submit</button>

            </div>






        </div>
    )
}

export default ProductPage;