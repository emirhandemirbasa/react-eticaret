import * as yup from 'yup';
export const createAdressSchema = yup.object().shape({
    adres_ad_soyad: yup
        .string()
        .required("Ad soyad alanı zorunludur."),
    adres_adi: yup
        .string()
        .required("Adres adı alanı zorunludur."),
    sehir_adi: yup
        .string()
        .required("Şehir adı kısmı zorunludur."),
    ilce_adi: yup
        .string()
        .required("İlçe adı zorunludur."),
    adres_detay: yup
        .string()
        .required("Adres detay zorunludur."),
    adres_telefon: yup
        .number("Sayısal bir bilgi giriniz!")
        .required("Adres'e ait telefon giriniz.")
});