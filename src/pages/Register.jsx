import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import { SiGnuprivacyguard } from "react-icons/si";
import { useFormik } from 'formik';
import { registerSchema } from '../schemas/registerSchema';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createToasty } from '../redux/slices/toastySlice';


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errors, handleSubmit, handleReset, values, handleChange } = useFormik({
        initialValues: {
            ad: "",
            soyad: "",
            email: "",
            password: "",
            repassword: ""
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            createAccount();
            handleReset()
        }
    })

    const createAccount = async () => {
        const formData = new FormData();
        formData.append("ad", values.ad);
        formData.append("soyad", values.soyad);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("repassword", values.repassword);
        let response = await axios.post(`http://localhost/react-eticaret/api/createAccount.php`, formData)
        const { message, success } = response.data;
        console.log(message, success);
        if (success == true) {
            navigate("/giris");
            dispatch(createToasty({
                mesaj: message,
                tip: "basari"
            }));
        } else {
            dispatch(createToasty({
                mesaj: message,
                tip: "hata"
            }));
        }
    }
    return (
        <div className='login-box'>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className='auth-title-div'>
                    <div className='icon-bg'>
                        <SiGnuprivacyguard className='auth-icon' />
                    </div>
                    <p className='auth-title'>KAYIT</p>
                </div>
                <div className="form-control">
                    <label>Ad</label>
                    <input type="text" id="ad" name="ad" className='auth-input' placeholder="Adınızı girin" value={values.ad} onChange={handleChange} />
                    {errors.ad && <div className='input-error'>{errors.ad}</div>}
                </div>
                <div className="form-control">
                    <label>E-posta</label>
                    <input type="text" id="soyad" name="soyad" className='auth-input' placeholder="Soyadınızı girin" value={values.soyad} onChange={handleChange} />
                    {errors.soyad && <div className='input-error'>{errors.soyad}</div>}
                </div>
                <div className="form-control">
                    <label>E-posta</label>
                    <input type="email" id="email" name="email" className='auth-input' placeholder="E-posta adresinizi girin" value={values.email} onChange={handleChange} />
                    {errors.email && <div className='input-error'>{errors.email}</div>}
                </div>

                <div className="form-control">
                    <label>Şifre</label>
                    <input type="password" id="password" name="password" className='auth-input' placeholder="••••••••" value={values.password} onChange={handleChange} />
                    {errors.password && <div className='input-error'>{errors.password}</div>}
                </div>
                <div className="form-control">
                    <label>Şifre Tekrar</label>
                    <input type="password" id="repasword" name="repassword" className='auth-input' placeholder="••••••••" value={values.repassword} onChange={handleChange} />
                    {errors.repassword && <div className='input-error'>{errors.repassword}</div>}
                </div>

                <div className="form-control" style={{ marginTop: '4px' }}>
                    <button className="signin-btns" type="submit">Kayıt Ol</button>
                </div>

                <div className="auth-footer">
                    Bir hesabınız var mı? <Link to={"/giris"}>Giriş Yapın</Link>
                </div>
            </form>
        </div>
    )
}

export default Register;