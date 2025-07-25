import { configureStore } from "@reduxjs/toolkit";
import CardReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: CardReducer,
    },
    devTools: true
});

export default store;