import "../../styles/pages-styles/product-pages-styles/EditProductPage.css";
import image from "../../images/image.png";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { MdError } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import Alert from "../../components/Alert";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";


function EditProductPage () {
    const { productId } = useParams(); // Get product ID from URL
    const [customAlert, setCustomAlert] = useState({ visibility: false, status: "", title: "", message: ""});

    const [image, setImage] = useState(null);
    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);
    const [fourthImagePreview, setFourthImagePreview] = useState(null);


    const [productImages, setProductImages] = useState({ firstImage: "", secondImage: "", thirdImage: "", fourthImage: ""});
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState();
    const [productCategory, setProductCategory] = useState('Select category');
    const [productSubCategory, setProductSubCategory] = useState('Sub category');
    const [productSize, setProductSize] = useState([]);
    const [productPrice, setProductPrice] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productOfferPrice, setProductOfferPrice] = useState();
    const [productQuantity, setProductQuantity] = useState();
    const [productColor, setProductColor] = useState([]);
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
    

    const categories = ['Men wear', 'Women wear', 'Accessory'];
    const subCategories = ['Top', 'Undies', 'Watch'];
    const sizes = ['small', 'medium', 'large', 'extra large'];
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




    const handleEditProduct = async () => {

//         //Ensure we send only colors selected and not the select text word
//         const actualProductColorArr = productColor.filter(i => i !== productColor[0]);
//         console.log('colors is ', actualProductColorArr);

// //         //Ensure we send only sizes selected and not the select text word
//         const actualProductSizeArr = productSize.filter(i => i !== productSize[0]);
//         console.log('size is ', actualProductSizeArr);


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
        formData.append("productCategory", productCategory);
        formData.append("productSubCategory", productSubCategory);
        formData.append("productSize", productSize);
        formData.append("productColor", productColor);
        formData.append("productBrand", productBrand);
        formData.append("productPrice", productPrice);
        formData.append("productOfferPrice", productOfferPrice);
        formData.append("productQuantity", productQuantity);
        formData.append("productTimer", productTimer);
console.log(
    productImages, productName, productDescription, productCategory, productSubCategory, productSize, productColor, productBrand, productPrice, productOfferPrice, productQuantity, productTimer
    ,addTimer);
        try {
            const response = await axios.post(`/admin/edit-product/${productId}`, formData, 
                // {
                // headers: {

                // },          
            // }
             );

            if (response.status === 200) {
                console.log("successfully updated product", response.data)
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
            if (error.response) {
                console.log("error uploading", error);
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
        }
    };


    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`/admin/fetch-product-by-id/${productId}`);
                
                if (response.status === 200) {
                    // console.log("successfully added product", response.data)
                    const {
                        addedTimer,
                        createdAt,
                        productBrand,
                        productCategory,
                        productColor,
                        productDescription,
                        productImageUrl,
                        productName,
                        productOfferPrice,
                        productPrice,
                        productQuantity,
                        productSize,
                        productSubCategory,
                        timerExpires,
                        timerExpiryDate
                        
                    } = response.data;
console.log('fetch for edit', response.data)
                    
                    // Images... 
                    setFirstImagePreview(productImageUrl[0]);
                    setSecondImagePreview(productImageUrl[1]);
                    setThirdImagePreview(productImageUrl[2]);
                    setFourthImagePreview(productImageUrl[3]);
                
console.log('type of color', typeof productColor);
console.log('type of size', typeof productSize);

                    setProductName(productName)
                    setProductDescription(productDescription)
                    setProductCategory(productCategory)
                    setProductSubCategory(productSubCategory)
                    setProductSize(productSize)
                    setProductPrice(productPrice)
                    setProductBrand(productBrand)
                    setProductOfferPrice(productOfferPrice)
                    setProductQuantity(productQuantity)
                    setProductColor(productColor);
                    // setProductTimer(); 
                    setAddTimer(addedTimer)
                }

            } catch (error) {
                if (error.response) {
                    console.log("error fetching product by id", error);
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
    }, [productId]);


    return(
        <div className="edit-product-page-container">
            {customAlert.visibility === true && (
                <Alert
                    status={customAlert.status}
                    title={customAlert.title}
                    message={customAlert.message}
                />
            )}
            <h3 className="edit-product-page-head-h3">Edit Product</h3>
            <p className="edit-product-page-sub-head">Creating new Product</p>
            <div className="edit-product-images-container">
                <div className="edit-product-image-div">
                    {firstImagePreview && (
                        <LiaTimesSolid
                            className="edit-product-img-remove-image-icon"
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
                        <CiImageOn className="edit-product-image-icon" />
                    )}
                    <label htmlFor="file-input-1" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-1"
                        accept="image/*"
                        onChange={handleFirstImageChange}
                        className="edit-product-image-pick-input"
                        ref={firstImageInputRef}
                    />
                    <p className="file-name-text">
                        {firstImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="edit-product-image-div">
                    {secondImagePreview && (
                    <LiaTimesSolid
                        className="edit-product-img-remove-image-icon"
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
                        <CiImageOn className="edit-product-image-icon" />
                    )}
                    <label htmlFor="file-input-2" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-2"
                        accept="image/*"
                        onChange={handleSecondImageChange}
                        className="edit-product-image-pick-input"
                        ref={secondImageInputRef}
                    />
                    <p className="file-name-text">
                        {secondImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="edit-product-image-div">
                    {thirdImagePreview && (
                        <LiaTimesSolid
                            className="edit-product-img-remove-image-icon"
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
                        <CiImageOn className="edit-product-image-icon" />
                    )}
                    <label htmlFor="file-input-3" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-3"
                        accept="image/*"
                        onChange={handleThirdImageChange}
                        className="edit-product-image-pick-input"
                        ref={thirdImageInputRef}
                    />
                    <p className="file-name-text">
                        {thirdImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
                <div className="edit-product-image-div">
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
                        <CiImageOn className="edit-product-image-icon" />
                    )}
                    <label htmlFor="file-input-4" className="custom-file-label">
                        Pick Image
                    </label>
                    <input
                        type="file"
                        id="file-input-4"
                        accept="image/*"
                        onChange={handleFourthImageChange}
                        className="edit-product-image-pick-input"
                        ref={fourthImageInputRef}
                    />
                    <p className="file-name-text">
                        {fourthImagePreview ? "Image Selected" : "No file chosen"}
                    </p>
                </div>
            </div>

            <div className="edit-product-input-section">
                <div className="product-input-container">
                    <label>Product Name * </label>
                    <div>
                        <input type="text" 
                            value={productName}
                            placeholder="Enter product name"
                            onChange={(e) => {
                                if (e.target.value.length <= 50) {
                                    setProductName(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="edit-product-input-container">
                    <label>Product Details * </label>
                    <div>
                        <textarea type="text" 
                            value={productDescription}
                            placeholder="Product description"
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                    setProductDescription(e.target.value);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="edit-product-specs-section">
                    <div className="product-sub-specs">
                        <p>Category</p>
                        <div className="edit-product-select-drop-down" onClick={handleCategoryDropdownClick}>
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
                    <div className="edit-product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="edit-product-select-drop-down" onClick={handleSubCategoryDropdownClick}>
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
                    <div className="edit-product-sub-specs">
                        <p>Size</p>
                        <div className="edit-product-select-drop-down" onClick={handleSizeDropdownClick}>
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
                                            className="edit-product-timer-checkbox"
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
                    <div className="edit-product-sub-specs">
                        <p>Brand</p>
                        <div className="edit-product-sub-input-container">
                            <input type="text" 
                                value={productBrand}
                                className="edit-product-sub-input"
                                onChange={(e) => setProductBrand(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Price</p>
                        <div className="edit-product-sub-input-container">
                            <input type="number" 
                                value={productPrice}
                                className="edit-product-sub-input" 
                                onChange={(e) => setProductPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Offer price</p>
                        <div className="edit-product-sub-input-container">
                            <input type="text" 
                                value={productOfferPrice}
                                className="edit-product-sub-input"
                                onChange={(e) => setProductOfferPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Quantity</p>
                        <div className="edit-product-sub-input-container">
                            <input type="text" 
                                value={productQuantity}
                                className="edit-product-sub-input"
                                onChange={(e) => setProductQuantity(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Color</p>
                        <div className="edit-product-select-drop-down" onClick={handleColorDropdownClick}>
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
                                            className="edit-product-timer-checkbox"
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
                <div className="edit-product-timer-container">
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
                        className="edit-product-timer-checkbox"/></p>
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
                <div className="edit-product-button-container">
                   <button 
                        className="edit-product-save-button"
                        onClick={handleEditProduct}
                        >
                            Submit changes
                        </button>
                   <button 
                       className="edit-product-cancel-button"
                       >
                            Cancel
                    </button>
                </div>

            </div>






        </div>
    )
}

export default EditProductPage;