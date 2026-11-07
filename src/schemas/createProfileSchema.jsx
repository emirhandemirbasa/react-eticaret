import * as yup from 'yup';

export const createPorfileSchema = yup.object().shape({
    ad: yup
        .string()
        .required("Boş bırakılamaz!")
        .max(25, "Adınız maksimum 25 karakterden oluşabilir."),
    soyad: yup
        .string()
        .required("Boş bırakılamaz!")
        .max(25, "Soyadınız maksimum 25 karakterden oluşabilir."),
    telefon: yup
        .string()
        .required("Bu alanın doldurulması zorunludur.")
        .max(11, "Telefon numaranız en fazla 11 karakterden oluşmalıdır."),
    email: yup
        .string()
        .required("Boş bırakılamaz!")
        .email("Hatalı email girdiniz!")
});