import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice';
import { getMyFavoriteProducts, removeFavorite } from '../../redux/slices/favoriteSlice';
import { createToasty } from '../../redux/slices/toastySlice';

function RemoveFavoriteModal() {
    const dispatch = useDispatch();
    const { modalProps } = useSelector(store => store.modal);
    const removeFavoriteById = async () => {
        const response = await dispatch(removeFavorite(modalProps.product_id));
        const { message, success } = response.payload;
        if (success == false) {
            dispatch(createToasty({
                mesaj: message,
                tip: "hata"
            }))
        } else {
            dispatch(createToasty({
                mesaj: message,
                tip: "basari"
            }))
            dispatch(getMyFavoriteProducts());
        }
        dispatch(closeModal());
    }
    return (
        <div>
            <div className="modal-body">
                <div className="modal-subtitle"><b>{modalProps.favorite_product_name}</b> {modalProps.modalSubTitle}</div>
            </div>
            <div className="modal-footer">
                <div className="buttons-flex">
                    <button className='btn btn-red' onClick={() => removeFavoriteById()}>Favorilerden kaldır</button>
                    <button className='btn btn-close' onClick={() => dispatch(closeModal())}>Vazgeç</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveFavoriteModal