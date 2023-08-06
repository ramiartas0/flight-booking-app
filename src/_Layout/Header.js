import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../img/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for animation.png"
const Header = () => {
    return (
        <header>
            <nav>
                <div className="logo">
                <Link to="/"><img src={Logo} width={'150px'}/></Link>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Ana Sayfa</Link></li>
                    <li><a href="#">Bilet Al</a></li>
                    <li><a href="#">Hakkımızda</a></li>
                    <li><a href="#">İletişim</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
