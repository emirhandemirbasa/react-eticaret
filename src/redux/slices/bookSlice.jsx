import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    books: [],
    selectedBook: {}
}

const BASE_URL = "http://localhost/react-eticaret/api";

export const createBook = createAsyncThunk("eticaret/createBook", async (formData) => {
    await axios.post(`${BASE_URL}/createProducts.php`, formData);
})

export const getBooks = createAsyncThunk("eticaret/getBooks", async () => {
    let response = await axios.get(`${BASE_URL}/getProducts.php`);
    return response.data.veriler
})

export const searchBooks = createAsyncThunk("eticaret/searchBooks", async (query) => {
    const response = await axios.get(`${BASE_URL}/getProducts.php?q=${encodeURIComponent(query)}`);
    console.log(response.data);
    return response.data.veriler;
})

export const getBookById = createAsyncThunk("eticaret/getBookById", async (id) => {
    let response = await axios.get(`${BASE_URL}/getBookById.php/${id}`);
    return response.data.veriler[0];
})

export const bookSlice = createSlice({
    name: "book",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(createBook.fulfilled, (state) => {

        })
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        })
        builder.addCase(getBookById.fulfilled, (state, action) => {
            state.selectedBook = action.payload;
        })
        builder.addCase(searchBooks.fulfilled, (state, action) => {
            state.books = action.payload;
        })
    }
});

export const { } = bookSlice.actions;
export default bookSlice.reducer;