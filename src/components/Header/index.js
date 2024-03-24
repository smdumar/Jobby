import {withRouter, Link} from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { HiBriefcase } from "react-icons/hi"
import { MdLogout } from "react-icons/md"
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {

    const logout = () => {
        Cookies.remove('jwtToken')
        const {history} = props
        history.replace('/login')
    }

    return(
    <div className="headerContainer">

        <div className="headerAppLogo-container">
            <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' className="header-appLogo"/>
        </div>

        <div className="headerIcon-container">
            <Link to='/'><IoHome className="headerIcon"/></Link>
            <Link to='/jobPage'><HiBriefcase className="headerIcon"/></Link>
            <MdLogout className="headerIcon" role="button" onClick={logout}/>
        </div>

        <div className="header-navLinksContainer">
        <Link to='/'><h3 className="navLinks">Home</h3></Link>
        <Link to='/jobPage'><h3 className="navLinks">jobs</h3></Link>
            <button type="button" className="logoutBtn" onClick={logout}>Logout</button>
        </div>

    </div>
    )
}
export default withRouter(Header)