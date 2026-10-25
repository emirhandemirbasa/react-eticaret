import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    drawer: false,
    session: JSON.parse(localStorage.getItem("session")) || {},
    theme: false
}

export const userLogin = createAsyncThunk("eticaret/login", async (action) => {
    const { email, password } = action;
    let response = await axios.post("http://localhost/react-eticaret/api/login.php", {
        email: email,
        password: password
    });
    return response.data;
});

export const loginControl = createAsyncThunk("eticaret/loginControl", async () => {
    const response = await axios.post("http://localhost/react-eticaret/api/loginControl.php");
    return response.data;
});

export const deleteAccount = createAsyncThunk("eticaret/deleteAccount", async () => {
    const response = await axios.put("http://localhost/react-eticaret/api/deleteAccount.php");
    console.log(response.data);
    return response.data;
})

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setDrawer: (state) => {
            state.drawer = !state.drawer
        },
        logout: (state) => {
            state.session = {};
            localStorage.removeItem("session");
        },
        setTheme: (state) => {
            const darkMode = document.body.classList;
            if (darkMode.contains("dark-mode")) {
                darkMode.remove("dark-mode");
            }
            else {
                darkMode.add("dark-mode");
            }
            console.log(darkMode);
            state.theme = !state.theme;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.session = action.payload.data;
            localStorage.setItem("session", JSON.stringify(action.payload.data));
        })
    }
});

export const { setDrawer, logout, setTheme } = appSlice.actions;
export default appSlice.reducer;