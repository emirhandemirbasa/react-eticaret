import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import BookDetails from '../pages/BookDetails'
import MainLayout from '../layout/MainLayout'
import AdminLayout from '../layout/AdminLayout'
import CreateProduct from '../pages/CreateProduct'
import Dashboard from '../companents/admin/Dashboard'
import Products from '../companents/admin/Products'
import Customers from '../companents/admin/Customers'
import Settings from '../companents/admin/Settings'
import Orders from '../companents/admin/Orders.jsx'
import Category from '../companents/admin/Category.jsx'
import CompleteOrders from '../pages/CompleteOrders.jsx'
import Register from '../pages/Register.jsx'

function BaseRouterConfig() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/giris' element={<Login />} />
                <Route path='/kitap-detayi/:id' element={<BookDetails />} />
                <Route path='/siparistamamla' element={<CompleteOrders />} />
                <Route path='/kayit' element={<Register />} />
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/kategoriler" element={<Category />} />
                <Route path="/admin/urunekle" element={<CreateProduct />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/urunler" element={<Products />} />
                <Route path="/admin/musteriler" element={<Customers />} />
                <Route path="/admin/siparisler" element={<Orders />} />
                <Route path="/admin/ayarlar" element={<Settings />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default BaseRouterConfig