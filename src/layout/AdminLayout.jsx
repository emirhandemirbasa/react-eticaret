import React from 'react'
import CreateProduct from '../pages/CreateProduct'
import { Outlet } from 'react-router-dom'

import AdminHeader from '../companents/admin/AdminHeader'
import AdminSidebar from '../companents/admin/AdminSidebar'
import '../css/admin/AdminMain.css'

function AdminLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)', minHeight: '100vh', backgroundColor: '#f5f8fa' }}>
                <AdminHeader />
                <main style={{ padding: '30px' }} className="admin-main">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default AdminLayout