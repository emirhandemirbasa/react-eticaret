import React, { useEffect, useState } from 'react'
import '../css/tab.css';
import { useDispatch, useSelector } from 'react-redux';
import { createAdress, deleteAdressById, getAllMyAdress } from '../redux/slices/adressSlice';
import { FaAddressBook } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IconButton, Modal } from '@mui/material';
import '../css/form-style.css';
import { useFormik } from 'formik';
import { createAdressSchema } from '../schemas/createAdressSchema';
import { IoWarningOutline } from 'react-icons/io5';
import { createToasty } from '../redux/slices/toastySlice';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../redux/slices/modalSlice';

function MyAdreses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adress } = useSelector(store => store.adress);
  useEffect(() => {
    const getAdress = async () => {
      try {
        await dispatch(getAllMyAdress()).unwrap();
      } catch (error) {
        console.log("Hata", error);
        dispatch(createToasty({
          "mesaj": error || "Adresler yüklenirken hata oluştu.",
          "tip": "hata"
        }));
        navigate("/");
      }
    }
    getAdress();
  }, []);

  const handleCreate = () => {
    dispatch(openModal({
      modalType: "CREATE_MODAL",
      modalProps: {
        modalTitle: "Adres Ekle"
      }
    }))
  }


  const handleDelete = (id, adresAdi) => {
    dispatch(openModal({
      modalType: "DELETE_MODAL",
      modalProps: {
        modalTitle: "Silme İşlemi",
        id: id,
        modalSubTitle: `Gerçekten "${adresAdi}" adlı adresinizi silmek istiyor musunuz?`
      }
    }));
  }

  const handleEdit = (id) => {
    dispatch(openModal({
      modalType: "EDIT_ADRESS_MODAL",
      modalProps: {
        modalTitle: "Adres Düzenle",
        id: id
      }
    }));
  }

  return (
    <div className='tab'>
      <div className="tab-header">
        <p className='tab-title'>
          Adreslerim
        </p>
        <button className='btn btn-green' onClick={() => handleCreate()}>
          <FaAddressBook />Adres Ekle
        </button>
      </div>
      <div className="tab-body">
        {
          adress.length == 0 ? <p>Adres bulunamadı</p> :
            adress.map((adres, index) => (

              <div className="tab-card" key={index}>
                <p className='tab-card-title'>{adres.adress_name}</p>
                <p>{adres.adress_ad_soyad}</p>
                <p>{adres.adress_detail}</p>
                <p>{adres.city} , {adres.district}</p>
                <p>Telefon: <span><a href={"tel:" + adres.adress_phone}>{adres.adress_phone}</a></span></p>
                <div className="tab-card-footer">
                  <button className='tab-btn tab-btn-delete' onClick={() => handleDelete(adres.id, adres.adress_name)} >
                    <FaTrash />
                  </button>
                  <button className='tab-btn tab-btn-edit' onClick={() => handleEdit(adres.id)}>
                    <FaEdit />
                  </button>
                </div>
              </div>
            ))
        }
      </div>
    </div >
  )
}

export default MyAdreses