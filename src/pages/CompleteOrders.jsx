import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdressById, getAllMyAdress } from '../redux/slices/adressSlice';
import '../css/CompleteOrders.css';
import { FaMapMarkerAlt } from "react-icons/fa";

import { Divider } from '@mui/material'
import { clearBaskets } from '../redux/slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import { createToasty } from '../redux/slices/toastySlice';
import { addOrder } from '../redux/slices/orderSlice';
import { create } from 'axios';


function CompleteOrders() {
    const { adress } = useSelector(store => store.adress);
    const { baskets } = useSelector(store => store.basket);
    const totalAmount = baskets.length != 0 ? baskets.map((basket) => (basket.price * basket.count)).reduce((a, b) => a + b) : 0;
    const dispatch = useDispatch();
    const [selectedAdress, setSelectedAdress] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const checkBasketAndAdress = async () => {
            if (!baskets && baskets.length == 0) {
                dispatch(createToasty({
                    "mesaj": "Sipariş vermek için lütfen sepetinize bir ürün ekleyin.",
                    "tip": "hata"
                }));
                navigate("/");
                return;
            }
            try {
                await dispatch(getAllMyAdress()).unwrap();
            } catch (error) {
                dispatch(createToasty({
                    "mesaj": error,
                    "tip": "hata"
                }));
                navigate("/");
            } finally {
                setIsLoaded(true);
            }
        }
        checkBasketAndAdress();
    }, [dispatch, navigate, baskets]);

    useEffect(() => {
        if (!isLoaded) return;
        const primary = adress.find(a => a.primary_adress == 1);
        if (primary) {
            setSelectedAdress(primary.id);
        } else if (adress.length > 0) {
            setSelectedAdress(adress[0].id);
        }
    }, [adress, isLoaded, navigate, dispatch]);

    const handleAddressSelect = (id) => {
        setSelectedAdress(id);
    }

    const siparisTamamla = async () => {
        if (baskets.length == 0) {
            dispatch(createToasty({
                "mesaj": "Sipariş vermek için lütfen sepetinize bir ürün ekleyin.",
                "tip": "hata"
            }))
        } else {
            if (!selectedAdress) {
                dispatch(createToasty({
                    "mesaj": "Lütfen bir teslimat adresi seçin.",
                    "tip": "hata"
                }));
                return;
            }
            const products = [];
            baskets.map((basket) => products.push({ id: basket.id, count: basket.count }));
            const order = {
                adress_id: selectedAdress,
                state: "Bekliyor",
                products: products
            };
            console.log(order);
            dispatch(await addOrder(order));
            dispatch(clearBaskets());
            navigate("/");
            dispatch(createToasty({
                "mesaj": "Başarıyla sipariş verdiniz!",
                "tip": "basari"
            }));
        }
    }
    return (
        <div className='adreses'>
            <div className="section-header">
                <FaMapMarkerAlt className='section-icon' />
                <h3>Teslimat Adresi Seçin</h3>
            </div>
            <div className='adresler-bitir'>
                <div className='adresler'>
                    {
                        adress?.map((adres) => (
                            <div className="adress-card" key={adres.id}>
                                <input type={`radio`} checked={selectedAdress === adres.id} name="selected_address" onChange={() => handleAddressSelect(adres.id)} />
                                <div className='adress-detail'>
                                    <h4>{adres.adress_name} {adres.primary_adress ? "(Birincil adres)" : ""}</h4>
                                    <p>{adres.adress_detail}</p>
                                    <p>{adres.city}</p>
                                    <p>{adres.district}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='siparis-bitir-div'>
                    <h3 className="sepet-again">Sepet Özeti</h3>
                    <Divider />
                    <div className="siparis-section">
                        <p className='section-key'>Toplam Ürünler:</p>
                        <span className='section-value'>{totalAmount.toFixed(2)} TL</span>
                    </div>
                    <div className="siparis-section">
                        <p className='section-key'>Kargo:</p>
                        <span className='section-value'>Ücretsiz</span>
                    </div>
                    <Divider />
                    <div className="siparis-section">
                        <p className='section-total-key'>TOPLAM:</p>
                        <span className='section-total-value'>{totalAmount.toFixed(2)} TL</span>
                    </div>
                    <button className='siparis-tamamla' onClick={() => siparisTamamla()}>Alışverişi Tamamla</button>
                </div>
            </div>
        </div>
    )
}

export default CompleteOrders