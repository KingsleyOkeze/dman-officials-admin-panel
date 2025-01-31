import "../../styles/pages-styles/product-pages-styles/ProductPage.css";
import image from "../../images/image.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState, useRef, useContext} from "react";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import Alert from "../../components/Alert";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function ProductPage () {
    const { accessToken, refreshAccessToken } = useContext(AuthContext);
    const { showAlert, customAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);
    const [fourthImagePreview, setFourthImagePreview] = useState(null);


    const [productImages, setProductImages] = useState({ firstImage: "", secondImage: "", thirdImage: "", fourthImage: ""});
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState();
    const [productCategory, setProductCategory] = useState('Select Category');
    const [productSubCategory, setProductSubCategory] = useState('Sub Category');
    const [productSize, setProductSize] = useState(['Selected Size']);
    const [productPrice, setProductPrice] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productOfferPrice, setProductOfferPrice] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productColor, setProductColor] = useState(['Select Color']);
    const [productTimer, setProductTimer] = useState({ hrs: 0, min: 0, sec: 0});


    const [addTimer, setAddTimer] = useState(false)
             
    // Create refs for each file input element to directly access and reset them    
    const firstImageInputRef = useRef(null); // Ref for the first image file input
    const secondImageInputRef = useRef(null); // Ref for the second image file input
    const thirdImageInputRef = useRef(null); // Ref for the third image file input
    const fourthImageInputRef = useRef(null); // Ref for the fourth image file input
    



    const handleFirstImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImages((prevState) => ({
            ...prevState,
            firstImage: file
          }));
          setFirstImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleSecondImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImages((prevState) => ({
            ...prevState,
            secondImage: file
          }));
          setSecondImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleThirdImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImages((prevState) => ({
            ...prevState,
            thirdImage: file
          }));
          setThirdImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      const handleFourthImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProductImages((prevState) => ({
            ...prevState,
            fourthImage: file
          }));
          setFourthImagePreview(URL.createObjectURL(file)); // Generate a preview URL
        }
      };
    
      // Log productImages after it changes
      useEffect(() => {
        console.log("Updated productImages:", productImages);
      }, [productImages]);



   
      const clearFirstImage = () => {
        setProductImages((prevState) => ({
          ...prevState,
          firstImage: null, // Clear first image
        }));
        setFirstImagePreview(null); // Clear preview URL
        firstImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearSecondImage = () => {
        setProductImages((prevState) => ({
          ...prevState,
          secondImage: null, // Clear second image
        }));
        setSecondImagePreview(null); // Clear preview URL
        secondImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearThirdImage = () => {
        setProductImages((prevState) => ({
          ...prevState,
          thirdImage: null, // Clear third image
        }));
        setThirdImagePreview(null); // Clear preview URL
        thirdImageInputRef.current.value = null; // Reset the file input
      };
      
      const clearFourthImage = () => {
        setProductImages((prevState) => ({
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
    

    const categories = ['Mens Wear', 'Foot Wear', 'Accessories'];
    const subCategories = ['T Shirt', 'Hoodie', 'Sweat Shirt', 'Bullup 500'];
    const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
    const colors = ['Black ', 'White'];
  


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


    const handleShowMultiDropdownSelection = (item) => {
        if (item.length > 1) {
            const newArr = item.filter(i => i !== item[0]);
            const formattedNewArr = newArr.join(", ");
            return formattedNewArr;
        }
    }




    const handleAddProduct = async () => {
        setLoading(true); // Enable loading state

        //Emsure we send only colors selected and not the select text word
        const actualProductColorArr = productColor.filter(i => i !== productColor[0]);
        console.log('colors is ', actualProductColorArr);

       //Emsure we send only sizes selected and not the select text word
       const actualProductSizeArr = productSize.filter(i => i !== productSize[0]);
       console.log('size is ', actualProductSizeArr);


        // // Create a FormData instance
        const formData = new FormData();

        
        // Append image files (only if they exist)
        Object.keys(productImages).forEach((key) => {
           const image = productImages[key];
           console.log("Appending image:", image); // Debug the file object
           if (image) {
             formData.append("images", image); // "images" is the key on the backend
           }
        });
        // Append all fields to FormData
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", productCategory.replace(/\s+/g, ''));
        formData.append("productSubCategory", productSubCategory.replace(/\s+/g, ''));
        formData.append("productSize", actualProductSizeArr);
        formData.append("productColor", actualProductColorArr);
        formData.append("productBrand", productBrand);
        formData.append("productPrice", productPrice);
        formData.append("productOfferPrice", productOfferPrice);
        formData.append("productQuantity", productQuantity);
        formData.append("productTimer", productTimer);
console.log(
    productImages, productName, productDescription, productCategory, productSubCategory, productSize, productColor, productBrand, productPrice, productOfferPrice, productQuantity, productTimer
    ,addTimer);
        try {
            const response = await axios.post("/admin/add-product", formData, 
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`, // Add token to Authorization header
                },
            });

            if (response.status === 201) {
                console.log("successfully added product", response.data)
                showAlert("success", response.data.message); 
                
            } 
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const errMessage = err.response.data.error;

                if (status === 400 || status === 403 || status === 404 || status === 500) {
                    showAlert(status, errMessage)
                } else if (status === 401) {
                    refreshAccessToken(handleAddProduct);
                }
            } else {
                showAlert("Error", "An Unknow Error Occured!")
            }
        } finally {
            setLoading(false); // Disable loading state
        }
    };

    return(
        <div className="product-page-container">
            {customAlert.type ? (<Alert />) : "" }
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
                        <img src={firstImagePreview} alt="Preview" 
                            onClick={() => {
                            const newTab = window.open(firstImagePreview, '_blank');
                            newTab.focus();}}
                        />
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
                    <img src={secondImagePreview} alt="Preview"
                        onClick={() => {
                            const newTab = window.open(secondImagePreview, '_blank');
                            newTab.focus();
                        }} 
                    />
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
                        <img src={thirdImagePreview} alt="Preview" 
                            onClick={() => {
                                const newTab = window.open(thirdImagePreview, '_blank');
                                newTab.focus();
                            }}
                        />
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
                        <img src={fourthImagePreview} alt="Preview" 
                            onClick={() => {
                                const newTab = window.open(fourthImagePreview, '_blank');
                                newTab.focus();
                            }}
                        />
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
                        <input type="text" 
                            value={productName}
                            placeholder="Enter product name"
                            onChange={(e) => {
                                if (e.target.value.length <= 30) {
                                    setProductName(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="product-input-container">
                    <label>Product Details * </label>
                    <div>
                        <textarea type="text" 
                            value={productDescription}
                            placeholder="Product description"
                            onChange={(e) => {
                                if (e.target.value.length <= 500) {
                                    setProductDescription(e.target.value);
                                }
                            }}
                        />
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
                            <p>{productSize.length > 1 ? handleShowMultiDropdownSelection(productSize) : productSize[0]}</p>
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
                                    <li key={size} /*onClick={() => handleSizeClick(size)}*/>
                                        <input type="checkbox" 
                                            className="product-timer-checkbox"
                                            onChange={(e) => {
                                                if (!productSize.includes(size)) {
                                                    // Add the size to the array
                                                    setProductSize((prevState) => [...prevState, size]); // Fixed spread syntax
                                                } else {
                                                    // Remove the size from the array
                                                    setProductSize((prevState) =>
                                                        prevState.filter((i) => i !== size)
                                                    );
                                                }
                                            }}
                                            /> {size}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                    <div className="product-sub-specs">
                        <p>Brand</p>
                        <div className="product-sub-input-container">
                            <input type="text" 
                                className="product-sub-input"
                                onChange={(e) => setProductBrand(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Price</p>
                        <div className="product-sub-input-container">
                            <input type="number" 
                                className="product-sub-input" 
                                value={productPrice}
                                min="0" // Ensures the input value cannot be negative
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value); // Convert the input value to a number
                                    if (!isNaN(value) && value >= 0) { // Check if the value is a valid number and non-negative
                                        setProductPrice(value); // Update state only if the value is valid
                                    }
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Offer price</p>
                        <div className="product-sub-input-container">
                            <input type="text" 
                                className="product-sub-input"
                                onChange={(e) => setProductOfferPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Quantity</p>
                        <div className="product-sub-input-container">
                            <input type="number" 
                                className="product-sub-input"
                                onChange={(e) => setProductQuantity(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="product-sub-specs">
                        <p>Color</p>
                        <div className="product-select-drop-down" onClick={handleColorDropdownClick}>
                            <p>{productColor.length > 1 ? handleShowMultiDropdownSelection(productColor) : productColor[0]}</p>
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
                                    <li key={color} /*onClick={() => handleColorClick(color)}*/>
                                        <input type="checkbox" 
                                            className="product-timer-checkbox"
                                            onChange={(e) => {
                                                if (!productColor.includes(color)) {
                                                    // Add the color to the array
                                                    setProductColor((prevState) => [...prevState, color]); // Fixed spread syntax
                                                } else {
                                                    // Remove the color from the array
                                                    setProductColor((prevState) =>
                                                        prevState.filter((i) => i !== color)
                                                    );
                                                }
                                            }}
                                            /> <span>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                </div>
                <div className="product-timer-container">
                    <p>Timer 
                        <input type="checkbox" 
                        checked={addTimer}
                        onChange={() => {
                            const newAddTimer = !addTimer; // Toggle the addTimer state
                            setAddTimer(newAddTimer); 
                    
                            // If the checkbox is unchecked, reset the timer values to 0
                            if (!newAddTimer) {
                              setProductTimer({ hrs: 0, min: 0, sec: 0 });
                            }
                        }} 
                        className="product-timer-checkbox"/></p>
                    <div className="all-time-container">
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="12"
                                    disabled={addTimer === false ? true : false}
                                    value={productTimer.hrs}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (inputValue.length <= 2 || inputValue === '') {
                                          const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                          if (!isNaN(numericValue) && numericValue <= 99) {
                                            setProductTimer({...productTimer, hrs: numericValue});
                                          }
                                        }
                                      }}
                                      style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Hrs </p>
                        </div>
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="00"
                                    min={0}
                                    max={59}
                                    disabled={addTimer === false ? true : false}
                                    value={productTimer.min}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (inputValue.length <= 2 || inputValue === '') {
                                        const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                        if (!isNaN(numericValue) && numericValue <= 59) {
                                          setProductTimer({...productTimer, min: numericValue});
                                        }
                                      }
                                    }}
                                    style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Mins </p>
                        </div>
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="00"
                                    min={0}
                                    max={59}
                                    disabled={addTimer === false ? true : false}
                                    value={productTimer.sec}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (inputValue.length <= 2 || inputValue === '') {
                                        const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                        if (!isNaN(numericValue) && numericValue <= 59) {
                                          setProductTimer({...productTimer, sec: numericValue});
                                        }
                                      }
                                    }}
                                    style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Secs</p>
                        </div>

                    </div>
                </div> 
                <button
                    className={`product-create-button ${loading ? "loading" : ""}`}
                    onClick={handleAddProduct}
                    disabled={loading} // Disable the button while loading
                >
                    {loading ? (
                       <div className="add-product-spinner"></div> // Show spinner when loading
                    ) : (
                        "Submit" // Show "Submit" text when not loading
                    )}
                </button>

            </div>



        </div>
    )

}


export default ProductPage;