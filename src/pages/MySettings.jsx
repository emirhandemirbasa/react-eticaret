import React from 'react'
import '../css/settings.css';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteAccount, logout } from '../redux/slices/appSlice';
import { createToasty } from '../redux/slices/toastySlice';
import { openModal } from '../redux/slices/modalSlice';

function MySettings() {
  const dispatch = useDispatch();
  const openDeleteAccountModal = () => {
    dispatch(openModal({
      modalType: "DELETE_ACCOUNT_MODAL",
      modalProps: {
        modalTitle: "Hesabımı Sil",
        modalSubTitle: "Hesabınızı kaldırmak istediğinizden emin misiniz?"
      }
    }))
  }
  return (
    <div className='tab-section'>
      <div className="tab-section-title">Ayarlar</div>
      <div className="tab-section-container">
        <button className='settings-btn' onClick={() => openDeleteAccountModal()}>
          <MdDelete className='icon icon-24px' style={{ color: "var(--primary-text-color)" }} />
          <div className='settings-btn-group'>
            <p className='settings-btn-title'>Hesabımı Sil</p>
            <span className='settings-btn-subtitle'>Hesabınız kalıcı olarak kaldırılır. Fakat sipariş verdiğiniz ürünler veri tabanında saklanır.</span>
          </div>
        </button>
      </div>
    </div >
  )
}

export default MySettings