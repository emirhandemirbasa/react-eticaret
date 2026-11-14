import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice";
import toastySlice from "./slices/toastySlice";
import appSlice from "./slices/appSlice";
import basketSlice from "./slices/basketSlice";
import adressSlice from "./slices/adressSlice";
import orderSlice from "./slices/orderSlice";
import loadingSlice from "./slices/loadingSlice";
import modalSlice from "./slices/modalSlice";
import accountDetail from "./slices/accountDetail";
import favoriteSlice from "./slices/favoriteSlice";
import dashboardSlice from "./admin/dashboardSlice";

export const store = configureStore({
    reducer: {
        book: bookSlice,
        toasty: toastySlice,
        app: appSlice,
        basket: basketSlice,
        adress: adressSlice,
        order: orderSlice,
        loading: loadingSlice,
        modal: modalSlice,
        accountDetail: accountDetail,
        favorite: favoriteSlice,
        dashboard: dashboardSlice
    }
})