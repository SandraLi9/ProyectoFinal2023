import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/images/logo.svg';
const Header=()=>{
    return(
        <nav id="navbar" className='navbar navbar-expand-tg navbar-dark bg-dark'>
            <div className='container'>
                <NavLink to="/" className="navbar-brand">  
                    <img className='App-logo' src={logo} alt='logo' width={80} />
                </NavLink>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink to="Articles" className="nav-link">Articulos</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );

};
export default Header;