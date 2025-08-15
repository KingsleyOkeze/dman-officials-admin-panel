import "../../styles/pages-styles/product-pages-styles/EditProductPage.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiImageOn } from "react-icons/ci";
import { LiaTimesSolid } from "react-icons/lia";
import axios from "axios";
import { TiArrowSortedUp } from "react-icons/ti";
import Alert from "../../components/Alert";
import { useEffect, useState, useRef, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertContext } from "../../contexts/AlertContext";
import urlToFile from "../../utils/urlToFile";


function EditProductPage() {
    const { accessToken } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [firstImagePreview, setFirstImagePreview] = useState(null);
    const [secondImagePreview, setSecondImagePreview] = useState(null);
    const [thirdImagePreview, setThirdImagePreview] = useState(null);
    const [fourthImagePreview, setFourthImagePreview] = useState(null);

    const [productImages, setProductImages] = useState({
        firstImage: '',
        secondImage: '',
        thirdImage: '',
        fourthImage: '',
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
        setProductImages((prev) => ({ ...prev, [key]: '' }));
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
        const filtered = items.filter((item) => item !== 'Selected Size' && item !== 'Select Color');
        return filtered.length > 0 ? filtered.join(', ') : items[0] || 'None';
    };

    const handleEditProduct = async () => {
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
        Object.values(productImages).forEach((image, index) => {
            if (image instanceof File) {
                formData.append('images', image);
            } else if (typeof image === 'string' && image) {
                formData.append(`existingImages[${index}]`, image);
            }
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
            const response = await axios.post(`/admin/edit-product/${productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                showAlert('success', response.data.message);
                // Reset form and navigate back
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
                setProductImages({ firstImage: '', secondImage: '', thirdImage: '', fourthImage: '' });
                setFirstImagePreview(null);
                setSecondImagePreview(null);
                setThirdImagePreview(null);
                setFourthImagePreview(null);
                firstImageInputRef.current.value = null;
                secondImageInputRef.current.value = null;
                thirdImageInputRef.current.value = null;
                fourthImageInputRef.current.value = null;
                navigate('/admin/home-page');
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

    useEffect(() => {
        const handleFetchProductById = async () => {
            try {
                const response = await axios.get(`/admin/fetch-product-by-id/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.status === 200) {
                    const {
                        productImageUrl,
                        productName,
                        productDescription,
                        productCategory,
                        productSubCategory,
                        productSize,
                        productColor,
                        productBrand,
                        productPrice,
                        productOfferPrice,
                        productQuantity,
                        productAddedTimer,
                        addedTimer,
                    } = response.data;

                    setProductImages({
                        firstImage: productImageUrl[0] || '',
                        secondImage: productImageUrl[1] || '',
                        thirdImage: productImageUrl[2] || '',
                        fourthImage: productImageUrl[3] || '',
                    });
                    setFirstImagePreview(productImageUrl[0] || null);
                    setSecondImagePreview(productImageUrl[1] || null);
                    setThirdImagePreview(productImageUrl[2] || null);
                    setFourthImagePreview(productImageUrl[3] || null);
                    setProductName(productName || '');
                    setProductDescription(productDescription || '');
                    setProductCategory(productCategory || 'Select Category');
                    setProductSubCategory(productSubCategory || 'Sub Category');
                    setProductSize(Array.isArray(productSize) && productSize.length > 0 ? productSize : ['Selected Size']);
                    setProductColor(Array.isArray(productColor) && productColor.length > 0 ? productColor : ['Select Color']);
                    setProductBrand(productBrand || '');
                    setProductPrice(productPrice?.toString() || '');
                    setProductOfferPrice(productOfferPrice?.toString() || '');
                    setProductQuantity(productQuantity?.toString() || '');
                    setProductAddedTimer(productAddedTimer || { hrs: 0, min: 0, sec: 0 });
                    setAddTimer(addedTimer || false);
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
            }
        };

        handleFetchProductById();
    }, [productId, accessToken, showAlert]);

    return (
        <div className="edit-product-page-container">
            <h3 className="edit-product-page-head-h3">Edit Product</h3>
            <p className="edit-product-page-sub-head">Updating Product Details</p>
            <div className="edit-product-images-container">
                {[
                    { key: 'firstImage', preview: firstImagePreview, setPreview: setFirstImagePreview, ref: firstImageInputRef, id: 'file-input-1' },
                    { key: 'secondImage', preview: secondImagePreview, setPreview: setSecondImagePreview, ref: secondImageInputRef, id: 'file-input-2' },
                    { key: 'thirdImage', preview: thirdImagePreview, setPreview: setThirdImagePreview, ref: thirdImageInputRef, id: 'file-input-3' },
                    { key: 'fourthImage', preview: fourthImagePreview, setPreview: setFourthImagePreview, ref: fourthImageInputRef, id: 'file-input-4' },
                ].map(({ key, preview, setPreview, ref, id }) => (
                    <div className="edit-product-image-div" key={key}>
                        {preview && (
                            <LiaTimesSolid
                                className="edit-product-img-remove-image-icon"
                                onClick={() => clearImage(key, setPreview, ref)}
                            />
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
                            <CiImageOn className="edit-product-image-icon" />
                        )}
                        <label htmlFor={id} className="custom-file-label">
                            Pick Image
                        </label>
                        <input
                            type="file"
                            id={id}
                            accept="image/*"
                            onChange={(e) => handleImageChange(key, e, setPreview)}
                            className="edit-product-image-pick-input"
                            ref={ref}
                            aria-label={`Upload ${key} image`}
                        />
                        <p className="file-name-text">{preview ? 'Image Selected' : 'No file chosen'}</p>
                    </div>
                ))}
            </div>

            <div className="edit-product-input-section">
                <div className="edit-product-input-container">
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
                            aria-label="Product Name"
                        />
                    </div>
                </div>
                <div className="edit-product-input-container">
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
                            aria-label="Product Description"
                        />
                    </div>
                </div>
                <div className="edit-product-specs-section">
                    <div className="edit-product-sub-specs">
                        <p>Category</p>
                        <div className="edit-product-select-drop-down" onClick={handleCategoryDropdownClick}>
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
                    <div className="edit-product-sub-specs">
                        <p>Sub - Category</p>
                        <div className="edit-product-select-drop-down" onClick={handleSubCategoryDropdownClick}>
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
                    <div className="edit-product-sub-specs">
                        <p>Size</p>
                        <div className="edit-product-select-drop-down" onClick={handleSizeDropdownClick}>
                            <p>{handleShowMultiDropdownSelection(productSize)}</p>
                            {sizeDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {sizeDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {sizes.map((size) => (
                                    <li key={size}>
                                        <input
                                            type="checkbox"
                                            className="edit-product-timer-checkbox"
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
                                            aria-label={`Select size ${size}`}
                                        />
                                        {size}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Brand</p>
                        <div className="edit-product-sub-input-container">
                            <input
                                type="text"
                                className="edit-product-sub-input"
                                value={productBrand}
                                onChange={(e) => setProductBrand(e.target.value)}
                                required
                                aria-label="Product Brand"
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Price</p>
                        <div className="edit-product-sub-input-container">
                            <input
                                type="number"
                                className="edit-product-sub-input"
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
                                aria-label="Product Price"
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Offer price</p>
                        <div className="edit-product-sub-input-container">
                            <input
                                type="number"
                                className="edit-product-sub-input"
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
                                aria-label="Product Offer Price"
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Quantity</p>
                        <div className="edit-product-sub-input-container">
                            <input
                                type="number"
                                className="edit-product-sub-input"
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
                                aria-label="Product Quantity"
                            />
                        </div>
                    </div>
                    <div className="edit-product-sub-specs">
                        <p>Color</p>
                        <div className="edit-product-select-drop-down" onClick={handleColorDropdownClick}>
                            <p>{handleShowMultiDropdownSelection(productColor)}</p>
                            {colorDropDownListIsOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                        </div>
                        {colorDropDownListIsOpen && (
                            <ul className="dropdown-menu">
                                {colors.map((color) => (
                                    <li key={color}>
                                        <input
                                            type="checkbox"
                                            className="edit-product-timer-checkbox"
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
                                            aria-label={`Select color ${color}`}
                                        />
                                        <span>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="edit-product-timer-container">
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
                            className="edit-product-timer-checkbox"
                            aria-label="Enable Timer"
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
                                            aria-label={`Timer ${unit}`}
                                        />
                                    </span>
                                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="edit-product-button-container">
                    <button
                        className={`edit-product-save-button ${loading ? 'loading' : ''}`}
                        onClick={handleEditProduct}
                        disabled={loading}
                    >
                        {loading ? <div className="edit-product-spinner"></div> : 'Submit Changes'}
                    </button>
                    <button
                        className="edit-product-cancel-button"
                        onClick={() => navigate('/admin/home-page')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProductPage;