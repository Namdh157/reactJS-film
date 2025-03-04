import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenresParams } from "../Types/genreTypes";
import axiosInstance from "./apiService"

const getGenres = createAsyncThunk('genres/getGenres', async () => {
    try {
        const response = await axiosInstance.get('/the-loai');
        return response.data;
    } catch (error) {
        console.error('Lấy danh sách thể loại thất bại', error);
        throw error;
    }
});

const getGenresDetail = async (params: GenresParams) => {
    try {
        const { type_list, ...queryParams } = params;
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([__, value]) => value !== undefined)
        );
        const response = await axiosInstance.get(`/v1/api/the-loai/${type_list}`, {
            params: filteredParams,
        });

        return response.data;
    } catch (error) {
        console.error('Lấy chi tiết thể loại thất bại', error);
        throw error;
    }
}

export { getGenres, getGenresDetail };