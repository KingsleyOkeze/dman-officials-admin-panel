import '../styles/components-styles/SubHeader.css';
import { RiHome5Line } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { BiBasket } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
import { useContext } from 'react';
import { SubHeaderContext } from '../contexts/SubHeaderContext';
import { AuthContext } from '../contexts/AuthContext';

function SubHeader () {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);
    const { 
        isSubHeaderOpen, 
        setIsSubHeaderOpen, 
        toggleSubHeader,
        showLargeScreenAccountAndLogoutModal,
        setShowLargeScreenAccountAndLogoutModal
    } = useContext(SubHeaderContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth >= 986) {
            setIsSubHeaderOpen(true); // Automatically open for large screens
        } else {
            // alert('width is', screenWidth)
            setIsSubHeaderOpen(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);


    return(
        <div
            className={`sub-header-container ${
            isSubHeaderOpen ? "active" : ""
            }`}
        >
            <ul>
                <li 
                    onClick={() => {
                        navigate("/admin/home-page");
                        if (screenWidth < 986) {
                            toggleSubHeader();
                        }
                    }}
                >
                    <RiHome5Line className="sub-header-icon"/>Dashboard
                </li>
                <li 
                    onClick={() => {
                        navigate("/admin/product-page");
                        if (screenWidth < 986) {
                            toggleSubHeader();
                        }
                    }}
                >
                    <FiPackage className="sub-header-icon"/>Products
                </li>
                <li 
                    onClick={() => {
                        navigate("/admin/order-page");
                        if (screenWidth < 986) {
                            toggleSubHeader();
                        }
                    }}
                >
                    <BiBasket className="sub-header-icon"/>Orders
                </li>
                <li 
                    onClick={() => {
                        navigate("/admin/customers-page");
                        if (screenWidth < 986) {
                            toggleSubHeader();
                        }
                    }}
                >
                    <GrGroup className="sub-header-icon"/>Customers
                </li>
                <li 
                    onClick={() => {
                        navigate("/admin/coupon-code-page");
                        if (screenWidth < 986) {
                            toggleSubHeader();
                        }
                    }}
                >
                    <TbRosetteDiscountCheck className="sub-header-icon"/>Coupons
                </li>
                {
                    screenWidth < 986 ? (
                        <>
                            <li 
                                onClick={() => {
                                    navigate("/admin/admin-account-page");
                                    if (screenWidth < 986) {
                                        toggleSubHeader();
                                    }
                                }}
                            >
                                <LuUser2 className="sub-header-icon"/>Account
                            </li>
                            <li 
                                onClick={handleLogout}
                            >
                                <RiLogoutCircleRLine className="sub-header-icon"/>Logout
                            </li>
                        </>
                    )
                    : 
                    screenWidth > 986 && showLargeScreenAccountAndLogoutModal ?
                    (
                        <div className="sub-header-large-screen-account-and-logout-modal">
                            <p
                                onClick={() => {
                                    navigate("/admin/admin-account-page");
                                    setShowLargeScreenAccountAndLogoutModal(false);
                                }}
                            >
                                <LuUser2 className="sub-header-large-screen-account-icon"/>Account
                            </p>
                            <p
                                onClick={() => {
                                    setShowLargeScreenAccountAndLogoutModal(false);
                                    handleLogout()
                                }}
                            >
                                <RiLogoutCircleRLine className="sub-header-large-screen-logout-icon"/>Logout
                            </p>
                        </div>
                    )
                    : 
                    (<></>)
                }
            </ul>
        </div>
    )
}

export default SubHeader;