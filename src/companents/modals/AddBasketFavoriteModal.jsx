import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice';
import { createToasty } from '../../redux/slices/toastySlice';
import { addBasket } from '../../redux/slices/basketSlice';

function AddBasketFavoriteModal() {
    const dispatch = useDispatch();
    const { modalProps } = useSelector(store => store.modal);
    const sepeteEkle = () => {
        const { product_id, book_name, writer_name, price, book_image } = modalProps.product;
        const basket = {
            id: product_id,
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
        dispatch(closeModal());
    }
    return (
        <div>
            <div className="modal-body">
                <div className="modal-subtitle"><b>{modalProps.product.book_name}</b> {modalProps.modalSubTitle}</div>
            </div>
            <div className="modal-footer">
                <div className="buttons-flex">
                    <button className='btn btn-blue' onClick={() => sepeteEkle()}>Sepete Ekle</button>
                    <button className='btn btn-close' onClick={() => dispatch(closeModal())}>Vazgeç</button>
                </div>
            </div>
        </div>
    )
}

export default AddBasketFavoriteModal