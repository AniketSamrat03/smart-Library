import { configureStore } from "@reduxjs/toolkit";
import  bookFormReducer  from "./bookFormSlice";

export const store = configureStore({
    reducer:{
        bookForm :bookFormReducer

    },
})