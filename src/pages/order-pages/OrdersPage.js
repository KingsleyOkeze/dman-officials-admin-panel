import { useState } from "react";
import "../../styles/pages-styles/order-pages-styles/OrdersPage.css"
import { TfiReload } from "react-icons/tfi";
import { TiArrowSortedDown } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function OrdersPage () {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([
        {
            billingName: "John Doe",
            orderAccount: "JD12345",
            payment: "$250.00",
            status: "Completed",
            date: "2024-10-01",
            id: 1
        },
        {
            billingName: "Jane Smith",
            orderAccount: "JS56789",
            payment: "$150.00",
            status: "Pending",
            date: "2024-10-03",
            id: 2
        },
        {
            billingName: "Michael Johnson",
            orderAccount: "MJ98765",
            payment: "$300.00",
            status: "Failed",
            date: "2024-10-05",
            id: 3
        },
        {
            billingName: "Emily Davis",
            orderAccount: "ED11223",
            payment: "$75.00",
            status: "Shipped",
            date: "2024-10-07",
            id: 4
        },
        {
            billingName: "Daniel Wilson",
            orderAccount: "DW33445",
            payment: "$500.00",
            status: "Processing",
            date: "2024-10-10",
            id: 5
        },
        {
            billingName: "Sarah Brown",
            orderAccount: "SB44556",
            payment: "$120.00",
            status: "Completed",
            date: "2024-10-15",
            id: 6
        },
        {
            billingName: "David Lee",
            orderAccount: "DL22334",
            payment: "$225.00",
            status: "Pending",
            date: "2024-10-18",
            id: 7
        },
        {
            billingName: "Emma Martinez",
            orderAccount: "EM99887",
            payment: "$320.00",
            status: "Completed",
            date: "2024-10-20",
            id: 8
        },
        {
            billingName: "Chris Green",
            orderAccount: "CG77654",
            payment: "$180.00",
            status: "Failed",
            date: "2024-10-25",
            id: 9
        },
        {
            billingName: "Olivia Harris",
            orderAccount: "OH55433",
            payment: "$400.00",
            status: "Shipped",
            date: "2024-10-28",
            id: 10
        }
    ]);  
    const [color, setColor] = useState(['#007AFF', '#008C00', '#FFA500', '#B80000', '#A020F0']);

    return(
        <div className="order-page-container">
            <div className="order-page-header">
                <h3>Orders</h3>
                <div className="order-page-filter-and-refresh-container">
                    <div className="drop-down-filter">
                        <small className="drop-down-filter-small-border-text">filter order by status</small>
                       
                        <p>All Orders</p>
                        <TiArrowSortedDown className="drop-down-icon"/>
                    </div>
               
                    <TfiReload  className="order-refresh-icon"/>
                </div>
            </div>

            <div className="orders-page-table-container">
                <p>ALL ORDER</p>
                <table className="orders-page-table">
                    <thead className="orders-page-table-head">
                        <tr>
                            <th>Billing Name</th>
                            <th>Order Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="orders-page-table-body">
                        {
                            orders.map((order, index) => (
                                <tr onClick={() => navigate("/order-details-page")}>
                                    <td style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{
                                        background: color[Math.floor(Math.random() * color.length)]
                                        }}
                                        className="orders-page-table-index">{orders.findIndex(i => i.id === order.id)}</span> 
                                        {order.billingName}
                                        </td>
                                    <td>{order.orderAccount}</td>
                                    <td>{order.payment}</td>
                                    <td>{order.status}</td>
                                    <td>{order.date}</td>
                                    <td><FiEdit /></td>
                                    <td><FaRegTrashCan className="order-delete-icon"/></td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>



            </div>
        </div>
    )
}


export default OrdersPage;