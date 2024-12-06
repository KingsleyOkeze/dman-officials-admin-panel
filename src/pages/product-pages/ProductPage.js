import "../../styles/pages-styles/product-pages-styles/ProductPage.css";
import image from "../../images/image.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { useRef } from 'react';
import { TiArrowSortedUp } from "react-icons/ti";





function ProductPage () {
    const [image, setImage] = useState(null);
    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);
    const [fourthImagePreview, setFourthImagePreview] = useState(null);


    const [productImage, setProductImage] = useState({ firstImage: "", secondImage: "", thirdImage: "", fourthImage: ""});
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState();
    const [productCategory, setProductCategory] = useState('Select category');
    const [productSubCategory, setProductSubCategory] = useState('Sub category');
    const [productSize, setProductSize] = useState('Selected size');
    const [productPrice, setProductPrice] = useState('');
    
    const [productBrand, setProductBrand] = useState('');
    const [productOfferPrice, setProductOfferPrice] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productColor, setProductColor] = useState('Select color');
    const [productTimer, setProductTimer] = useState();

             
    // Create refs for each file input element to directly access and reset them    
    const firstImageInputRef = useRef(null); // Ref for the first image file input
    const secondImageInputRef = useRef(null); // Ref for the second image file input
    const thirdImageInputRef = useRef(null); // Ref for the third image file input
    const fourthImageInputRef = useRef(null); // Ref for the fourth image file input
    



    const handleFirstImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImage((prevState) => ({
            ...prevState,
            firstImage: file
          }));
          setFirstImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleSecondImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImage((prevState) => ({
            ...prevState,
            secondImage: file
          }));
          setSecondImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleThirdImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImage((prevState) => ({
            ...prevState,
            thirdImage: file
          }));
          setThirdImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleFourthImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImage((prevState) => ({
            ...prevState,
            fourthImage: file
          }));
          setFourthImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      // Log productImage after it changes
      useEffect(() => {
        console.log("Updated productImage:", productImage);
      }, [productImage]);



   
      const clearFirstImage = () => {
        setProductImage((prevState) => ({
          ...prevState,
          firstImage: null, // Clear first image
        }));
        setFirstImagePreview(null); // Clear preview URL
        firstImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearSecondImage = () => {
        setProductImage((prevState) => ({
          ...prevState,
          secondImage: null, // Clear second image
        }));
        setSecondImagePreview(null); // Clear preview URL
        secondImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearThirdImage = () => {
        setProductImage((prevState) => ({
          ...prevState,
          thirdImage: null, // Clear third image
        }));
        setThirdImagePreview(null); // Clear preview URL
        thirdImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearFourthImage = () => {
        setProductImage((prevState) => ({
          ...prevState,
          fourthImage: null, // Clear fourth image
        }));
        setFourthImagePreview(null); // Clear preview URL
        fourthImageInputRef.current.value = null; // Reset the file input
      };
      





    // DROP DOWNS CATEGORY
    const [categoryDropDownListIsOpen, setCategoryDropDownListIsOpen] = useState(false);
    const [subCategoryDropDownListIsOpen, setSubCategoryDropDownListIsOpen] = useState(false);
    const [sizeDropDownListIsOpen, setSizeDropDownListIsOpen] = useState(false);
    const [colorDropDownListIsOpen, setColorDropDownListIsOpen] = useState(false);
    
    // const [selectedCategory, setSelectedCategory] = useState('Select category');
    // const [selectedSubCategory, setSelectedSubCategory] = useState('Sub category');
    // const [selectedSize, setSelectedSize] = useState('Selected size');
    // const [selectedColor, setSelectedColor] = useState('Selected color');
    







    const categories = ['Men wear', 'Women wear', 'Accessory'];
    const subCategories = ['Top', 'Undies', 'Watch'];
    const sizes = ['small', 'medium', 'large', 'extra large'];
    const colors = ['red', 'yellow', 'blue'];
  


    const handleCategoryDropdownClick = () => {
        setCategoryDropDownListIsOpen(!categoryDropDownListIsOpen);
    };
  
    const handleCategoryClick = (category) => {
    //   setSelectedCategory(category);
      setProductCategory(category);
      setCategoryDropDownListIsOpen(false);
    };
    

    const handleSubCategoryDropdownClick = () => {
        setSubCategoryDropDownListIsOpen(!subCategoryDropDownListIsOpen);
    };
  
    const handleSubCategoryClick = (subCategory) => {
    //   setSelectedSubCategory(subCategory);
      setProductSubCategory(subCategory);
      setSubCategoryDropDownListIsOpen(false);
    };


    const handleSizeDropdownClick = () => {
        setSizeDropDownListIsOpen(!sizeDropDownListIsOpen);
    };
  
    const handleSizeClick = (size) => {
    //   setSelectedSize(size);
      setProductSize(size);
      setSizeDropDownListIsOpen(false);
    };

    const handleColorDropdownClick = () => {
        setColorDropDownListIsOpen(!colorDropDownListIsOpen);
    };
  
    const handleColorClick = (color) => {
    //   setSelectedColor(color);
      setProductColor(color);
      setColorDropDownListIsOpen(false);
    };






















    const handleAddProduct = () => {
        // Create a FormData instance
        const formData = new FormData();

        // Append all fields to FormData
        formData.append("productImage", productImage); // Append the image
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory);
        formData.append("productSubCategory", productSubCategory);
        formData.append("productSize", productSize);
        formData.append("productColor", productColor);
        formData.append("productOfferPrice", productOfferPrice);
        formData.append("productQuantity", productQuantity);
        formData.append("productTimer", productTimer);
console.log(
    productImage, productName, productDescription, productCategory, productSubCategory, productSize, productColor, productOfferPrice, productQuantity, productTimer
);
        try {
            const response = axios.post("/admin/add-product", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },          
            })
        } catch (err) {

        }
    };

    return(
        <div className="product-page-container">
            <h3 className="product-page-head-h3">Add Product</h3>
            <p className="product-page-sub-head">Creating new Product</p>
            <div className="product-images-container">
                <div className="product-image-div">
                    {firstImagePreview && (
                        <LiaTimesSolid
                            className="product-img-remove-image-icon"
                            onClick={clearFirstImage}
                        />
                    )}
                    {firstImagePreview ? (
                        <img src={firstImagePreview} alt="Preview" />
                    ) : (
                        <CiImageOn className="product-image-icon" />
                    )}
                    <label htmlFor="file-input-1" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-1"
                        accept="image/*"
                        onChange={handleFirstImageChange}
                        className="product-image-pick-input"
                        ref={firstImageInputRef}
                    />
                    <p className="file-name-text">
                        {firstImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="product-image-div">
                    {secondImagePreview && (
                    <LiaTimesSolid
                        className="product-img-remove-image-icon"
                        onClick={clearSecondImage}
                    />
                    )}
                    {secondImagePreview ? (
                    <img src={secondImagePreview} alt="Preview" />
                    ) : (
                        <CiImageOn className="product-image-icon" />
                    )}
                    <label htmlFor="file-input-2" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-2"
                        accept="image/*"
                        onChange={handleSecondImageChange}
                        className="product-image-pick-input"
                        ref={secondImageInputRef}
                    />
                    <p className="file-name-text">
                        {secondImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="product-image-div">
                    {thirdImagePreview && (
                        <LiaTimesSolid
                            className="product-img-remove-image-icon"
                            onClick={clearThirdImage}
                        />
                    )}
                    {thirdImagePreview ? (
                        <img src={thirdImagePreview} alt="Preview" />
                    ) : (
                        <CiImageOn className="product-image-icon" />
                    )}
                    <label htmlFor="file-input-3" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-3"
                        accept="image/*"
                        onChange={handleThirdImageChange}
                        className="product-image-pick-input"
                        ref={thirdImageInputRef}
                    />
                    <p className="file-name-text">
                        {thirdImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="product-image-div">
                    {fourthImagePreview && (
                        <LiaTimesSolid
                            className="product-img-remove-image-icon"
                            onClick={clearFourthImage}
                        />
                    )}
                    {fourthImagePreview ? (
                        <img src={fourthImagePreview} alt="Preview" />
                        ) : (
                        <CiImageOn className="product-image-icon" />
                    )}
                    <label htmlFor="file-input-4" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-4"
                        accept="image/*"
                        onChange={handleFourthImageChange}
                        className="product-image-pick-input"
                        ref={fourthImageInputRef}
                    />
                    <p className="file-name-text">
                        {fourthImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
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
                        <div className="product-select-drop-down" onClick={handleCategoryDropdownClick}>
                            <p>{productCategory}</p>
                            {
                                categoryDropDownListIsOpen ? 
                                    <TiArrowSortedUp />
                                : 
                                    <TiArrowSortedDown />
                                    
                            }
                        </div>
                        {categoryDropDownListIsOpen === true ? (
                            <ul className="dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>} 
                    </div>
                    <div className="product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="product-select-drop-down" onClick={handleSubCategoryDropdownClick}>
                            <p>{productSubCategory}</p>
                            {
                                subCategoryDropDownListIsOpen ? 
                                    <TiArrowSortedUp />
                                : 
                                    <TiArrowSortedDown />
                                    
                            }
                        </div>
                        {subCategoryDropDownListIsOpen === true ? (
                            <ul className="dropdown-menu">
                                {subCategories.map((subCategory) => (
                                    <li key={subCategory} onClick={() => handleSubCategoryClick(subCategory)}>
                                        {subCategory}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                    <div className="product-sub-specs">
                        <p>Size</p>
                        <div className="product-select-drop-down" onClick={handleSizeDropdownClick}>
                            <p>{productSize}</p>
                            {
                               sizeDropDownListIsOpen ? 
                                    <TiArrowSortedUp />
                                : 
                                    <TiArrowSortedDown />
                                    
                            }
                        </div>
                        {sizeDropDownListIsOpen === true ? (
                            <ul className="dropdown-menu">
                                {sizes.map((size) => (
                                    <li key={size} onClick={() => handleSizeClick(size)}>
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                    <div className="product-sub-specs">
                        <p>Brand</p>
                        <div className="product-sub-input-container">
                            <input type="text" className="product-sub-input"
                                onChange={(e) => setProductBrand(e.target.value)}/>
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Price</p>
                        <div className="product-sub-input-container">
                            <input type="number" className="product-sub-input" 
                                onChange={(e) => setProductPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Offer price</p>
                        <div className="product-sub-input-container">
                            <input type="text" className="product-sub-input"
                                onChange={(e) => setProductOfferPrice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Quality</p>
                        <div className="product-sub-input-container">
                            <input type="text" className="product-sub-input"
                                onChange={(e) => setProductQuantity(e.target.value)}/>
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Color</p>
                        <div className="product-select-drop-down" onClick={handleColorDropdownClick}>
                            <p>{productColor}</p>
                            {
                                colorDropDownListIsOpen ? 
                                    <TiArrowSortedUp />
                                : 
                                    <TiArrowSortedDown />
                                    
                            }
                        </div>
                        {colorDropDownListIsOpen === true ? (
                            <ul className="dropdown-menu">
                                {colors.map((color) => (
                                    <li key={color} onClick={() => handleColorClick(color)}>
                                        {color}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                </div>
                <div className="product-timer-container">
                    <p>Timer <input type="checkbox" className="product-timer-checkbox"/></p>
                    <div className="all-time-container">
                        <div>
                            <p><span><input type="number" placeholder="12"/></span> Hrs </p>
                        </div>
                        <div>
                            <p><span><input type="number" placeholder="56"/></span> Mins </p>
                        </div>
                        <div>
                            <p><span><input type="number" placeholder="00"/></span> Secs</p>
                        </div>

                    </div>
                </div> 
                <button className="product-create-button">Submit</button>

            </div>






        </div>
    )
}

export default ProductPage;