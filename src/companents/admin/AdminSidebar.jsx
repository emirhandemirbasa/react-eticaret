import React from 'react'
import '../../css/admin/AdminSidebar.css'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";


function AdminSidebar() {
  return (
    <div className='admin-sidebar'>
      <div className="menu">
        <p className="admin-sidebar-title">COMMERCE UI</p>
      </div>
      <ul className='admin-sidebar-list'>
        <li><Link className='admin-sidebar-link' to={"/admin/dashboard"}><MdDashboard /> Dashboard</Link ></li>
        <li><Link className='admin-sidebar-link' to={"/admin/urunler"}><IoBag /> Ürünler</Link></li>
        <li><Link className='admin-sidebar-link' to={"/admin/kategoriler"}><BiSolidCategory /> Kategoriler</Link></li>
        <li><Link className='admin-sidebar-link' to={"/admin/siparisler"}><FaShoppingCart /> Siparişler</Link></li>
        <li><Link className='admin-sidebar-link' to={"/admin/musteriler"}><FaUser />Müşteriler</Link></li>
        <li><Link className='admin-sidebar-link' to={"/admin/ayarlar"}><IoMdSettings />Ayarlar</Link></li>
      </ul>
    </div>
  )
}

export default AdminSidebar