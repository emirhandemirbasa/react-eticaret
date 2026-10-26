import * as yup from 'yup';
export const loginSchema = yup.object().shape({
    email: yup.string().required("Bu alan zorunludur.").email("Geçersiz bir email girdiniz."),
    password: yup.string().required("Bu alan zorunludur.")
})