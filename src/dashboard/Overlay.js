import { useContext, useEffect, useState } from "react";
import "../styles/dashboard-style/Overlay.css";
import { SubHeaderContext } from "../contexts/SubHeaderContext";

function Overlay () {
    const { 
        isSubHeaderOpen,
        setIsSubHeaderOpen,
        showLargeScreenAccountAndLogoutModal,
        setShowLargeScreenAccountAndLogoutModal
    } = useContext(SubHeaderContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
                setScreenWidth(window.innerWidth);
        };
      
        window.addEventListener('resize', handleResize);
      
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return(
        <div 
            id="dashboard-overlay" 
            style={{
                display: 
                    screenWidth < 986 && isSubHeaderOpen === true || 
                    screenWidth > 986 && showLargeScreenAccountAndLogoutModal === true ? 'block' : 'none'
            }}
            onClick={() => {
                if (screenWidth < 986) { 
                    setIsSubHeaderOpen(false);
                }
                setShowLargeScreenAccountAndLogoutModal(false)
            }}>
        </div>
    )
}

export default Overlay;