import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            behavior: "instant",
            left: 0,
            top: 0
        })
    }, [pathname])
    return null;
}

export default ScrollToTop