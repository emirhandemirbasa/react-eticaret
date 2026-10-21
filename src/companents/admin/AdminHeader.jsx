import React, { useState } from 'react'
import '../../css/admin/AdminHeader.css'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';



function AdminHeader() {
  const [adminTheme, setAdminTheme] = useState(false);

  const changeAdminTheme = () => {
    if (adminTheme) {
      document.body.style.color = "#232323";
      document.body.style.backgroundColor = "white";
      document.body.style.transition = "all 0.33s ease-in-out";
    } else {
      document.body.style.color = "white";
      document.body.style.backgroundColor = "#232323";
      document.body.style.transition = "all 0.33s ease-in-out";

    }
    setAdminTheme(!adminTheme);
  }
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <Link to={"/admin/dashboard"} className="nav-link"><FaHome className='admin-header-icon' />Dashboard</Link>
      </div>
      <div className='admin-header-right'>
        {
          adminTheme ? <FaMoon className='admin-header-icon' onClick={() => changeAdminTheme()} /> : <CiLight className='admin-header-icon' onClick={() => changeAdminTheme()} />
        }
        <IoIosNotifications className='admin-header-icon' />
        <CgProfile className='admin-header-icon' />
        <p style={{ color: "#ff5d5d" }}>Admin</p>
      </div>
    </header>
  )
}

export default AdminHeader