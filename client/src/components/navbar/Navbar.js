import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import gov_bc_logo from '../images/gov_bc_logo.svg';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: 'fff' }}>
            <header>
                <div className="navbar-nb">
                    <Link to="#" className="menu-bars-nb">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    
                    <div>
                        <h1 className="header-title-nb">Welcome to Regional Master Tracker</h1>
                        <h1 className="mobile-header-title-nb">Master Tracker</h1>     
                    </div>
                    <div className="logo-nb" role="banner">
                        <div>
                            <img src={gov_bc_logo} alt="Government of B.C." title="Government of B.C." />
                        </div>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle-nb">
                            <Link to="#" className="menu-bars-nb">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </header>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
