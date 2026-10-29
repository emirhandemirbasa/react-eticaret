import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchBooks } from '../redux/slices/bookSlice';
import { useSearchParams } from 'react-router-dom';
import Product from './Product';

function ProductSearch() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { books } = useSelector(store => store.book);
    useEffect(() => {
        if (query) {
            dispatch(searchBooks(query));
        }
    }, [query]);
    return (
        <div className="products" style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", textAlign: "start", width: "100vw" }}>
                <h2>"{query}" için arama sonuçları:</h2>
                {
                    books && books.length != 0 ?
                        <p>{books.length} tane sonuç bulundu</p> : <p style={{ color: "red" }}>Aradığınız kriterlere uygun ürün listelenemedi!</p>
                }
            </div>
            {
                books && books.length != 0 ? (
                    books.map((product) => (
                        <Product product={product} key={product.id} />
                    )))
                    : ""
            }

        </div >
    )
}

export default ProductSearch