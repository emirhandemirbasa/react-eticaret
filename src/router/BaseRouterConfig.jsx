import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import BookDetails from '../pages/BookDetails'

function BaseRouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/giris' element={<Login />} />
            <Route path='/kitap-detayi/:id' element={<BookDetails />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default BaseRouterConfig