import React from 'react'
import CreateModal from './modals/CreateModal'
import { useDispatch } from 'react-redux'
import { openModal } from '../redux/slices/modalSlice';

function Test() {
    const dispatch = useDispatch();
    const acBakalim = () => {
        dispatch(openModal({
            modalType: "CREATE_MODAL",
            modalProps: {
                modalTitle: `Adres Ekle`
            }
        }))
    }
    return (
        <div>
            <button onClick={() => acBakalim()}>Aç</button>
        </div>
    )
}

export default Test