import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
    book_name: yup
        .string()
        .required("Kitap adı kısmı boş bırakılamaz!"),
    writer_name: yup
        .string()
        .required("Yazar adı kısmı boş bırakılamaz!"),
    publishing_house: yup
        .string()
        .required("Yayın evi kısmı boş bırakılamaz!"),
    page_count: yup
        .number("Kitap sayfa sayısı bir sayı olmalı!")
        .integer("Kitap sayfa sayısı bir tam sayı olmalı!")
        .required("Kitap sayfa sayısı boş bırakılamaz!")
        .positive("Kitap sayfa sayısı bir pozitif sayı olmalı!"),
    price: yup
        .number("Kitap fiyatı bir sayı olmalı!")
        .required("Kitap fiyatı boş bırakılamaz!")
        .positive("Kitap fiyatı bir tam sayı olmalı!")
        .integer("Kitap fiyatı bir tam sayı olmalı!"),
    book_desc: yup
        .string()
        .required("Kitap açıklama kısmı boş bırakılamaz!"),
    book_image: yup
        .mixed()
        .required("Kitap görseli seçmek zorunludur!")
        .test("fileType", "Yalnızca .jpg, .png, .jpeg ve .webp formatları desteklenir.", (value) => {
            return !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type))
        })
})