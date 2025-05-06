import { createSlice } from "@reduxjs/toolkit";
import { getCountries } from "../services/countryService";

interface countryState {
    countries: {
        _id: string,
        name: string,
        slug: string,
    }[],
    loading: boolean,
    error: string,
}

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        countries: [],
        loading: false,
        error: '',
    } as countryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(getCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Lỗi khi tải dữ liệu';
            });
    }
});

export default countrySlice.reducer;