import logo from '../images/dman-logo.png'
import { LuUser2 } from "react-icons/lu";
import '../styles/components-styles/Header.css'
function Header () {

    return(
        <div className="header-container">
            <img src={logo} width={50} height={50}/>
            <div>
                <p>Admin Panel</p>
            </div>
            <div className="header-account-div">
                <LuUser2 />
                <p>Account</p>
            </div>
        </div>
    )
}

export default Header;