import "../../styles/pages-styles/product-pages-styles/AddProductPage.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState, useRef, useContext} from "react";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";


function AddProductPage() {
    const { accessToken } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const [loading, setLoading] = useState(false);

    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);
    const [fourthImagePreview, setFourthImagePreview] = useState(null);

    const [productImages, setProductImages] = useState({
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        fourthImage: null,
    });
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('Select Category');
    const [productSubCategory, setProductSubCategory] = useState('Sub Category');
    const [productSize, setProductSize] = useState(['Selected Size']);
    const [productPrice, setProductPrice] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productOfferPrice, setProductOfferPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productColor, setProductColor] = useState(['Select Color']);
    const [productAddedTimer, setProductAddedTimer] = useState({ hrs: 0, min: 0, sec: 0 });
    const [addTimer, setAddTimer] = useState(false);

    const firstImageInputRef = useRef(null);
    const secondImageInputRef = useRef(null);
    const thirdImageInputRef = useRef(null);
    const fourthImageInputRef = useRef(null);

    const handleImageChange = (key, event, setPreview) => {
        const file = event.target.files[0];
        if (file) {
            setProductImages((prev) => ({ ...prev, [key]: file }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = (key, setPreview, inputRef) => {
        setProductImages((prev) => ({ ...prev, [key]: null }));
        setPreview(null);
        inputRef.current.value = null;
    };

    const [categoryDropDownListIsOpen, setCategoryDropDownListIsOpen] = useState(false);
    const [subCategoryDropDownListIsOpen, setSubCategoryDropDownListIsOpen] = useState(false);
    const [sizeDropDownListIsOpen, setSizeDropDownListIsOpen] = useState(false);
    const [colorDropDownListIsOpen, setColorDropDownListIsOpen] = useState(false);

    const categories = ['Mens Wear', 'Foot Wear', 'Accessories'];
    const subCategories = ['T Shirt', 'Hoodie', 'Sweat Shirt', 'Bullup 500'];
    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = ['Black', 'White'];

    const handleCategoryDropdownClick = () => {
        setCategoryDropDownListIsOpen(!categoryDropDownListIsOpen);
    };

    const handleCategoryClick = (category) => {
        setProductCategory(category);
        setCategoryDropDownListIsOpen(false);
    };

    const handleSubCategoryDropdownClick = () => {
        setSubCategoryDropDownListIsOpen(!subCategoryDropDownListIsOpen);
    };

    const handleSubCategoryClick = (subCategory) => {
        setProductSubCategory(subCategory);
        setSubCategoryDropDownListIsOpen(false);
    };

    const handleSizeDropdownClick = () => {
        setSizeDropDownListIsOpen(!sizeDropDownListIsOpen);
    };

    const handleColorDropdownClick = () => {
        setColorDropDownListIsOpen(!colorDropDownListIsOpen);
    };

    const handleShowMultiDropdownSelection = (items) => {
        if (items.length > 1) {
            const filtered = items.filter((item) => item !== 'Selected Size' && item !== 'Select Color');
            return filtered.join(', ');
        }
        return items[0];
    };

    const handleAddProduct = async () => {
        // Client-side validation
        const actualProductCategory = productCategory === 'Select Category' ? '' : productCategory.replace(/\s+/g, '');
        const actualProductSubCategory = productSubCategory === 'Sub Category' ? '' : productSubCategory.replace(/\s+/g, '');
        const actualProductSizeArr = productSize.filter((i) => i !== 'Selected Size');
        const actualProductColorArr = productColor.filter((i) => i !== 'Select Color');

        if (!productName) {
            showAlert('Error', 'Product name is required.');
            return;
        }
        if (!productDescription) {
            showAlert('Error', 'Product description is required.');
            return;
        }
        if (!actualProductCategory) {
            showAlert('Error', 'Please select a valid category.');
            return;
        }
        if (!actualProductSubCategory) {
            showAlert('Error', 'Please select a valid sub-category.');
            return;
        }
        if (actualProductSizeArr.length === 0) {
            showAlert('Error', 'Please select at least one size.');
            return;
        }
        if (actualProductColorArr.length === 0) {
            showAlert('Error', 'Please select at least one color.');
            return;
        }
        if (!productBrand) {
            showAlert('Error', 'Product brand is required.');
            return;
        }
        if (!productPrice) {
            showAlert('Error', 'Product price is required.');
            return;
        }
        if (!productOfferPrice) {
            showAlert('Error', 'Product offer price is required.');
            return;
        }
        if (!productQuantity) {
            showAlert('Error', 'Product quantity is required.');
            return;
        }
        if (!Object.values(productImages).some((img) => img)) {
            showAlert('Error', 'At least one image is required.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        Object.values(productImages).forEach((image) => {
            if (image) formData.append('images', image);
        });

        actualProductSizeArr.forEach((size) => {
            formData.append('productSize[]', size);
        });

        actualProductColorArr.forEach((color) => {
            formData.append('productColor[]', color);
        });

        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productCategory', actualProductCategory);
        formData.append('productSubCategory', actualProductSubCategory);
        formData.append('productBrand', productBrand);
        formData.append('productPrice', productPrice);
        formData.append('productOfferPrice', productOfferPrice);
        formData.append('productQuantity', productQuantity);
        formData.append('productAddedTimer', JSON.stringify(productAddedTimer));

        try {
            const response = await axios.post('/admin/add-product', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                showAlert('success', response.data.message);
                // Reset form after successful submission
                setProductName('');
                setProductDescription('');
                setProductCategory('Select Category');
                setProductSubCategory('Sub Category');
                setProductSize(['Selected Size']);
                setProductColor(['Select Color']);
                setProductBrand('');
                setProductPrice('');
                setProductOfferPrice('');
                setProductQuantity('');
                setProductAddedTimer({ hrs: 0, min: 0, sec: 0 });
                setAddTimer(false);
                setProductImages({ firstImage: null, secondImage: null, thirdImage: null, fourthImage: null });
                setFirstImagePreview(null);
                setSecondImagePreview(null);
                setThirdImagePreview(null);
                setFourthImagePreview(null);
                firstImageInputRef.current.value = null;
                secondImageInputRef.current.value = null;
                thirdImageInputRef.current.value = null;
                fourthImageInputRef.current.value = null;
            }
        } catch (err) {
            if (err.response) {
                const { status, data } = err.response;
                if ([400, 403, 404, 500].includes(status)) {
                    showAlert(status, data.error || 'An error occurred.');
                }
            } else {
                showAlert('Error', 'An unknown error occurred!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product-page-container">
            <h3 className="add-product-page-head-h3">Add Product</h3>
            <p className="add-product-page-sub-head">Creating new Product</p>
            <div className="add-product-images-container">
                {[
                    { key: 'firstImage', preview: firstImagePreview, setPreview: setFirstImagePreview, ref: firstImageInputRef, id: 'file-input-1' },
                    { key: 'secondImage', preview: secondImagePreview, setPreview: setSecondImagePreview, ref: secondImageInputRef, id: 'file-input-2' },
                    { key: 'thirdImage', preview: thirdImagePreview, setPreview: setThirdImagePreview, ref: thirdImageInputRef, id: 'file-input-3' },
                    { key: 'fourthImage', preview: fourthImagePreview, setPreview: setFourthImagePreview, ref: fourthImageInputRef, id: 'file-input-4' },
                ].map(({ key, preview, setPreview, ref, id }) => (
                    <div className="add-product-image-div" key={key}>
                        {preview && (
                            <LiaTimesSolid className="add-product-img-remove-image-icon" onClick={() => clearImage(key, setPreview, ref)} />
                        )}
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                onClick={() => {
                                    const newTab = window.open(preview, '_blank');
                                    newTab.focus();
                                }}
                            />
                        ) : (
                            <CiImageOn className="add-product-image-icon" />
                        )}
                        <label htmlFor={id} className="custom-file-label">
                            Pick Image
                        </label>
                        <input
                            type="file"
                            id={id}
                            accept="image/*"
                            onChange={(e) => handleImageChange(key, e, setPreview)}
                            className="add-product-image-pick-input"
                            ref={ref}
                        />
                        <p className="file-name-text">{preview ? 'Image Selected' : 'No file chosen'}</p>
                    </div>
                ))}
            </div>

            <div className="add-product-input-section">
                <div className="add-product-input-container">
                    <label>Product Name * </label>
                    <div>
                        <input
                            type="text"
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
                        <textarea
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
                            {categoryDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {categoryDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {categories.map((category) => (
                                    <li key={category} onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="add-product-select-drop-down" onClick={handleSubCategoryDropdownClick}>
                            <p>{productSubCategory}</p>
                            {subCategoryDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {subCategoryDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {subCategories.map((subCategory) => (
                                    <li key={subCategory} onClick={() => handleSubCategoryClick(subCategory)}>
                                        {subCategory}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Size</p>
                        <div className="add-product-select-drop-down" onClick={handleSizeDropdownClick}>
                            <p>{handleShowMultiDropdownSelection(productSize)}</p>
                            {sizeDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {sizeDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {sizes.map((size) => (
                                    <li key={size}>
                                        <input
                                            type="checkbox"
                                            className="add-product-timer-checkbox"
                                            value={size}
                                            checked={productSize.includes(size)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setProductSize((prevSizes) =>
                                                    prevSizes.includes(value)
                                                        ? prevSizes.filter((s) => s !== value)
                                                        : [...prevSizes, value]
                                                );
                                            }}
                                        />
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Brand</p>
                        <div className="add-product-sub-input-container">
                            <input
                                type="text"
                                className="add-product-sub-input"
                                value={productBrand}
                                onChange={(e) => setProductBrand(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Price</p>
                        <div className="add-product-sub-input-container">
                            <input
                                type="number"
                                className="add-product-sub-input"
                                value={productPrice}
                                min="0"
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = '';
                                        return;
                                    }
                                    setProductPrice(value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Offer price</p>
                        <div className="add-product-sub-input-container">
                            <input
                                type="number"
                                className="add-product-sub-input"
                                value={productOfferPrice}
                                min="0"
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = '';
                                        return;
                                    }
                                    setProductOfferPrice(value);
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
                                value={productQuantity}
                                min="0"
                                onKeyDown={(e) => {
                                    if (e.key === '-') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (Number(value) < 0) {
                                        e.target.value = '';
                                        return;
                                    }
                                    setProductQuantity(value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="add-product-sub-specs">
                        <p>Color</p>
                        <div className="add-product-select-drop-down" onClick={handleColorDropdownClick}>
                            <p>{handleShowMultiDropdownSelection(productColor)}</p>
                            {colorDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {colorDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {colors.map((color) => (
                                    <li key={color}>
                                        <input
                                            type="checkbox"
                                            className="add-product-timer-checkbox"
                                            value={color}
                                            checked={productColor.includes(color)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setProductColor((prevColors) =>
                                                    prevColors.includes(value)
                                                        ? prevColors.filter((c) => c !== value)
                                                        : [...prevColors, value]
                                                );
                                            }}
                                        />
                                        <span>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="add-product-timer-container">
                    <p>
                        Timer
                        <input
                            type="checkbox"
                            checked={addTimer}
                            onChange={() => {
                                const newAddTimer = !addTimer;
                                setAddTimer(newAddTimer);
                                if (!newAddTimer) {
                                    setProductAddedTimer({ hrs: 0, min: 0, sec: 0 });
                                }
                            }}
                            className="add-product-timer-checkbox"
                        />
                    </p>
                    <div className="all-time-container">
                        {['hrs', 'min', 'sec'].map((unit, index) => (
                            <div key={unit}>
                                <p>
                                    <span>
                                        <input
                                            type="number"
                                            placeholder={index === 0 ? '12' : '00'}
                                            min="0"
                                            max={index === 0 ? '99' : '59'}
                                            disabled={!addTimer}
                                            value={productAddedTimer[unit]}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                if (inputValue.length <= 2 || inputValue === '') {
                                                    const numericValue = inputValue === '' ? 0 : parseInt(inputValue);
                                                    if (!isNaN(numericValue) && numericValue <= (index === 0 ? 99 : 59)) {
                                                        setProductAddedTimer({ ...productAddedTimer, [unit]: numericValue });
                                                    }
                                                }
                                            }}
                                            style={{ background: !addTimer ? 'lightgrey' : '#F5F3F5' }}
                                        />
                                    </span>
                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className={`add-product-create-button ${loading ? 'loading' : ''}`}
                    onClick={handleAddProduct}
                    disabled={loading}
                >
                    {loading ? <div className="add-product-spinner"></div> : 'Submit'}
                </button>
            </div>
        </div>
    );
}

export default AddProductPage;