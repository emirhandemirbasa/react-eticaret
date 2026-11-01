import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/MyBasket.css';
import { clearBaskets, decrementProduct, incrementProduct } from '../redux/slices/basketSlice';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaTrashAlt, FaShoppingBag } from 'react-icons/fa'; // İsteğe bağlı ikonlar

function MyBasket() {
  const { baskets } = useSelector(store => store.basket);
  const dispatch = useDispatch();

  const totalAmount = baskets.reduce((acc, item) => acc + (item.price * item.count), 0);

  const handleClearBasket = () => {
    dispatch(clearBaskets());
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">

        {/* Sol Taraf: Sepet Ürünleri */}
        <div className="basket-section">
          {baskets && baskets.length > 0 && (
            <div className="basket-header-action">
              <button className='clear-basket' onClick={handleClearBasket}>
                <FaTrashAlt /> Sepeti Boşalt
              </button>
            </div>
          )}

          <div className="product-list">
            {baskets.length === 0 ? (
              <div className="empty-basket">
                <FaShoppingBag className="empty-icon" />
                <p>Alışveriş sepetiniz boş.</p>
                <span>Biraz dolaşmaya ne dersiniz?</span>
                <Link to="/" className="start-shopping-btn">Alışverişe Başla</Link>
              </div>
            ) : (
              baskets.map((basket) => (
                <div className="product-item" key={basket.id}>
                  <div className='product-img-container'>
                    <div className="product-img">
                      <img src={`http://localhost/react-eticaret/images/${basket.book_image}`} alt={basket.book_name} />
                    </div>
                    <div className='product-buttons'>
                      <button className='qty-btn' onClick={() => dispatch(decrementProduct(basket.id))}>-</button>
                      <span className='qty-value'>{basket.count}</span>
                      <button className='qty-btn' onClick={() => dispatch(incrementProduct(basket.id))}>+</button>
                    </div>
                  </div>

                  <div className="product-details">
                    <div className="product-info">
                      <p className="product-name">{basket.book_name}</p>
                      <p className="product-writer">{basket.writer_name}</p>
                    </div>
                    <div className='product-price'>
                      <p>{(basket.price * basket.count).toFixed(2)} TL</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {baskets.length > 0 && (
          <div className="order-summary-card">
            <h3>Sipariş Özeti</h3>
            <div className="summary-row">
              <span>Ürünler Toplamı</span>
              <span>{totalAmount.toFixed(2)} TL</span>
            </div>
            <div className="summary-row">
              <span>Kargo</span>
              <span className="free-cargo">Ücretsiz</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row total">
              <span>Toplam</span>
              <span className="total-price">{totalAmount.toFixed(2)} TL</span>
            </div>
            <Link to={"/siparistamamla"} className="complete-order-link">
              <button className="complete-order-btn">
                <span>Devam Et</span> <FaArrowRight />
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBasket;