import { useEffect, useState } from 'react'

interface ServerData {
    name: string;
    slug: string;
    link_m3u8: string;
}
import { MovieDetail } from '../../Types/movieTypes'
import { getMovieDetail } from '../../services/movieService'
import { useParams, useSearchParams } from 'react-router'
import ReactPlayer from "react-player";
import { Button,Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/loadingSlice';

const WatchMovie = () => {
    const dispatch = useDispatch();
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const [srcMovie, setSrcMovie] = useState<{ link_m3u8: string }>({ link_m3u8: "" })
    const { name } = useParams();
    const [searchParams] = useSearchParams();
    const serverIndex = searchParams.get("sv"); // "0"
    const episodePram = searchParams.get("ep"); // "full"

    console.log(srcMovie);

    const fetchMovie = async () => {
        try {
            dispatch(setLoading(true));
            if (name) {
                const response = await getMovieDetail(name);
                setMovie(response);
                console.log(response);

                const server = response.episodes[Number(serverIndex)];
                const src: ServerData | undefined = server?.server_data.find((ep: ServerData) => ep.slug.toLowerCase() === episodePram?.toLocaleLowerCase() && ep.link_m3u8);

                if (src) setSrcMovie(src);
            }

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu', error);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        fetchMovie();
    }, [serverIndex, episodePram])


    return (
        <>
            <div className='flex flex-col items-start justify-center h-20 bg-black'>
                <h1 className='text-white text-2xl'>{movie?.movie.name}</h1>
            </div>

            <div className='h-screen bg-black'>
                <ReactPlayer
                    url={srcMovie.link_m3u8}
                    playing
                    controls
                    className='w-full h-full'
                    width='100%'
                    height='100%'
                    config={{
                        file: {
                            forceHLS: true
                        }
                    }}
                    onEnded={() => {
                        console.log('Video Ended');
                    }}
                />
            </div>

            <div className="bg-gray-900 text-white min-h-screen p-8">
                {/* Movie Header */}
                <div className="grid grid-cols-8 gap-2">
                    <img
                        src={movie?.movie.poster_url}
                        alt="Movie Poster"
                        className="w-40 h-60 rounded-lg shadow-lg"
                    />
                    <div className="col-span-3">
                        <h1 className="text-2xl font-bold">{movie?.movie.name}</h1>
                        <Typography variant='h6' sx={{ color: 'primary.main' }}>{movie?.movie.origin_name}</Typography>
                        <div className="flex gap-2 mt-2">
                            <Typography variant="body2" sx={{ border: '2px solid #dc3545', bgcolor: 'grey.700', px: 2, py: 1, borderRadius: 1 }}>IMDB 8.4</Typography>
                            <span className="bg-gray-800 px-2 py-1 rounded">Tổng {movie?.movie.episode_total} tập</span>
                            <span className="bg-gray-800 px-2 py-1 rounded">{movie?.movie.year}</span>
                            <span className="bg-gray-800 px-2 py-1 rounded">{movie?.movie.episode_current}</span>
                        </div>
                        <Typography variant='h6' children="Thể loại" />
                        <div className="flex gap-2 mt-2">
                            {movie?.movie.category.map((cat, index) => (
                                <span key={index} className="bg-gray-800 px-2 py-1 rounded">{cat.name}</span>
                            ))}
                        </div>
                        <Typography variant='h6' children="Quốc gia" />
                        <div className="flex gap-2 mt-2">
                            {movie?.movie.country.map((country, index) => (
                                <span key={index} className="bg-gray-800 px-2 py-1 rounded">{country.name}</span>
                            ))}
                        </div>

                    </div>
                    <div className='col-span-4 pt-5'>
                        <p className="text-sm mt-4" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', lineHeight: '1.5' }}>
                            {movie?.movie.content}
                        </p>
                    </div>
                </div>

                {/* Episodes List */}
                <div className="mt-6 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Danh sách server & tập phim</h2>
                    {movie?.episodes.map((server, indexServer) => (
                        <div key={indexServer} className="p-4 rounded-lg">
                            <h4 className='my-3'>{server?.server_name}</h4>
                            <div className="grid grid-cols-6 gap-6">
                                {server?.server_data.map((episode, index) => (
                                    <Button
                                        key={index}
                                        sx={{
                                            ...(Number(serverIndex) === indexServer && String(episodePram) === episode.slug
                                                ? { color: 'white', bgcolor: 'primary.main', fontWeight: 'bold' }
                                                : { color: 'white', bgcolor: 'grey.700' }) 
                                        }}
                                        variant="contained"
                                    >
                                        <Link to={`/phim/xem-phim/${name}?sv=${indexServer}&ep=${episode.slug}`} className='px-4 py-2'>
                                            {episode.name}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Bình luận (14)</h2>
                    <p className="text-gray-400">Vui lòng <a href="#" className="text-yellow-400">đăng nhập</a> để tham gia bình luận.</p>
                    <textarea
                        className="w-full mt-2 p-2 bg-gray-800 rounded border border-gray-600"
                        placeholder="Viết bình luận"
                    ></textarea>
                </div>
            </div>
        </>

    )
}

export default WatchMovie