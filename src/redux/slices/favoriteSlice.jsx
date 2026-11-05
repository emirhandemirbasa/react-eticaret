import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    favorites: []
}

export const addFavorite = createAsyncThunk("eticaret/addFavorite", async (formData) => {
    const response = await axios.post("http://localhost/react-eticaret/api/addFavorite.php", formData);
    return response.data;
})

export const removeFavorite = createAsyncThunk("eticaret/removeFavorite", async (id) => {
    const response = await axios.delete("http://localhost/react-eticaret/api/removeFavorite.php", {
        params: {
            product_id: id
        }
    });
    return response.data;
});

export const getMyFavoriteProducts = createAsyncThunk("eticaret/getMyFavoriteProducts", async () => {
    const response = await axios.get("http://localhost/react-eticaret/api/getMyFavoriteProducts.php");
    return response.data;
})


export const isProductMyFavoriteList = createAsyncThunk("eticaret/isProductMyFavoriteList", async (id) => {
    const response = await axios.get("http://localhost/react-eticaret/api/isProductMyFavoriteList.php", {
        params: {
            id: id
        }
    });
    return response.data;
});

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMyFavoriteProducts.fulfilled, (state, action) => {
            state.favorites = action.payload.data;
        })
    }
});

export const { } = favoriteSlice.actions;
export default favoriteSlice.reducer;