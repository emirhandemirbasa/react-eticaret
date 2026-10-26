import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import { AiOutlineLogin } from "react-icons/ai";
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createToasty } from '../redux/slices/toastySlice';
import { userLogin } from '../redux/slices/appSlice';
import { loginSchema } from '../schemas/loginSchema';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async () => {
            try {
                const { message, success, data } = await dispatch(userLogin({ email: values.email, password: values.password })).unwrap();
                if (success == false) {
                    dispatch(createToasty({
                        "mesaj": message,
                        "tip": "hata"
                    }));
                } else {
                    dispatch(createToasty({
                        "mesaj": message,
                        "tip": "basari"
                    }));
                    navigate("/");
                    resetForm();
                }
            } catch (error) {
                dispatch(createToasty({
                    "mesaj": error,
                    "tip": "hata"
                }));
            }
        }
    })
    return (
        <div className='login-box'>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className='auth-title-div'>
                    <div className='icon-bg'>
                        <AiOutlineLogin className='auth-icon' />
                    </div>
                    <p className='auth-title'>GİRİŞ</p>
                </div>

                <div className="form-control">
                    <label>E-posta</label>
                    <input type="text" className='auth-input' placeholder="E-posta adresinizi girin" name="email" id="email" onChange={handleChange} />
                    {errors.email && <div className='input-error'>{errors.email}</div>}
                </div>

                <div className="form-control">
                    <label>Şifre</label>
                    <input type="password" className='auth-input' placeholder="••••••••" name="password" id="password" onChange={handleChange} />
                    {errors.password && <div className='input-error'>{errors.password}</div>}
                </div>

                <div className="remember-forgot">
                    <label className="remember-me">
                        <input type="checkbox" /> Beni Hatırla
                    </label>
                </div>

                <div className="form-control" style={{ marginTop: '4px' }}>
                    <button className="signin-btns" type="submit">Giriş Yap</button>
                </div>

                <div className="auth-footer">
                    Bir hesabınız yok mu? <Link to={"/kayit"}>Kayıt Olun</Link>
                </div>
            </form>
        </div >
    )
}

export default Login;