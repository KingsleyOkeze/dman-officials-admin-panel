import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import "../styles/dashboard-style/Dashboard.css";
import { useEffect, useState } from "react";
import { SubHeaderProvider } from "../contexts/SubHeaderContext";
import { ModalProvider } from "../contexts/ModalContext";
import { SearchProvider } from "../contexts/SearchContext";
import Overlay from "./Overlay";

function Dashboard () {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setScreenWidth(width);
            // setIsSubHeaderOpen(width >= 786); // Automatically open for large screens
        };

        handleResize(); // Ensure it runs on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    

    return(
        <ModalProvider>
           <SubHeaderProvider>
                <Overlay />
                <div className="dashboard-container">
                    <div style={{ position: "relative", width: "100%"  }}>
                        <Header/>
                        <SubHeader/>
                    </div>
                    <div className="dashboard-main-content">
                        <Outlet/>
                    </div>
                </div>
            </SubHeaderProvider>
        </ModalProvider>
    )
}

export default Dashboard;