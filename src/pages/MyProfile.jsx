import React, { useEffect, useState } from 'react'
import '../css/tab-section.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountDetails, updateAccountDetails } from '../redux/slices/accountDetail';
import { createToasty } from '../redux/slices/toastySlice';
import { useFormik } from 'formik';
import { createPorfileSchema } from '../schemas/createProfileSchema';
import { IoWarningOutline } from 'react-icons/io5';
function MyProfile() {
  const dispatch = useDispatch();
  const { details } = useSelector(store => store.accountDetail);
  const { name, surname, phone, email } = details;
  useEffect(() => {
    const getAccountDetailsEffect = async () => {
      try {
        await dispatch(getAccountDetails()).unwrap();
      } catch (error) {
        console.log("hata", error);
        dispatch(createToasty({
          mesaj: error || "problem",
          tip: "hata"
        }))
      }
    }
    getAccountDetailsEffect();
  }, []);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      ad: name,
      soyad: surname,
      telefon: phone,
      email: email
    },
    validationSchema: createPorfileSchema,
    onSubmit: async () => {
      handleUpdateProfile(values);
    }
  });

  const handleUpdateProfile = async (values) => {
    try {
      const resultAction = await dispatch(updateAccountDetails({
        ad: values.ad,
        soyad: values.soyad,
        telefon: values.telefon,
        email: values.email
      }));

      if (updateAccountDetails.fulfilled.match(resultAction)) {
        const { message, success } = resultAction.payload;
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
        }
      }

    } catch (error) {
      dispatch(createToasty({
        mesaj: error,
        tip: "hata"
      }))
    }
  }
  return (
    <div className='tab-section'>
      <div className="tab-section-title">Profil</div>
      <div className="tab-section-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className="flex-row">
            <div className="form-control">
              <label htmlFor="ad">Adı</label>
              <input type="text" name="ad" id="ad" className='input-text' value={values.ad} onChange={handleChange} />
              {
                errors.ad && <div className="input-error"><IoWarningOutline />{errors.ad}</div>
              }
            </div>
            <div className="form-control">
              <label htmlFor="soyad">Soyadı</label>
              <input type="text" name="soyad" id="soyad" className='input-text' value={values.soyad} onChange={handleChange} />
              {
                errors.soyad && <div className="input-error"><IoWarningOutline />{errors.soyad}</div>
              }
            </div>
          </div>
          <div className="flex-row">
            <div className="form-control">
              <label htmlFor="telefon">Telefon</label>
              <input type="text" name="telefon" id="telefon" className='input-text' value={values.telefon} onChange={handleChange} />
              {
                errors.telefon && <div className="input-error"><IoWarningOutline />{errors.telefon}</div>
              }
            </div>
            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <input type="text" name="email" id="email" className='input-text' disabled value={values.email} onChange={handleChange} />
              {
                errors.email && <div className="input-error"><IoWarningOutline />{errors.email}</div>
              }
            </div>
          </div>
          <button type="submit" className='btn btn-blue'>Bilgileri Kaydet</button>
        </form>
      </div>
    </div>
  )
}

export default MyProfile