import { GenresParams } from "../Types/genreTypes";
import { MovieParams } from "../Types/movieTypes";
import axiosInstance from "./apiService";


const getMovies = async (page: number) => {
    try {
        const response = await axiosInstance.get(`/danh-sach/phim-moi-cap-nhat-v3?page=${page}`);
        return response.data;
    } catch (err) {
        console.error('Lấy danh sách phim thất bại', err);
        throw err;
    }
}

const getOptionsMovies = async (params: MovieParams) => {
    try {
        const { type_list, ...queryParams } = params;
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([__dirname, value]) => value !== undefined)
        );

        const response = await axiosInstance.get(`/danh-sach/phim-moi-cap-nhat-v3/${type_list}`, {
            params: filteredParams,
        });
        return response.data;
    } catch (err) {
        console.error('Lấy danh sách phim thất bại', err);
        throw err;
    }
}

const getMovieForGenre = async (params: GenresParams) => {
    try {
        const { type_list, ...queryParams } = params;
        const filteredParams = Object.fromEntries(
            Object.entries(queryParams).filter(([__, value]) => value !== undefined)
        );

        const response = await axiosInstance.get(`/v1/api/the-loai/${type_list}`,
            { params: filteredParams }
        );
        return response.data;
    } catch (error) {
        console.log("Lấy danh sách phim thất bại", error);
        throw error;
    }
}

const getMovieDetail = async (slug: string) => {
    try {
        const response = await axiosInstance.get(`/phim/${slug}`);
        return response.data;
    } catch (error) {
        console.log("Lấy thông tin phim thất bại", error);
        throw error;
    }
}

const searchMovies = async (query: string) => {
    try {
        const response = await axiosInstance.get(`/v1/api/tim-kiem`, {
            params: { keyword: query, page: 1, limit: 6 }
        });

        return response.data;
    } catch (error) {
        console.error('Lỗi khi tìm kiếm phim:', error);
        throw error;
    }
}

export { getMovies, getOptionsMovies, getMovieForGenre, getMovieDetail, searchMovies };