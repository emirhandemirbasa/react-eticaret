import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    favorite: []
}

export const getFavoriteProductDetails = createAsyncThunk("eticaret/getFavoriteProductDetails", async () => {
    const response = await axios.get("http://localhost/react-eticaret/api/getFavoriteProductDetails.php");
    return response.data
});

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getFavoriteProductDetails.fulfilled, (state, action) => {
            state.favorite = action.payload.data;
        })
    }
})

export const { } = dashboardSlice.actions;
export default dashboardSlice.reducer;