import "../../styles/pages-styles/product-pages-styles/AddProductPage.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState, useRef, useContext} from "react";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import Alert from "../../components/Alert";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function AddProductPage () {
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
    const [productAddedTimer, setProductAddedTimer] = useState({ hrs: 0, min: 0, sec: 0});

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
    const sizes = ['S', 'M', 'L', 'XL'];
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

        //Ensure we send only Product Category selected and not the "Select Category" placeholder word
        const actualProductCategory = productCategory === 'Select Category' ? '' : productCategory.replace(/\s+/g, '');

        //Ensure we send only Product SubCategory selected and not the "Sub Category" placeholder word
        const actualProductSubCategory = productSubCategory === 'Sub Category' ? '' : productSubCategory.replace(/\s+/g, '');

        //Ensure we send only colors selected and not the "select color" placeholder word
        const actualProductColorArr = productColor.filter(i => i !== productColor[0]);
        console.log('colors is ', actualProductColorArr);

       //Ensure we send only sizes selected and not the "select size" placeholder word
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

        // Append the size array
        actualProductSizeArr.forEach((size) => {
            formData.append("productSize[]", size);
        });

        // Append colors array
        actualProductColorArr.forEach((color) => {
            formData.append("productColor[]", color);
        });

        // Append all fields to FormData
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productCategory", actualProductCategory.replace(/\s+/g, ''));
        formData.append("productSubCategory", actualProductSubCategory.replace(/\s+/g, ''));
        formData.append("productBrand", productBrand);
        formData.append("productPrice", productPrice);
        formData.append("productOfferPrice", productOfferPrice);
        formData.append("productQuantity", productQuantity);
        // When appending an object to FormData, use JSON.stringify() to convert it into a JSON string. 
        // This ensures the object is correctly transmitted and can be parsed on the server side. 
        formData.append("productAddedTimer", JSON.stringify(productAddedTimer));

