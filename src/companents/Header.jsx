import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { IconButton } from '@mui/material';
import { CiSearch } from "react-icons/ci";

import '../css/header.css';



function Header() {
    return (
        <header>
            <div className="header-left">
                <Link to="/" className='link'><p className="header-brand">Empi's Books<br /><span>"Kitap kokulu dünyanız"</span></p></Link>
            </div>
            <div className="header-middle">
                <div className="search-wrapper">
                    <input type="text" className="search" placeholder='Kitap, yayın evi veya yazar adı arayın...' />
                    <IconButton className='search-btn'><CiSearch className='icon' style={{ color: "black" }} /></IconButton>
                </div>
            </div>
            <div className="header-right">
                <FaRegHeart className='icon icon-24px' />
                <FaBasketShopping className='icon icon-24px' />
                <Link to="/giris" className="signin-btn">GİRİŞ YAP</Link>
            </div>
        </header>
    )
}

export default Header