import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import "../styles/dashboard-style/Dashboard.css";
import { useEffect, useState } from "react";

function Dashboard () {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isSubHeaderOpen, setIsSubHeaderOpen] = useState(true);
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            setIsSubHeaderOpen(width >= 786); // Automatically open for large screens
        };

        handleResize(); // Ensure it runs on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const toggleSubHeader = () => {
        setIsSubHeaderOpen(!isSubHeaderOpen);
    };

    return(
        <div className="dashboard-container">
            <div style={{ position: "relative", width: "100%"  }}>
                <Header toggleSubHeader={toggleSubHeader} />
                <SubHeader isOpen={isSubHeaderOpen} />
            </div>
            <div className="dashboard-main-content">
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard;