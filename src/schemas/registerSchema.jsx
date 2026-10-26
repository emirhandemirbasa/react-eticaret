import * as yup from 'yup'
export const registerSchema = yup.object().shape({
    ad: yup.string()
        .required("Ad kısmı boş bırakılamaz!"),
    soyad: yup.string()
        .required("Soyad kısmı boş bırakılamaz!"),
    email: yup.string()
        .required("Email kısmı boş bırakılamaz!")
        .email("Geçersiz email adresi!"),
    password: yup.string()
        .required("Şifre alanı zorunludur!")
        .max(16, "Şifreniz maksimum 16 karakter olabilir.")
        .min(8, "Şifreniz minimum 8 karakterden oluşabilir."),
    repassword: yup.string()
        .required("Şifre alanı zorunludur!")
        .oneOf([yup.ref("password")], "Şifreleriniz eşleşmiyor!"),
})