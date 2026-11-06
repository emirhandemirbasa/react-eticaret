import React, { useEffect, useState } from 'react';
import '../../css/profile/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaRegHeart, FaUser } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


function Sidebar() {
    const location = useLocation();
    const path = location.pathname.replace("/", "").toString();

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <h3>Hesabım</h3>
            </div>
            <div className="sidebar-ul">
                <ul>
                    <li className='list-item'>
                        <Link to={"/profilim"} className={path === "profilim" ? "active" : ""}>
                            <FaUser /> Profil
                        </Link>
                    </li>
                    <li className='list-item'>
                        <Link to={"/siparislerim"} className={path === "siparislerim" ? "active" : ""}>
                            <FaShoppingBasket /> Siparişlerim
                        </Link>
                    </li>
                    <li className='list-item'>
                        <Link to={"/adreslerim"} className={path === "adreslerim" ? "active" : ""}>
                            <FaAddressBook /> Adreslerim
                        </Link>
                    </li>
                    <li className='list-item'>
                        <Link to={"/favoriler"} className={path === "favoriler" ? "active" : ""}>
                            <FaRegHeart /> Favoriler
                        </Link>
                    </li>
                    <li className='list-item'>
                        <Link to={"/ayarlar"} className={path === "ayarlar" ? "active" : ""}>
                            <FaGear /> Ayarlar
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;