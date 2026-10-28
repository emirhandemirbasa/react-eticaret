import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/product.css'
import { addBasket } from '../redux/slices/basketSlice'
import { useDispatch } from 'react-redux'
import { createToasty } from '../redux/slices/toastySlice'
import { IconButton } from '@mui/material'
import { FaRegHeart } from "react-icons/fa";
import { addFavorite, getMyFavoriteProducts, isProductMyFavoriteList } from '../redux/slices/favoriteSlice'


function Product({ product }) {
    const { id, book_name, writer_name, page_count, book_image, publishing_house, book_desc, price } = product;
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(false);
    const sepeteEkle = () => {
        const basket = {
            id,
            book_name,
            writer_name,
            price,
            book_image,
            count: 1
        };
        dispatch(addBasket(basket));
        dispatch(createToasty({
            mesaj: `${book_name} sepetinize eklendi.`,
            tip: "basari"
        }));
    }

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const { payload } = await dispatch(isProductMyFavoriteList(id));
                if (payload && payload.success === true) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkFavorite();
    }, [dispatch, id]);

    const handleFavorite = async () => {
        try {
            const formData = new FormData();
            formData.append("product_id", id);
            const { payload } = await dispatch(addFavorite(formData));
            const { success, message } = payload;
            if (success == true) {
                dispatch(createToasty({
                    mesaj: message,
                    tip: "basari"
                }))
                setIsFavorite(!isFavorite);
                dispatch(getMyFavoriteProducts());
            } else {
                dispatch(createToasty({
                    mesaj: message,
                    tip: "hata"
                }))
            }
        } catch (error) {
            dispatch(createToasty({
                mesaj: error,
                tip: "hata"
            }))
        }
    }

    return (
        <div className="book-card">
            <Link to={"/kitap-detayi/" + id} className='book-detail-link'>
                <div className="book-card-header">
                    <img src={`http://localhost/react-eticaret/images/${book_image}`} alt="" />
                </div>
                <div className="book-card-body">
                    <p className='book-name'>{book_name}</p>
                    <div className="writer-publishing">
                        <p className="writer-name">{writer_name}</p>
                        <p className='publishinghouse-name'>{publishing_house}</p>
                    </div>
                    <p className='price'>{price} TL</p>
                </div>
            </Link>
            <IconButton className={`favori-btn ${isFavorite ? "favori-added" : ""}`} onClick={() => handleFavorite()}>
                <FaRegHeart />
            </IconButton>
            <div className="book-card-footer">
                <button className='add-basket-btn' onClick={() => sepeteEkle()}>Sepete Ekle</button>
            </div >
        </div >
    )
}

export default Product