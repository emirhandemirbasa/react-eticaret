import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { createToasty } from '../../redux/slices/toastySlice';
import { cancelOrderById, getOrdersById } from '../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

function CancelProductModal() {
    const { modalProps } = useSelector(store => store.modal);
    const dispatch = useDispatch();
    const cancelProduct = async () => {
        try {
            const resultAction = await dispatch(cancelOrderById(modalProps.orderId));
            if (cancelOrderById.fulfilled.match(resultAction)) {
                const { message, success } = resultAction.payload
                if (success == false) {
                    dispatch(createToasty({
                        mesaj: message,
                        tip: "hata"
                    }));
                } else {
                    dispatch(createToasty({
                        mesaj: message,
                        tip: "basari"
                    }))
                    await dispatch(getOrdersById());
                }
            } else if (cancelOrderById.rejected.match(resultAction)) {
                dispatch(createToasty({
                    mesaj: resultAction.payload || "İşlem başarısız oldu.",
                    tip: "hata"
                }));
            }
        } catch (error) {
            dispatch(createToasty({
                mesaj: error,
                tip: "hata"
            }))
        } finally {
            dispatch(closeModal())
        }
    }
    return (
        <div>
            <div className='modal-body'>
                <p className='modal-subtitle'>{modalProps.modalSubTitle}</p>
            </div>
            <div className="modal-footer">
                <div className="buttons-flex">
                    <button className='btn btn-red modal-btn' onClick={() => cancelProduct()}>Evet, Eminim.</button>
                    <button className="btn btn-close modal-btn" onClick={() => dispatch(closeModal())}>Hayır</button>
                </div>
            </div>
        </div>
    )
}

export default CancelProductModal