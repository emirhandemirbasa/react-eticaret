import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
    details: []
};

export const getAccountDetails = createAsyncThunk("eticaret/getAccountDetails", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost/react-eticaret/api/getAccountDetails.php");
        if (response.data.success == false) {
            return thunkAPI.rejectWithValue(response.data.message);
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Bir hata oluştu");
    }

})

export const updateAccountDetails = createAsyncThunk("eticaret/updateAccountDetails", async (_, thunkAPI) => {
    try {
        console.log(_);
        const response = await axios.put("http://localhost/react-eticaret/api/updateProfile.php", _);
        if (response.data.success == false) {
            return thunkAPI.rejectWithValue(response.data.message);
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Hata var!");
    }
})

export const accountDetail = createSlice({
    name: "accountDetail",
    initialState: initalState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getAccountDetails.fulfilled, (state, action) => {
            state.details = action.payload.data;

        })
    }
});

export const { } = accountDetail.actions;
export default accountDetail.reducer;