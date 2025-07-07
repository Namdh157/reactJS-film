import { useEffect, useState } from "react";
import { MovieItemSearch } from "../../Types/movieTypes";
import { useNavigate } from "react-router-dom";

export interface SearchHeaderProps {
    results: MovieItemSearch[];
    loading: boolean;
    handleDialog: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ results, loading, handleDialog }) => {
    console.log(results);
    const navigate = useNavigate();
    const handleMovieClick = (slug: string) => {
        // Navigate to the movie detail page
        navigate(`/phim/${slug}`);
        handleDialog();
    }

    return (
        <div className="relative mx-auto">
            {loading ? <p className="text-sm text-gray-400 mt-1">Đang tìm...</p>

                : results.length > 0 ? (
                    <div className="bg-gray-800 mt-2 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                    >
                        <h3 className="text-white px-4 py-2 border-b border-gray-700">Danh sách phim</h3>
                        <ul className="divide-y divide-gray-700">
                            {results.map((movie) => (
                                <li
                                    key={movie._id}
                                    className="flex items-start px-4 py-3 hover:bg-gray-800"
                                    onClick={() => handleMovieClick(movie.slug)}
                                >
                                    <img
                                        src={`https://phimimg.com/${movie.thumb_url}`}
                                        alt={movie.name}
                                        className="w-12 h-16 object-cover rounded mr-4"
                                    />
                                    <div className="text-white text-sm">
                                        <p className="font-semibold">{movie.name}</p>
                                        <p className="text-gray-400 italic">{movie.origin_name}</p>
                                        <p className="text-gray-400">
                                            {movie.season && `T${movie.season} `}
                                            {movie.episode && `• Tập ${movie.episode} `}
                                            • {movie.year} • {movie.time} phút
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    !loading && <p className="text-sm text-gray-400 mt-2">Không tìm thấy kết quả nào</p>
                )
            }
        </div >
    );
}
export default SearchHeader;

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}