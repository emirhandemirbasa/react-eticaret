import React from 'react'
import '../css/footer.css'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <footer>
            <div className="footer-main">
                <div className="site-title">
                    <Link to="/" className='link'><p className="footer-brand">Empi's Books<br /><span>"Kitap kokulu dünyanız"</span></p></Link>
                </div>
                <div className="footer-section">
                    <div className="footer-section-brand">
                        Kurumsal
                    </div>
                    <ul>
                        <li><Link to="/hakkimizda">Hakkımızda</Link></li>
                        <li><Link to="/hakkimizda">İnsan Kaynakları</Link></li>
                        <li><Link to="/sirketpolitikamiz">Şirket Politikamız</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <div className="footer-section-brand">
                        Kategoriler
                    </div>
                    <ul>
                        <li><Link to="/roman">Roman</Link></li>
                        <li><Link to="/hikaye">Hikaye</Link></li>
                        <li><Link to="/tarih">Tarih</Link></li>
                        <li><Link to="/sanat">Sanat</Link></li>
                        <li><Link to="/felsefe">Felsefe</Link></li>
                        <li><Link to="/dunyaklasikleri">Dünya Klasikleri</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <div className="footer-section-brand">
                        İletişim
                    </div>
                    <ul>
                        <li><a href="">0534 341 12 32</a></li>
                        <li>istiklal mahallesi ismet inönü caddesi no 123</li>
                        <li>Arnavutköy istanbul</li>
                    </ul>
                </div>
            </div>
            <hr color='#434343' />
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Empi's Books. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    )
}

export default Footer