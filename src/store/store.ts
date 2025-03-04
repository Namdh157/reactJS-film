import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import genreReducer from "./genreSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        genres: genreReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;