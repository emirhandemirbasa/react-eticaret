import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

export const loadingSlice = createSlice({
    name: "loading",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher((action) => action.type.endsWith('/pending'), (state) => {
            state.isLoading = true;
        }).addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
            state.isLoading = false;
        }).addMatcher((action) => action.type.endsWith('/redejted'), (state) => {
            state.isLoading = false;
        })
    }
});

export const { } = loadingSlice.actions;
export default loadingSlice.reducer;