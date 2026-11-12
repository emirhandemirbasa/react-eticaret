import React, { useEffect, useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { Badge, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { CiSearch } from "react-icons/ci";

import '../css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginControl, setDrawer, setTheme } from '../redux/slices/appSlice';

import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { FaCartShopping } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { logout } from '../redux/slices/appSlice';
import { createToasty } from '../redux/slices/toastySlice';
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { getMyFavoriteProducts } from '../redux/slices/favoriteSlice';




function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favorites } = useSelector(store => store.favorite);
    useEffect(() => {
        const favoriUrunlerim = async () => {
            await dispatch(getMyFavoriteProducts())
        }
        favoriUrunlerim();
    }, [])
    useEffect(() => {
        const loginHeaderControl = async () => {
            const logControlFunc = await dispatch(loginControl());
            if (loginControl.fulfilled.match(logControlFunc)) {
                const { isFinishLoginTime } = logControlFunc.payload;
                if (isFinishLoginTime == true) {
                    dispatch(logout());
                    navigate("/");
                }
            }
        }
        loginHeaderControl();
    }, [])
    //menu
    const id = useId();
    const menuId = `${id}-menu`;
    const buttonId = `${id}-button`;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    //menu
    const { session, theme } = useSelector(store => store.app);
    const { baskets } = useSelector((store) => store.basket);
    const logoutAccount = () => {
        if (session?.email) {
            dispatch(logout());
            navigate("/");
            dispatch(createToasty({
                mesaj: "Hesabınızdan çıkış yaptınız!",
                tip: "basari"
            }));
            handleClose();
        } else {
            dispatch(createToasty({
                mesaj: "Hesabınızdan çıkış yaparken hata oluştu.",
                tip: "hata"
            }));
        }
    }
    const [search, setSearch] = useState("");
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim().length > 0) {
            navigate(`/urunara?q=${encodeURIComponent(search)}`);
        }
    };
    return (
        <header className="main-header">
            <div className="header-left">
                <Link to="/" className='link'><p className="header-brand">Empi's Books<br /><span>"Kitap kokulu dünyanız"</span></p></Link>
            </div>
            <div className="header-middle">
                <form method="GET" className='form'>
                    <div className="search-wrapper">
                        <input type="text" className="search" name="search" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Kitap, yayın evi veya yazar adı arayın...' />
                        <IconButton className='search-btn' onClick={(e) => handleSearchSubmit(e)} type="submit"><CiSearch className='icon' style={{ color: "black" }} /></IconButton>
                    </div>
                </form>
            </div>
            <div className="header-right">
                <IconButton>
                    {
                        theme ? <CiDark className='icon icon-24px' style={{ color: "white" }} onClick={() => dispatch(setTheme())} /> : <CiLight className='icon icon-24px' style={{ color: "white" }} onClick={() => dispatch(setTheme())} />
                    }
                </IconButton>
                <Link to="/favoriler">
                    <IconButton>
                        <Badge badgeContent={favorites.length != 0 ? favorites.length : "0"} color="error">
                            <FaRegHeart className='icon icon-24px' />
                        </Badge>
                    </IconButton>
                </Link>
                <IconButton onClick={() => dispatch(setDrawer())}>
                    <Badge badgeContent={baskets.length != 0 ? baskets.length : "0"} color="error">
                        <FaBasketShopping className='icon icon-24px' />
                    </Badge>
                </IconButton>
                {
                    session?.email ?
                        <div
                            id={buttonId}
                            aria-controls={open ? menuId : undefined}
                            aria-haspopup="true"
                            aria-expanded={open}
                            onClick={handleClick}
                            className='profile'>
                            {session.email.substring(0, 1).toUpperCase()}
                        </div> :
                        <Link to="/giris" className="signin-btn">GİRİŞ YAP</Link>
                }
            </div>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': buttonId,
                    }, paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} className="menu-item"><Link to={"/profilim"}><FaUserCircle /> Profilim</Link></MenuItem>
                <MenuItem onClick={handleClose} className="menu-item"><Link to={"/siparislerim"}><FaCartShopping />Siparişlerim</Link></MenuItem>
                <MenuItem onClick={handleClose} className="menu-item"><Link to={"/adreslerim"}><FaLocationDot />Adreslerim</Link></MenuItem>
                <MenuItem onClick={handleClose} className="menu-item"><Link to={"/favoriler"}><FaRegHeart />Favoriler</Link></MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} className="menu-item"><Link to={"/ayarlar"}><IoMdSettings />Ayarlar</Link></MenuItem>
                <MenuItem onClick={() => logoutAccount()} className="menu-item"><MdOutlineLogout />Çıkış Yap</MenuItem>
            </Menu>
        </header >
    )
}

export default Header