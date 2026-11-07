import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice';
import { createToasty } from '../../redux/slices/toastySlice';
import { deleteAccount, logout } from '../../redux/slices/appSlice';
import { useNavigate } from 'react-router-dom';

function DeleteAccountModal() {
    const { modalProps } = useSelector(store => store.modal);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteMyAccount = async () => {
        const response = await dispatch(deleteAccount());
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
            }
            ))
            await dispatch(logout());
            navigate("/");
        }
        dispatch(closeModal());
    }
    return (
        <div>
            <div className="modal-body">
                <div className="modal-subtitle">{modalProps.modalSubTitle}</div>
            </div>
            <div className="modal-footer">
                <div className="buttons-flex">
                    <button className='btn btn-red' onClick={() => deleteMyAccount()}>Hesabımı kaldır</button>
                    <button className='btn btn-close' onClick={() => dispatch(closeModal())}>Vazgeç</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal