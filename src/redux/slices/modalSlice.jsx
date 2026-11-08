import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    modalType: null,
    modalProps: {}
}

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.modalType = action.payload.modalType;
            state.modalProps = action.payload.modalProps;
            console.log("Çalıştı.", state.isOpen, action.payload.modalType);
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalType = null;
            state.modalProps = {};
        }
    }
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;