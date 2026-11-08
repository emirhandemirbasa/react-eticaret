import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdressById, getAllMyAdress } from '../../redux/slices/adressSlice';
import { closeModal } from '../../redux/slices/modalSlice';
import { createToasty } from '../../redux/slices/toastySlice';

function DeleteModal() {
    const { modalProps } = useSelector(store => store.modal);
    const deleteId = modalProps.id;
    console.log(modalProps);
    const dispatch = useDispatch();
    const deleteAdress = async () => {
        try {
            const resultAction = await dispatch(deleteAdressById(deleteId));
            if (deleteAdressById.fulfilled.match(resultAction)) {
                const { message, success } = resultAction.payload;
                if (success == false) {
                    dispatch(createToasty({
                        mesaj: message,
                        tip: "hata"
                    }));
                } else {
                    dispatch(createToasty({
                        mesaj: message,
                        tip: "basari"
                    }));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(closeModal());
            await dispatch(getAllMyAdress());
        }
    }
    return (
        <div>
            <div className='modal-body'>
                <p className='modal-subtitle'>{modalProps.modalSubTitle}</p>
            </div>
            <div className="modal-footer">
                <div className="buttons-flex">
                    <button className='btn btn-red modal-btn' onClick={() => deleteAdress()}>Sil</button>
                    <button className="btn btn-close modal-btn" onClick={() => dispatch(closeModal())}>Kapat</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal