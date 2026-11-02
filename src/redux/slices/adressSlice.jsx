import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    adress: [],
    selectedAdress: []
}

export const getAdressById = createAsyncThunk("eticaret/getAdressById", async (id) => {
    const response = await axios.get(`http://localhost/react-eticaret/api/getAdressById.php`, {
        params: {
            adress_id: id
        }
    });
    return response.data;
})

export const getAllMyAdress = createAsyncThunk("eticaret/getAllMyAdress", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost/react-eticaret/api/getAllMyAdress.php`);
        console.log(response.data);
        if (response.data.success === false) {
            return thunkAPI.rejectWithValue(response.data.message);
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || "Bir hata oluştu");
    }
})

export const createAdress = createAsyncThunk("eticaret/createAdress", async (data) => {
    const response = await axios.post(`http://localhost/react-eticaret/api/createAdress.php`, data);
    return response.data;
})

export const deleteAdressById = createAsyncThunk("eticaret/deleteAdressById", async (id, thunkAPI) => {
    try {
        const response = await axios.delete("http://localhost/react-eticaret/api/deleteAdress.php", {
            params: {
                id: id
            }
        })
        if (response.data.success == false) {
            return thunkAPI.rejectWithValue(response.data.message);
        }
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Bir hata oluştu.");
    }
})

export const updateAdressById = createAsyncThunk("eticaret/updateAdressById", async (_, thunkAPI) => {
    const response = await axios.put("http://localhost/react-eticaret/api/updateAdressById.php", _);
    return response.data;
})

export const adressSlice = createSlice({
    name: "adress",
    initialState: initialState,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(getAdressById.fulfilled, (state, action) => {
            state.selectedAdress = action.payload.data[0];
        })
        builder.addCase(getAllMyAdress.fulfilled, (state, action) => {
            state.adress = action.payload.data;
        })
    }
});

export const { } = adressSlice.actions;
export default adressSlice.reducer;