import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateModal from '../companents/modals/CreateModal';
import DeleteModal from '../companents/modals/DeleteModal';
import CancelProductModal from '../companents/modals/CancelProductModal';
import { Modal } from '@mui/material';
import '../css/GlobalModal.css';
import { closeModal } from '../redux/slices/modalSlice';
import EditModal from '../companents/modals/EditModal';
import RemoveFavoriteModal from '../companents/modals/RemoveFavoriteModal';
import AddBasketFavoriteModal from '../companents/modals/AddBasketFavoriteModal';
import DeleteAccountModal from '../companents/modals/DeleteAccountModal';

function GlobalModal() {
    const dispatch = useDispatch();
    const { isOpen, modalType, modalProps } = useSelector(store => store.modal);
    if (!isOpen) return null;
    const renderModalContent = () => {
        switch (modalType) {
            case 'CREATE_MODAL':
                console.log("Burası çalıştı mı?");
                return < CreateModal modalProps={modalProps} />
            case 'DELETE_MODAL':
                return <DeleteModal modalProps={modalProps} />
            case 'CANCEL_PRODUCT_MODAL':
                return <CancelProductModal modalProps={modalProps} />
            case 'EDIT_ADRESS_MODAL':
                return <EditModal modalProps={modalProps} />
            case 'REMOVE_FAVORITE_MODAL':
                return <RemoveFavoriteModal modalProps={modalProps} />
            case 'ADD_BASKET_FAVORITE_MODAL':
                return <AddBasketFavoriteModal modalProps={modalProps} />
            case 'DELETE_ACCOUNT_MODAL':
                return <DeleteAccountModal modalProps={modalProps} />

            default:
                return null;
        }
    }
    return (
        <Modal
            className='global-modal'
            open={isOpen}
            onClose={() => dispatch(closeModal())}
        >
            <div className='modal-content'>
                <div className="modal-header">
                    <p className='modal-title'>{modalProps.modalTitle}</p>
                </div>
                {renderModalContent()}
            </div>
        </Modal>
    )
}

export default GlobalModal