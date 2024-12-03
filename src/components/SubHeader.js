import '../styles/components-styles/SubHeader.css';
import { RiHome5Line } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { BiBasket } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SubHeader ({ isOpen }) {
    const navigate = useNavigate();

    return(
        <div className={`sub-header-container ${isOpen ? "active" : ""} ${window.innerWidth >= 786 ? "always-visible" : ""}`}> 
            <ul>
                <li onClick={() => navigate("/admin/home-page")}><RiHome5Line className="sub-header-icon"/>Dashboard</li>
                <li onClick={() => navigate("/admin/product-page")}><FiPackage className="sub-header-icon"/>Products</li>
                <li onClick={() => navigate("/admin/order-page")}><BiBasket className="sub-header-icon"/>Orders</li>
                <li onClick={() => navigate("/admin/customers-page")}><GrGroup className="sub-header-icon"/>Customers</li>
                <li onClick={() => navigate("/admin/coupon-code-page")}><TbRosetteDiscountCheck className="sub-header-icon"/>Coupons</li>
            </ul>
        </div>
    )
}

export default SubHeader;