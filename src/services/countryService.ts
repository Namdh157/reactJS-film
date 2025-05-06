import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./apiService";
import { CountryParams } from "../Types/countryTypes.";

const getCountries = createAsyncThunk('countries/getCountries', async () => {
    try {
       const response = await axiosInstance.get('/quoc-gia');
       return response.data;
    }
    catch (error) {
        console.error('Lấy danh sách quốc gia thất bại', error);
        throw error;
    }
});

const getCountriesDetail = async (params: CountryParams ) => {
    try {
        const { type_list, ...queryParams } = params;
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([__, value]) => value !== undefined)
        );
        const response = await axiosInstance.get(`/v1/api/quoc-gia/${type_list}`, {
            params: filteredParams,
        });

        return response.data;
    } catch (error) {
        console.error('Lấy chi tiết quốc gia thất bại', error);
        throw error;
    }
}

export { getCountries, getCountriesDetail };