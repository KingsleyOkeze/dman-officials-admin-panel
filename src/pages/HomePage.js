import { FaSearch } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { FiPackage } from "react-icons/fi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { RiTruckLine } from "react-icons/ri";
import "../styles/pages-styles/HomePage.css";
import img1 from "../images/img1.jpg"
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DeleteConfirmationModal from "../components/ConfirmationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";


// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


function HomePage () {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        {
            img: img1,
            id: 1,
            productName: 'Apple iPhone 13',
            category: 'Electronics',
            subCategory: 'Smartphones',
            price: '$999.99',
          },
          {
            img: img1,
            id: 2,
            productName: 'Samsung 4K Smart TV',
            category: 'Electronics',
            subCategory: '4K TVs',
            price: '$1,299.99',
          },
          {
            img: img1,
            id: 3,
            productName: 'Nike Air Max 270',
            category: 'Fashion',
            subCategory: 'Sneakers',
            price: '$149.99',
          },
          {
            img: img1,
            id: 4,
            productName: 'Sony PlayStation 5',
            category: 'Gaming',
            subCategory: 'Consoles',
            price: '$499.99',
          },
          {
            img: img1,
            id: 5,
            productName: 'Canon EOS Rebel T8i',
            category: 'Electronics',
            subCategory: 'DSLR Cameras',
            price: '$749.99',
          },
          {
            img: img1,
            id: 6,
            productName: 'Apple MacBook Air',
            category: 'Electronics',
            subCategory: 'Laptops',
            price: '$999.99',
          },
          {
            img: img1,
            id: 7,
            productName: 'Samsung Galaxy Watch',
            category: 'Electronics',
            subCategory: 'Smartwatches',
            price: '$299.99',
          },
        //   {
        //     img: img1,
        //     id: 8,
        //     productName: 'Nike Air Jordan 1',
        //     category: 'Fashion',
        //     subCategory: 'Sneakers',
        //     price: '$199.99',
        //   },
        //   {
        //     img: img1,
        //     id: 9,
        //     productName: 'Sony WH-1000XM4 Headphones',
        //     category: 'Electronics',
        //     subCategory: 'Headphones',
        //     price: '$349.99',
        //   },
        //   {
        //     img: img1,
        //     id: 10,
        //     productName: 'Canon PIXMA TS202 Printer',
        //     category: 'Electronics',
        //     subCategory: 'Printers',
        //     price: '$49.99',
        //   },
      ]);

      // Delete Modal
      const [isModalOpen, setModalOpen] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState(null);





      // Data for the chart
      const data = {
        labels: ["Purple", "Orange", "Black", "Red", "Blue", "Green"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "#A020F0", // Purple
              "#FFA500", // Orange
              "#000000", // Black
              "#B80000", // Red
              "#007AFF", // Blue
              "#008C00", // Green
            ],
            borderColor: [
              "#A020F0", // Purple
              "#FFA500", // Orange
              "#000000", // Black
              "#B80000", // Red
              "#007AFF", // Blue
              "#008C00", // Green
            ],
            borderWidth: 1,
          },
        ],
      };
      

    // Options for customization
    const options = {
        responsive: true,
            plugins: {
                legend: {
                display: false, // Hide the legend
            },
        },
    };

    const firstBoxProgress = 50;
    const secondBoxProgress = 70;
    const thirdBoxProgress = 60;
    const fourthBoxProgress = 90;

    const firstBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#007aff", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${firstBoxProgress}%`, // Dynamic width based on progress prop
        },
    }
    const secondsBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#B80000", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${secondBoxProgress}%`, // Dynamic width based on progress prop
       },
    }
    const thirdBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#FFA500", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${thirdBoxProgress}%`, // Dynamic width based on progress prop
        },
    }
    const fourthBoxStyles = {
        bar: {
            height: "5px", 
            backgroundColor: "#008C00", // Color of the progress
            transition: "width 0.3s ease", // Smooth transition for the progress
            width: `${fourthBoxProgress}%`, // Dynamic width based on progress prop
        },
    }



    
    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
      };
    
      const handleConfirmDelete = () => {
        // Perform delete operation here
        console.log(`Deleted product: ${selectedProduct.productName}`);
        setModalOpen(false);
        setSelectedProduct(null);
      };
    
      const handleCancelDelete = () => {
        setModalOpen(false);
        setSelectedProduct(null);
      };


    return(
        <div className="home-page-container">
            <div className="home-page-search-and-header-container">
            <div className="home-page-main-search-container">
                <input type="text" className="home-page-main-search-input"/>
                <div className="home-page-main-search-input-icon">
                    <FaSearch/>
                </div>
            </div>
            <div className="home-page-main-header-container">
                <p className="home-page-main-header-my-product-text">My Products</p>
                <div className="home-page-main-header-add-new-text-and-icon-container"
                    onClick={() => navigate("/admin/edit-product-page") }>
                    <GrAddCircle className="home-page-main-header-add-new-icon"/>
                    <p className="home-page-main-header-add-new-text">Add New</p>
                </div>
            </div>
            </div>
            <div className="home-page-main-content-container">
                <div className="home-page-overview-boxes-container">
                    <div className="home-page-overview-first-box">
                        <div className="home-page-overview-box-head">
                            <span className="home-page-overview-first-box-package-icon-span">
                                <FiPackage className="home-page-overview-first-box-package-icon"/>
                            </span>
                            <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                        </div>
                        <p className="home-page-overview-first-box-title">All Products</p>
                        <div className="home-page-overview-first-box-progress-bar-container">
                            <div style={firstBoxStyles.bar}></div>
                        </div>
                        <p className="home-page-overview-first-box-number">20 Products</p>
                    </div>
                    <div className="home-page-overview-second-box">
                        <div className="home-page-overview-box-head">
                            <span className="home-page-overview-second-box-package-icon-span">
                                <FiPackage className="home-page-overview-second-box-package-icon"/>
                            </span>
                            <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                        </div>
                        <p className="home-page-overview-second-box-title">All Products</p>
                        <div className="home-page-overview-second-box-progress-bar-container">
                            <div style={secondsBoxStyles.bar}></div>
                        </div>
                        <p className="home-page-overview-second-box-number">20 Products</p>
                    </div>
                    <div className="home-page-overview-third-box">
                        <div className="home-page-overview-box-head">
                            <span className="home-page-overview-third-box-package-icon-span">
                                <FiPackage className="home-page-overview-third-box-package-icon"/>
                            </span>
                            <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                        </div>
                        <p className="home-page-overview-third-box-title">All Products</p>
                        <div className="home-page-overview-third-box-progress-bar-container">
                            <div style={thirdBoxStyles.bar}></div>
                        </div>
                        <p className="home-page-overview-third-box-number">20 Products</p>
                    </div>
                    <div className="home-page-overview-fourth-box">
                        <div className="home-page-overview-box-head">
                            <span className="home-page-overview-fourth-box-package-icon-span">
                                <FiPackage className="home-page-overview-fourth-box-package-icon"/>
                            </span>
                            <PiDotsThreeVertical className="home-page-overview-box-menu-icon"/>
                        </div>
                        <p className="home-page-overview-fourth-box-title">All Products</p>
                        <div className="home-page-overview-fourth-box-progress-bar-container">
                            <div style={fourthBoxStyles.bar}></div>
                        </div>
                        <p className="home-page-overview-fourth-box-number">20 Products</p>
                    </div>
                </div>
                <div className="home-page-order-details-section">
                    <p className="home-page-order-details-section-head">ORDER DETAILS</p>
                    <div className="home-page-order-details-section-doughnut-container">
                       <Doughnut data={data} options={options}/>
                    </div>
                    <div className="home-page-page-order-all-statuses-container">
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-first-list-logo-container">
                            <RiTruckLine className="home-page-order-status-first-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-second-list-logo-container">
                            <RiTruckLine className="home-page-order-status-second-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-third-list-logo-container">
                            <RiTruckLine className="home-page-order-status-third-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-fourth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-fourth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-fifth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-fifth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    <div className="home-page-order-status-container">
                        <div className="home-page-order-status-sixth-list-logo-container">
                            <RiTruckLine className="home-page-order-status-sixth-list-logo"/>
                        </div>
                        <div className="home-page-order-status-description-container">
                            <p>All Orders</p>
                            <p>4 Done</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="home-page-table-container">
                   <p>ALL PRODUCT</p>
                   <table className="home-page-table">
                       <thead className="home-page-table-head">
                           <tr>
                               <th>Product Name</th>
                                <th>Categories</th>
                                <th>Sub Categories</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="home-page-table-body">
                            {
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="home-page-img-and-product-name-container">
                                            <div>
                                                <img src={product.img} className="home-page-table-img"/>
                                            </div> 
                                            <div
                                                className="home-page-table-product-name">
                                                {product.productName}
                                            </div>
                                        </td>  
                                        <td>{product.category}</td>
                                        <td>{product.subCategory}</td>
                                        <td>{product.price}</td>
                                        <td><FiEdit 
                                                className="home-page-table-edit-icon"
                                                onClick= { () => navigate("/admin/edit-product-page") }/></td>
                                        <td>
                                            <FaRegTrashCan 
                                                className="home-page-delete-icon"
                                                onClick={() => handleDeleteClick(product)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }     
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${selectedProduct?.productName}"?`}
      />

        </div>
    )
}

export default HomePage;