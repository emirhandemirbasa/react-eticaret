import { Drawer, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from '../redux/slices/appSlice'
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import '../css/drawer.css'
import { calculateTotalAmount, deleteProductToBasket } from '../redux/slices/basketSlice';
import { createToasty } from '../redux/slices/toastySlice';
import { useEffect } from 'react';

function Basket() {
    const { drawer } = useSelector(store => store.app);
    const { baskets, totalAmount } = useSelector(store => store.basket);
    const dispatch = useDispatch();

    const deleteProductBasket = (id) => {
        console.log("id", id);
        dispatch(deleteProductToBasket(id));
        dispatch(createToasty({
            mesaj: "Ürün sepetten kaldırıldı",
            tip: "bilgi"
        }));
    }

    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [baskets])
    return (
        <Drawer anchor="right" open={drawer} onClose={() => dispatch(setDrawer())}>
            <div className="app-drawer">
                <div className="drawer-header">
                    <h4 className="my-basket">Sepetim</h4>
                    <FaRegCircleXmark onClick={() => dispatch(setDrawer())} className="close-drawer-icon" />
                </div>
                <div className="drawer-body" >
                    {
                        baskets.length == 0 ? <p>Sepetinizde bir ürün bulunmuyor</p>
                            :
                            baskets.map((basket) => (
                                <div className="basket-product" key={basket.id}>
                                    <div className='basket-img-and-info'>
                                        <img src={`http://localhost/react-eticaret/images/${basket.book_image}`} />
                                        <div className="product-basket-info">
                                            <p>{basket.book_name}</p>
                                            <p>Adet: {basket.count}</p>
                                            <p className="basket-price">{basket.price * basket.count} TL</p>
                                        </div>
                                    </div>
                                    <IconButton className="delete-product-icon-btn" onClick={() => deleteProductBasket(basket.id)}>
                                        <FaTrash />
                                    </IconButton>
                                </div>
                            ))
                    }
                </div>
                <div className="drawer-footer">
                    <h3 className="total-amount">Toplam Sepet Tutarı<br /><span>{totalAmount} TL</span></h3>
                    <Link to="/sepetim" > <button className="siparis-button" onClick={() => dispatch(setDrawer())} >Sepete Git</button></Link>
                </div>
            </div>
        </Drawer >
    )
}

export default Basket