import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    orders: [],
}

export const addOrder = createAsyncThunk("eticaret/addOrder", async (order) => {
    const { state, products, adress_id } = order;
    const formData = new FormData();
    formData.append("state", state);
    formData.append("products", JSON.stringify(products));
    formData.append("adress_id", adress_id);
    const response = await axios.post("http://localhost/react-eticaret/api/createOrder.php", formData);
});

export const getOrdersById = createAsyncThunk("eticaret/getOrdersById", async () => {
    const response = await axios.get("http://localhost/react-eticaret/api/getOrdersById.php");
    return response.data;
});


export const cancelOrderById = createAsyncThunk("eticaret/cancelOrderById", async (_, thunkAPI) => {
    try {
        const response = await axios.put("http://localhost/react-eticaret/api/cancelProduct.php", {
            id: _
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOrdersById.fulfilled, (state, action) => {
            state.orders = action.payload.data;
            console.log(action.payload);
        })
    }
});

export const { } = orderSlice.actions;
export default orderSlice.reducer;