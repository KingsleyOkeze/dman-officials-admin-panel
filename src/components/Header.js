import logo from '../images/dman-logo.png'
import { LuUser2 } from "react-icons/lu";
import { RiMenu5Fill } from "react-icons/ri";
import '../styles/components-styles/Header.css';
import React, { useState, useEffect, useContext } from 'react';
import { SubHeaderContext } from '../contexts/SubHeaderContext';

function Header () {
    const { isSubHeaderOpen, setIsSubHeaderOpen, toggleSubHeader } = useContext(SubHeaderContext);
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
        <div className="header-container">
            <img src={logo} width={35} height={35}/>
            <div>
                <p>Admin Panel</p>
            </div>
            <div>
            {
                screenWidth > 986 ? (
                    <div className="header-account-div">
                        <LuUser2 />
                        <p>Account</p>
                    </div>
                    ) : (
                    <RiMenu5Fill 
                        className="header-icon" 
                        onClick={toggleSubHeader}
                    />
                )
            }
            </div>
            
        </div>
    )
}

export default Header;