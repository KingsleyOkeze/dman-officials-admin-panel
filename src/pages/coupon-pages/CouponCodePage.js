import { useState } from "react";
import "../../styles/pages-styles/coupon-pages-styles/CouponCodePage.css";
import { FaRegTrashCan } from "react-icons/fa6";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiReload } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function CouponCodePage () {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState([
        {
            couponName: "SUMMER2024",
            status: "Active",
            type: "Percentage",
            amount: 15,
          },
          {
            couponName: "WELCOME10",
            status: "Inactive",
            type: "Fixed",
            amount: 10,
          },
          {
            couponName: "FREESHIP50",
            status: "Active",
            type: "Fixed",
            amount: 50,
          },
          {
            couponName: "BLACKFRIDAY",
            status: "Active",
            type: "Percentage",
            amount: 25,
          },
          {
            couponName: "VIPSALE",
            status: "Expired",
            type: "Fixed",
            amount: 100,
          },
          {
            couponName: "NEWYEAR25",
            status: "Active",
            type: "Percentage",
            amount: 25,
          },
          {
            couponName: "FALLSAVINGS",
            status: "Inactive",
            type: "Fixed",
            amount: 20,
          },
          {
            couponName: "WINTER2024",
            status: "Expired",
            type: "Percentage",
            amount: 30,
          },
          {
            couponName: "SPRINGFLING",
            status: "Active",
            type: "Fixed",
            amount: 40,
          },
          {
            couponName: "CYBERMONDAY",
            status: "Active",
            type: "Percentage",
            amount: 20,
          }
      ]);

    const [color, setColor] = useState(['#007AFF', '#008C00']);
  
      
    return(
        <div className="coupon-code-page-container">
            <div className="coupon-code-page-header">
                <div className="coupon-code-page-header-and-add-new-container">  
                <h3>Coupon Code</h3>
                <ul>
                    <li onClick={() => navigate("/add-coupon-code-page")}><GrAddCircle className="add-coupon-icon"/><span className="coupon-add-new-text">Add New</span></li>
                </ul>
                </div>
                <div className="coupon-code-page-filter-and-refresh-container">
                    <div className="drop-down-filter">
                        <small className="drop-down-filter-small-border-text">filter coupon by type</small>
                       
                        <p>Fixed</p>
                        <TiArrowSortedDown className="drop-down-icon"/>
                    </div>
               
                    <TfiReload  className="coupon-code-refresh-icon"/>
                </div>
            </div>

            <div className="coupon-code-page-table-container">
                <p>All Coupons</p>
                <table className="coupon-code-page-table">
                    <thead className="coupon-code-page-table-head">
                        <tr>
                            <th>Coupon Name</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="coupon-code-page-table-body">
                        {
                            coupons.map((coupon, index) => (
                                <tr key={index}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{
                                        background: color[Math.floor(Math.random() * color.length)]
                                        }}
                                        className="coupon-code-page-table-index">{index + 1}</span> 
                                        {coupon.couponName}
                                    </td>
                                    <td className="coupon-code-page-phone-and-email-container">
                                        {coupon.status}
        
                                    </td>
                                    <td>{coupon.type}</td>
                                    <td>{coupon.amount}</td>
                                    <td><FiEdit
                                            className="coupon-code-edit-icon"
                                            onClick={() => navigate("/admin/edit-coupon-code-page")}/></td>
                                    <td><FaRegTrashCan className="coupon-code-delete-icon"/></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>



            </div>
        </div>
    )
}

export default CouponCodePage;