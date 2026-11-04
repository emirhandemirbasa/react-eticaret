import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../css/admin/AdminTable.css';
import '../css/Orders.css';
import '../css/buttons.css';
import '../css/modal.css';
import { getOrdersById } from '../redux/slices/orderSlice';
import { Modal } from '@mui/material';
import { getBookById } from '../redux/slices/bookSlice';
import { getAdressById } from '../redux/slices/adressSlice';
import { openModal } from '../redux/slices/modalSlice';

function MyOrders() {
    const { orders } = useSelector(store => store.order);
    const [open, setOpen] = useState(false);
    const [productDetailList, setProductDetailList] = useState([]);
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        dispatch(getOrdersById());
    }, [])

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const [tarih, saat] = dateString.split(" ");
        const [yil, ay, gun] = tarih.split("-");
        const [saatKismi, dakikaKismi] = saat.split(":");

        return `${gun}/${ay}/${yil} ${saatKismi}:${dakikaKismi}`;
    };

    const openDetailModal = async (products, adressJSON) => {
        const adress = JSON.parse(adressJSON);
        const parsedProducts = JSON.parse(products);
        let totalPrice = 0;
        const detailPromise = parsedProducts.map(async (product) => {
            const { id } = product;
            const selectedBook = await dispatch(getBookById(id));
            totalPrice += selectedBook.payload.price * product.count;
            return {
                product: selectedBook.payload,
                adress: adress,
                product_count: product.count
            };
        })
        const details = await Promise.all(detailPromise);
        setProductDetailList(details);
        console.log(details);
        setTotalAmount(totalPrice);
        setOpen(true);
    }

    const openCancelProductModal = (orderId) => {
        dispatch(openModal(
            {
                modalType: "CANCEL_PRODUCT_MODAL",
                modalProps: {
                    modalTitle: "Sipariş İptal",
                    modalSubTitle: "Bu siparişinizi iptal etmek istediğinize emin misiniz?",
                    orderId: orderId
                }
            }
        ))
    }
    return (
        <div className='tab-section'>
            <div className="tab-section-title">Siparişlerim</div>
            {
                orders.length !== 0 ? (

                    <div className="admin-table-wrapper">
                        <table className='admin-table'>
                            <thead className="admin-thead">
                                <tr>
                                    <th>Sipariş No.</th>
                                    <th>Durum</th>
                                    <th>Sipariş Tarihi</th>
                                    <th>Ürünler</th>
                                    <th>Seçenekler</th>
                                </tr>
                            </thead>
                            <tbody className="admin-tbody">
                                {
                                    orders.map((order) => (

                                        <tr key={order.id} >
                                            <td>{order.id}</td>
                                            <td>
                                                <span className={
                                                    order.state == "Bekliyor" ? "badge badge-bekliyor" :
                                                        order.state == "Hazırlanıyor" ? "badge badge-hazirlaniyor" :
                                                            order.state == "Kargoya Verildi" ? "badge badge-kargo" :
                                                                order.state == "Dağıtımda" ? "badge badge-dagitimda" :
                                                                    order.state == "Teslim Edildi" ? " badge badge-teslim" :
                                                                        order.state == "İptal" ? "badge badge-iptal" :
                                                                            order.state == "İptal Onayı Bekleniyor" ? "badge badge-iptal-onay" : ""
                                                }>
                                                    {order.state}
                                                </span>
                                            </td>
                                            <td>{formatDate(order.created_date)}</td>
                                            <td><button className='btn btn-green' onClick={() => openDetailModal(order.products, order.adress)}>Ürünleri Göster</button></td>
                                            <td><button className='btn btn-red' onClick={() => openCancelProductModal(order.id)}>İptal</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : <div className='input-error'>Daha önce oluşturulmuş bir siparişiniz bulunamadı!</div>
            }
            <Modal
                className='modal-container'
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className='modal'>
                    <div className="modal-header">
                        <h2>Sipariş Detayı</h2>
                    </div>

                    <div className="modal-body">
                        <div className="modal-table-wrapper">
                            <table className="modal-product-table">
                                <thead>
                                    <tr>
                                        <th>Resim</th>
                                        <th>Ürün Adı</th>
                                        <th>Fiyat</th>
                                        <th>Adet</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productDetailList.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img
                                                    src={`http://localhost/react-eticaret/images/${item.product?.book_image}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{item.product?.book_name}</td>
                                            <td>{item.product?.price} TL</td>
                                            <td>{item.product_count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-address-section">
                            <h3>Teslimat Adresi</h3>
                            <p>{productDetailList[0]?.adress.adress_detail}</p>
                            <p>{productDetailList[0]?.adress.city},{productDetailList[0]?.adress.district}</p>
                        </div>
                        <div className="modal-price-section">
                            <h3>Ödeme Detayları</h3>
                            <div className='modal-price'>
                                <p>Kargo Ücreti</p>
                                <span>{0} TL</span>
                            </div>
                            <div className="modal-price">
                                <p>Toplam Tutar</p>
                                <span>{totalAmount} TL</span>
                            </div>
                            <div className="modal-price general-price">
                                <p>Genel Tutar</p>
                                <span>{totalAmount} TL</span>
                            </div>
                        </div>
                    </div>



                    <div className="modal-footer">
                        <button onClick={() => setOpen(false)} className='btn btn-red'>Kapat</button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default MyOrders