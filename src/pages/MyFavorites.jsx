import React, { useEffect } from 'react'
import '../css/admin/adminTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFavoriteProducts, removeFavorite } from '../redux/slices/favoriteSlice';
import { addBasket } from '../redux/slices/basketSlice';
import { createToasty } from '../redux/slices/toastySlice';
import { openModal } from '../redux/slices/modalSlice';
function MyFavorites() {
    const dispatch = useDispatch();
    const { favorites } = useSelector(store => store.favorite);
    useEffect(() => {
        const getAllFavorites = async () => {
            await dispatch(getMyFavoriteProducts());
        }
        getAllFavorites();
    }, [])

    const addBasketFavoriteOpenModal = (product) => {
        dispatch(openModal({
            modalType: "ADD_BASKET_FAVORITE_MODAL",
            modalProps: {
                modalTitle: "Sepete Ekle",
                modalSubTitle: `adlı favori listenizdeki ürünü sepete eklemek istiyor musunuz?`,
                product: product
            }
        }))
    }

    const removeFavoriteOpenModal = (id, favoriteProductName) => {
        dispatch(openModal({
            modalType: "REMOVE_FAVORITE_MODAL",
            modalProps: {
                modalTitle: "Favori Ürün Kaldırma İşlemi",
                modalSubTitle: `adlı ürününü favori ürün listenizden kaldırmak istiyor musunuz?`,
                product_id: id,
                favorite_product_name: favoriteProductName
            }
        }))
    }
    return (
        <div className='tab-section'>
            <div className="tab-section-title">
                Favoriler
            </div>
            {
                favorites.length == 0 ? <div className='input-error'>Gösterilecek bir ürün bulunamadı!</div> : (

                    <div className="tab-container">
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead className="admin-thead">
                                    <tr>
                                        <th>Ürün Resmi</th>
                                        <th>Ürün Adı</th>
                                        <th>Fiyat</th>
                                        <th>Seçenekler</th>
                                    </tr>
                                </thead>
                                <tbody className='admin-tbody'>
                                    {

                                        favorites.map((product) => (
                                            <tr key={product.id}>
                                                <td><img style={{ height: "100px" }} src={`http://localhost/react-eticaret/images/${product.book_image}`} alt="" /></td>
                                                <td>{product.book_name}</td>
                                                <td>{product.price} TL</td>
                                                <td>
                                                    <div className='flex-row'>

                                                        <button className='btn' style={{ backgroundColor: "indigo" }} onClick={() => addBasketFavoriteOpenModal(product)}>Sepete Ekle</button>
                                                        <button className='btn btn-red' onClick={() => removeFavoriteOpenModal(product.product_id, product.book_name)}>Favorilerden kaldır</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default MyFavorites