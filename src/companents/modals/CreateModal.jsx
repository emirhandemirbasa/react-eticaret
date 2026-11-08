import { useFormik } from 'formik';
import React from 'react'
import { createAdressSchema } from '../../schemas/createAdressSchema';
import { useDispatch } from 'react-redux';
import { IoWarningOutline } from 'react-icons/io5';
import { createAdress, getAllMyAdress } from '../../redux/slices/adressSlice';
import { createToasty } from '../../redux/slices/toastySlice';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../redux/slices/modalSlice';

function CreateModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, errors, handleReset, handleChange, handleSubmit } = useFormik({
        initialValues: {
            adres_ad_soyad: "",
            adres_adi: "",
            sehir_adi: "",
            ilce_adi: "",
            adres_detay: "",
            adres_telefon: ""
        },
        validationSchema: createAdressSchema,
        onSubmit: async () => {
            const formData = new FormData();
            formData.append("adres_ad_soyad", values.adres_ad_soyad);
            formData.append("adres_adi", values.adres_adi);
            formData.append("sehir_adi", values.sehir_adi);
            formData.append("ilce_adi", values.ilce_adi);
            formData.append("adres_detay", values.adres_detay);
            formData.append("adres_telefon", values.adres_telefon);
            try {
                const actionResult = await dispatch(createAdress(formData));
                if (createAdress.fulfilled.match(actionResult)) {
                    const { success, message } = actionResult.payload;

                    if (success === false) {
                        dispatch(createToasty({ "mesaj": message, "tip": "hata" }));
                        navigate("/");
                    } else {
                        dispatch(createToasty({ "mesaj": message, "tip": "basari" }));
                        await dispatch(getAllMyAdress());
                    }
                }
            } catch (error) {
                console.error("Kayıt ekleme hatası:", error);
            } finally {
                handleReset();
                dispatch(closeModal());
            }
        }
    },
    )
    return (
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
            <div className='modal-footer'>
                <div className="buttons-flex">
                    <button className='btn btn-green' type="submit">Adres Ekle</button>
                    <button className='btn btn-red' onClick={() => dispatch(closeModal())}>Kapat</button>
                </div>
            </div>
        </form>
    )
}

export default CreateModal