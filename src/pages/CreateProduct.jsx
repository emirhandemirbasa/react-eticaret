import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import '../css/form-style.css'
import { createBook } from '../redux/slices/bookSlice';
import { ErrorMessage, useFormik } from 'formik';
import { createToasty } from '../redux/slices/toastySlice';
import { createProductSchema } from '../schemas/createProductSchema'
import { IoWarningOutline } from "react-icons/io5";


function CreateProduct() {
    const dispath = useDispatch();
    const { values, errors, setFieldValue, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            book_name: "",
            writer_name: "",
            publishing_house: "",
            page_count: "",
            price: "",
            book_desc: "",
            book_image: null,
        },
        validationSchema: createProductSchema,
        onSubmit: () => {
            const formData = new FormData();
            formData.append("book_name", values.book_name);
            formData.append("writer_name", values.writer_name);
            formData.append("publishing_house", values.publishing_house);
            formData.append("page_count", values.page_count);
            formData.append("price", values.price);
            formData.append("book_desc", values.book_desc);
            formData.append("book_image", values.book_image);
            dispath(createBook(formData));
            dispath(createToasty("Kitap başarıyla eklendi"));
            resetForm();
        }
    });


    //formik.handleSubmit içerisinde preventDefault bulundurur ve sayfa yenilenmez.
    //image için onChange((event)=>{formik.setFieldValue("book_image", event.currentTarget.files[0])})
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='form'>
            <div className="form-control">
                <label htmlFor="">Resim seç</label>
                <div className="image-box" onClick={() => document.getElementById("book_image").click()}>
                    <input type="file" id="book_image" name="book_image" style={{ display: "none" }} onChange={(event) => { setFieldValue("book_image", event.target.files[0]) }} />
                    <span>Resim seçmek için tıklayın</span>
                </div>
                {
                    errors.book_image && <div class="input-error"><IoWarningOutline />{errors.book_image}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="book_name">Kitap Adı</label>
                <input type="text" id="book_name" name="book_name" placeholder='Kitap ismi girin...' className="input-text" value={values.book_name} onChange={handleChange} />
                {
                    errors.book_name && <div class="input-error"><IoWarningOutline />{errors.book_name}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="writer_name">Yazar Adı</label>
                <input type="text" id="writer_name" name="writer_name" placeholder='Yazar adı girin...' className="input-text" value={values.writer_name} onChange={handleChange} />
                {
                    errors.writer_name && <div class="input-error"><IoWarningOutline />{errors.writer_name}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="publishing_house">Yayın Evi Adı</label>
                <input type="text" id="publishing_house" name="publishing_house" placeholder='Yayın evi adı girin...' className="input-text" value={values.publishing_house} onChange={handleChange} />
                {
                    errors.publishing_house && <div class="input-error"><IoWarningOutline />{errors.publishing_house}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="page_count">Sayfa Sayısı</label>
                <input type="number" id="page_count" name="page_count" placeholder='Sayfa sayısı girin...' className="input-text" value={values.page_count} onChange={handleChange} />
                {
                    errors.page_count && <div class="input-error"><IoWarningOutline />{errors.page_count}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="price">Kitap Fiyatı</label>
                <input type="number" id="price" name="price" placeholder='Kitap fiyatı girin...' className="input-text" value={values.price} onChange={handleChange} />
                {
                    errors.price && <div class="input-error"><IoWarningOutline />{errors.price}</div>
                }
            </div>
            <div className="form-control">
                <label htmlFor="book_desc">Kitap açıklaması</label>
                <textarea name="book_desc" id="book_desc" className='input-text' value={values.book_desc} onChange={handleChange}></textarea>
                {
                    errors.book_desc && <div class="input-error"><IoWarningOutline />{errors.book_desc}</div>
                }
            </div>
            <button type="submit" className='btn btn-green'>Kitap Ekle</button>
        </form>
    )
}

export default CreateProduct