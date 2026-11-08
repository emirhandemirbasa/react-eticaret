import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice';
import { useFormik } from 'formik';
import { createAdressSchema } from '../../schemas/createAdressSchema';
import { IoWarningOutline } from 'react-icons/io5';
import '../../css/modal.css'
import { getAdressById, getAllMyAdress, updateAdressById } from '../../redux/slices/adressSlice';
import { createToasty } from '../../redux/slices/toastySlice';

function EditModal() {
    const dispatch = useDispatch();
    const { modalProps } = useSelector(store => store.modal);
    const { selectedAdress } = useSelector(store => store.adress);
    useEffect(() => {
        const getEditAdressById = async () => {
            const response = await dispatch(getAdressById(modalProps.id));
            if (response.payload.success == false) {
                dispatch(createToasty({
                    mesaj: response.payload.message,
                    tip: "hata"
                }));
            }
        }
        getEditAdressById();
    }, []);

    const { errors, values, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: {
            adres_ad_soyad: selectedAdress.adress_ad_soyad,
            adres_adi: selectedAdress.adress_name,
            sehir_adi: selectedAdress.city,
            ilce_adi: selectedAdress.district,
            adres_detay: selectedAdress.adress_detail,
            adres_telefon: selectedAdress.adress_phone
        },
        enableReinitialize: true,
        validationSchema: createAdressSchema,
        onSubmit: async () => {
            try {
                const response = await dispatch(updateAdressById({
                    id: selectedAdress.id,
                    adres_ad_soyad: values.adres_ad_soyad,
                    adres_adi: values.adres_adi,
                    sehir_adi: values.sehir_adi,
                    ilce_adi: values.ilce_adi,
                    adres_detay: values.adres_detay,
                    adres_telefon: values.adres_telefon
                }));
                const { message, success } = response.payload;
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
                }
            } catch (error) {
                dispatch(createToasty({
                    mesaj: error.message,
                    tip: "hata"
                }))
            } finally {
                dispatch(closeModal());
                dispatch(getAllMyAdress());
            }
        }
    });

    return (
        <div>
            <div className="modal-body">
                <form onSubmit={handleSubmit} className='form'>
                    <div className="form-control">
                        <label htmlFor="adres_ad_soyad">Ad Soyad</label>
                        <input type="text" name="adres_ad_soyad" id="adres_ad_soyad" className='input-text' value={values.adres_ad_soyad} onChange={handleChange} />
                        {
                            errors.adres_ad_soyad && <div class="input-error"><IoWarningOutline />{errors.adres_ad_soyad}</div>
                        }
                    </div>

                    <div className="form-control">
                        <label htmlFor="adres_adi">Adres Başlığı</label>
                        <input type="text" name="adres_adi" id="adres_adi" className='input-text' value={values.adres_adi} onChange={handleChange} />
                        {
                            errors.adres_adi && <div className="input-error"><IoWarningOutline />{errors.adres_adi}</div>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="sehir_adi">Şehir</label>
                        <input type="text" name="sehir_adi" id="sehir_adi" className='input-text' value={values.sehir_adi} onChange={handleChange} />
                        {
                            errors.sehir_adi && <div className="input-error"><IoWarningOutline />{errors.sehir_adi}</div>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="ilce_adi">İlçe</label>
                        <input type="text" name="ilce_adi" id="ilce_adi" className='input-text' value={values.ilce_adi} onChange={handleChange} />
                        {
                            errors.ilce_adi && <div className="input-error"><IoWarningOutline />{errors.ilce_adi}</div>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="adres_detay">Adres Detayları</label>
                        <textarea type="text" name="adres_detay" id="adres_detay" className='input-text' value={values.adres_detay} onChange={handleChange} ></textarea>
                        {
                            errors.adres_detay && <div className="input-error"><IoWarningOutline />{errors.adres_detay}</div>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="adres_telefon">Telefon Numarası</label>
                        <input type="number" name="adres_telefon" id="adres_telefon" className='input-text' value={values.adres_telefon} onChange={handleChange} />
                        {
                            errors.adres_telefon && <div className="input-error"><IoWarningOutline />{errors.adres_telefon}</div>
                        }
                    </div>
                    <div className="modal-footer">
                        <div className="buttons-flex">
                            <button className='btn btn-blue' type="submit">Adres Düzenle</button>
                            <button className='btn btn-red' onClick={() => dispatch(closeModal())}>Kapat</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal