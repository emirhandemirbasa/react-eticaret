import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState = {
}

export const toastySlice = createSlice({
    name: "toasty",
    initialState: initialState,
    reducers: {
        createToasty: (state, action) => {
            const { mesaj, tip } = action.payload;
            if (tip == "basari") {
                toast.success(mesaj);
            } else if (tip == "hata") {
                toast.error(mesaj);
            }
            else if (tip == "bilgi") {
                toast.info(mesaj);
            } else {
                toast.warning(mesaj);
            }
        }
    }
});

export const { createToasty } = toastySlice.actions;
export default toastySlice.reducer;