console.log(
    productImages, productName, productDescription, productCategory, productSubCategory, productSize, productColor, productBrand, productPrice, productOfferPrice, productQuantity, productAddedTimer,addTimer);
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
        <div className="add-product-page-container">
            {customAlert.type ? (<Alert />) : "" }
            <h3 className="add-product-page-head-h3">Add Product</h3>
            <p className="add-product-page-sub-head">Creating new Product</p>
            <div className="add-product-images-container">
                <div className="add-product-image-div">
                    {firstImagePreview && (
                        <LiaTimesSolid
                            className="add-product-img-remove-image-icon"
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
                        <CiImageOn className="add-product-image-icon" />
                    )}
                    <label htmlFor="file-input-1" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-1"
                        accept="image/*"
                        onChange={handleFirstImageChange}
                        className="add-product-image-pick-input"
                        ref={firstImageInputRef}
                    />
                    <p className="file-name-text">
                        {firstImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="add-product-image-div">
                    {secondImagePreview && (
                    <LiaTimesSolid
                        className="add-product-img-remove-image-icon"
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
                        <CiImageOn className="add-product-image-icon" />
                    )}
                    <label htmlFor="file-input-2" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-2"
                        accept="image/*"
                        onChange={handleSecondImageChange}
                        className="add-product-image-pick-input"
                        ref={secondImageInputRef}
                    />
                    <p className="file-name-text">
                        {secondImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="add-product-image-div">
                    {thirdImagePreview && (
                        <LiaTimesSolid
                            className="add-product-img-remove-image-icon"
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
                        <CiImageOn className="add-product-image-icon" />
                    )}
                    <label htmlFor="file-input-3" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-3"
                        accept="image/*"
                        onChange={handleThirdImageChange}
                        className="add-product-image-pick-input"
                        ref={thirdImageInputRef}
                    />
                    <p className="file-name-text">
                        {thirdImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="add-product-image-div">
                    {fourthImagePreview && (
                        <LiaTimesSolid
                            className="add-product-img-remove-image-icon"
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
                        <CiImageOn className="add-product-image-icon" />
                    )}
                    <label htmlFor="file-input-4" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-4"
                        accept="image/*"
                        onChange={handleFourthImageChange}
                        className="add-product-image-pick-input"
                        ref={fourthImageInputRef}
                    />
                    <p className="file-name-text">
                        {fourthImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
            </div>

            <div className="add-product-input-section">
                <div className="add-product-input-container">
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
                <div className="add-product-input-container">
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
                <div className="add-product-specs-section">
                    <div className="add-product-sub-specs">
                        <p>Category</p>
                        <div className="add-product-select-drop-down" onClick={handleCategoryDropdownClick}>
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
                    <div className="add-product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="add-product-select-drop-down" onClick={handleSubCategoryDropdownClick}>
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
                    <div className="add-product-sub-specs">
                        <p>Size</p>
                        <div className="add-product-select-drop-down" onClick={handleSizeDropdownClick}>
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
                                            className="add-product-timer-checkbox"
                                            value={size}
                                            checked={productSize.includes(size)} // Keeps checkmark when reopening
                                            onChange={(e) => {
                                                const value = e.target.value; // Get the size value from checkbox
                                                setProductSize((prevSizes) =>
                                                    prevSizes.includes(value)
                                                        ? prevSizes.filter((s) => s !== value) // Remove size
                                                        : [...prevSizes, value] // Add size
                                                );
                                            }}
                                        /> 
                                            {size}
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Brand</p>
                        <div className="add-product-sub-input-container">
                            <input type="text" 
                                className="add-product-sub-input"
                                onChange={(e) => setProductBrand(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Price</p>
                        <div className="add-product-sub-input-container">
                            <input type="number" 
                                className="add-product-sub-input" 
                                value={productPrice}
                                min="0" // Ensures the input value cannot be negative
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = "";
                                        return;
                                    }
                                    setProductPrice(Number(value));
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Offer price</p>
                        <div className="add-product-sub-input-container">
                            <input type="number" 
                                className="add-product-sub-input"
                                value={productOfferPrice}
                                min="0" // Ensures the input value cannot be negative
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = "";
                                        return;
                                    }
                                    setProductOfferPrice(Number(value));
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Quantity</p>
                        <div className="add-product-sub-input-container">
                            <input 
                                type="number" 
                                className="add-product-sub-input"
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = "";
                                        return;
                                    }
                                    setProductQuantity(Number(value));
                                }}
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Color</p>
                        <div className="add-product-select-drop-down" onClick={handleColorDropdownClick}>
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
                                            className="add-product-timer-checkbox"
                                            value={color} 
                                            checked={productColor.includes(color)} // Keeps checkmark when reopening
                                            onChange={(e) => {
                                                const value = e.target.value; // Get selected color
                                                setProductColor((prevColors) =>
                                                    prevColors.includes(value)
                                                        ? prevColors.filter((c) => c !== value) // Remove color
                                                        : [...prevColors, value] // Add color
                                                );
                                            }}
                                        /> <span>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : <></>}
                    </div>
                </div>
                <div className="add-product-timer-container">
                    <p>Timer 
                        <input type="checkbox" 
                        checked={addTimer}
                        onChange={() => {
                            const newAddTimer = !addTimer; // Toggle the addTimer state
                            setAddTimer(newAddTimer); 
                    
                            // If the checkbox is unchecked, reset the timer values to 0
                            if (!newAddTimer) {
                              setProductAddedTimer({ hrs: 0, min: 0, sec: 0 });
                            }
                        }} 
                        className="add-product-timer-checkbox"/></p>
                    <div className="all-time-container">
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="12"
                                    disabled={addTimer === false ? true : false}
                                    value={productAddedTimer.hrs}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (inputValue.length <= 2 || inputValue === '') {
                                          const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                          if (!isNaN(numericValue) && numericValue <= 99) {
                                            setProductAddedTimer({...productAddedTimer, hrs: numericValue});
                                          }
                                        }
                                      }}
                                      style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Hrs 
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="00"
                                    min={0}
                                    max={59}
                                    disabled={addTimer === false ? true : false}
                                    value={productAddedTimer.min}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (inputValue.length <= 2 || inputValue === '') {
                                        const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                        if (!isNaN(numericValue) && numericValue <= 59) {
                                          setProductAddedTimer({...productAddedTimer, min: numericValue});
                                        }
                                      }
                                    }}
                                    style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Mins 
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>
                                    <input type="number" 
                                    placeholder="00"
                                    min={0}
                                    max={59}
                                    disabled={addTimer === false ? true : false}
                                    value={productAddedTimer.sec}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (inputValue.length <= 2 || inputValue === '') {
                                        const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                        if (!isNaN(numericValue) && numericValue <= 59) {
                                          setProductAddedTimer({...productAddedTimer, sec: numericValue});
                                        }
                                      }
                                    }}
                                    style={{ background: addTimer === false ? 'lightgrey' : '#F5F3F5'}}
                                    />
                                </span> Secs
                            </p>
                        </div>

                    </div>
                </div> 
                <button
                    className={`add-product-create-button ${loading ? "loading" : ""}`}
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


export default AddProductPage;