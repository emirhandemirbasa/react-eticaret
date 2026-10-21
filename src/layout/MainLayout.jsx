import React from 'react'
import Header from '../companents/Header'
import Footer from '../companents/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout