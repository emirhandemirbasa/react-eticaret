import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getBookById } from '../redux/slices/bookSlice';
import '../css/product-details.css'
import { addBasket } from '../redux/slices/basketSlice';
import { createToasty } from '../redux/slices/toastySlice';

function BookDetails() {
    const { selectedBook } = useSelector((store) => store.book);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookById(params.id));
    }, [dispatch, params.id]);

    const {
        id, book_name, writer_name, page_count, publishing_house, book_desc, price, book_image
    } = selectedBook;

    const addToBasket = () => {
        const book = {
            id,
            book_name,
            writer_name,
            price,
            book_image,
            count: 1
        }
        console.log(price);
        dispatch(addBasket(book));
        dispatch(createToasty({
            mesaj: `${book_name} adlı ürün sepete eklendi!`,
            tip: "basari"
        }));
    }
    return (
        <div className='book-details'>
            <div className="book-detail-section">
                <div className='book-detail-first-section'>
                    <div className='book-detail-image'>
                        <img src={`http://localhost/react-eticaret/images/` + book_image} alt={book_name} />
                    </div>
                </div>
                <div className='book-detail-second-section'>
                    <p className='book-detail-book-name'>{book_name}</p>
                    <p className='book-detail-writer-name'><b>Yazar:</b> {writer_name}</p>
                    <p className='book-detail-book-price'>{price} TL</p>
                    <p className='book-detail-book-page-count'><b>Sayfa Sayısı:</b> {page_count}</p>
                    <p className='book-detail-book-publishing-house'><b>Yayınevi:</b> {publishing_house}</p>

                    <button className='add-basket-btn' onClick={() => addToBasket()}>
                        Sepete Ekle
                    </button>
                </div>
            </div>
            <div className='book-detail-three-section'>
                <h2>Kitap Hakkında</h2>
                <p className='book-description-text'>{book_desc}</p>
            </div>
        </div>
    )
}

export default BookDetails