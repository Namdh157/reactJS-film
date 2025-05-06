import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import genreReducer from "./genreSlice";
import countriesReducer from "./countrySlice";
import modalReducer from "./modalSlice";
import showFooterReducer from "./showFooterSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        genres: genreReducer,
        countries: countriesReducer,
        modal: modalReducer,
        showFooter: showFooterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;