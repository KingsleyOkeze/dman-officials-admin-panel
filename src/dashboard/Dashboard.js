import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import "../styles/dashboard-style/Dashboard.css";

function Dashboard () {
    return(
        <div className="dashboard-container">
            <Header />
            <SubHeader />
            <div className="dashboard-main-content">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;