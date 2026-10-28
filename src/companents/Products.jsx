import React, { useEffect, useState } from 'react'
import Product from './Product'
import '../css/product.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../redux/slices/bookSlice';
import { Pagination, Stack } from '@mui/material';


function Products() {
    const { books } = useSelector((state) => state.book);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const booksPerPage = 8;

    useEffect(() => {
        const getUrunler = async () => {
            const response = await dispatch(getBooks());
        }
        getUrunler();
    }, [])

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const count = Math.ceil(books.length / booksPerPage);
    const startIndex = (page - 1) * booksPerPage;
    const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);
    return (
        <div>
            <div className="products">
                {
                    displayedBooks.map((product) => (
                        <Product product={product} key={product.id} />
                    ))
                }

            </div>
            {
                count > 1 && (
                    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
                        <Pagination
                            count={count}
                            page={page}
                            onChange={handlePageChange}
                            shape='rounded'
                            size='large'
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    color: 'var(--primary-text-color)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover efekti
                                    },
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#6c5ce7 !important',
                                    color: '#ffffff !important',
                                    '&:hover': {
                                        backgroundColor: '#5849be !important',
                                    },
                                },
                            }}
                        />
                    </Stack>

                )
            }
        </div >
    )
}

export default Products;