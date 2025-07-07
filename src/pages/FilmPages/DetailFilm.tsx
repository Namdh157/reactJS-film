import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieDetail } from "../../Types/movieTypes";
import { getMovieDetail } from "../../services/movieService";
import { setLoading } from "../../store/loadingSlice";
import { useDispatch } from "react-redux";

const DetailFilm: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                dispatch(setLoading(true));
                if (name) {
                    const response = await getMovieDetail(name);
                    setMovie(response);
                    console.log(response);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu", error);
            } finally {
                dispatch(setLoading(false));
            }
        };
        console.log("Fetching movie details for:", movie);


        fetchMovie();
    }, [])


    return (
        <div className="relative bg-gradient-to-b from-[#181c2e] to-[#181c2e]/80 min-h-screen">
            {/* Banner */}
            <div
                className="w-full h-[350px] md:h-[420px] bg-cover bg-center flex items-end"
                style={{
                    backgroundImage: `url(${movie?.movie.poster_url || "https://phimimg.com/path-to-default-banner.jpg"})`,
                }}
            >
                <div className="w-full h-full bg-gradient-to-t from-[#181c2e] to-transparent absolute top-0 left-0"></div>
                <div className="relative z-10 flex items-end w-full max-w-6xl mx-auto px-6 pb-6">
                    {/* Poster */}
                    <img
                        src={`${movie?.movie.poster_url || "https://phimimg.com/path-to-default-poster.jpg"}`}
                        alt="Poster"
                        className="w-32 h-48 rounded-lg shadow-lg object-cover border-4 border-[#23263a] -mb-16"
                    />
                    {/* Info */}
                    <div className="ml-8 flex-1">
                        <h1 className="text-4xl font-bold text-white mb-2">{movie?.movie.name}</h1>
                        <div className="flex items-center space-x-3 mb-4">
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-2 rounded-full shadow transition">Xem Ngay</button>
                            <button className="flex items-center text-white hover:text-yellow-400">
                                <span className="material-icons mr-1">favorite_border</span> Yêu thích
                            </button>
                            <button className="flex items-center text-white hover:text-yellow-400">
                                <span className="material-icons mr-1">add</span> Thêm vào
                            </button>
                            <button className="flex items-center text-white hover:text-yellow-400">
                                <span className="material-icons mr-1">share</span> Chia sẻ
                            </button>
                            <button className="flex items-center text-white hover:text-yellow-400">
                                <span className="material-icons mr-1">chat_bubble_outline</span> Bình luận
                            </button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-semibold">9.0 Đánh giá</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-6xl mx-auto mt-24 px-6">
                <div className="flex space-x-8 border-b border-[#23263a] mb-4">
                    <button className="py-2 px-4 text-white border-b-2 border-yellow-500 font-semibold">Tập phim</button>
                    <button className="py-2 px-4 text-gray-400 hover:text-white">Gallery</button>
                    <button className="py-2 px-4 text-gray-400 hover:text-white">Diễn viên</button>
                    <button className="py-2 px-4 text-gray-400 hover:text-white">Đề xuất</button>
                </div>
                {/* Nội dung tab */}
                <div className="bg-[#23263a] rounded-lg p-6 mb-4">
                    <p className="text-white">Nội dung chi tiết phim sẽ được hiển thị ở đây.</p>
                </div>
                {/* Thông báo lịch phát sóng */}
                <div className="bg-gradient-to-r from-[#7b2ff2] to-[#f357a8] rounded-lg px-6 py-3 flex items-center text-white font-semibold text-lg shadow">
                    <span className="mr-2 bg-blue-800 px-2 py-1 rounded-full">Tập 3</span>
                    sẽ phát sóng <span className="font-bold mx-1">04:00 ngày 08-06-2025</span>. Các bạn nhớ đón xem nhé <span className="ml-2">😊</span>
                </div>
            </div>
        </div>
    );
}

export default DetailFilm;