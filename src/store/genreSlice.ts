import { createSlice } from "@reduxjs/toolkit";
import { getGenres } from "../services/genreService";

interface genreState {
    genres: {
        _id: string,
        name: string,
        slug: string,
    }[],
    loading: boolean,
    error: string,
}

const genreSlice = createSlice({
    name: 'genre',
    initialState: {
        genres: [],
        loading: false,
        error: '',
    } as genreState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Lỗi khi tải dữ liệu';
            });
    }

});

export default genreSlice.reducer;