import { useCallback, useEffect, useRef, useState } from "react";
import { MovieItemGenre } from "../../Types/movieTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GenresParams } from "../../Types/genreTypes";
import { getMovieForGenre } from "../../services/movieService";
import { toast } from "react-toastify";
import InfinityScroll from "../../components/Common/InfinityScroll";
import MovieCarousel from "./MovieCarousel";
import CarouselSkeleton from "../../components/Skeleton/CarouselSkeleton";
import { setShowFooter } from "../../store/showFooterSlice";
interface MovieContainer {
  genre: string;
  movies: MovieItemGenre[];
}

const ContainerCarousel = () => {
  const [containerMovies, setContainerMovies] = useState<MovieContainer[]>([]);
  const indexGenresRef = useRef(0);
  const [page, setPage] = useState(1);
  const genres = useSelector((state: RootState) => state.genres.genres).slice(0, 5);
  const dispatch = useDispatch();


  const handleScroll = useCallback(async () => {
    
    if (indexGenresRef.current > genres.length - 2) {
      console.log("end");
      dispatch(setShowFooter(true));
      return;
    };
    const params: GenresParams = {
      type_list: genres[indexGenresRef.current].slug,
      limit: 16,
    }

    try {
      const response = await getMovieForGenre(params);
      if (response.data.items.length === 0) {
        indexGenresRef.current += 1;
        handleScroll();
        return;
      }
      setContainerMovies((prev) => [...prev, {
        genre: genres[indexGenresRef.current - 1].name,
        movies: response.data.items
      }]);
      indexGenresRef.current += 1;
    } catch {
      toast.error("Lấy danh sách phim thất bại");
    }
  }, [dispatch, genres]);

  useEffect(() => {
    handleScroll();
  }, [page]);

  return (
    <InfinityScroll
      hasMore={indexGenresRef.current < genres.length}
      loader={<CarouselSkeleton />}
      className="container-carousel"
      fetchMore={() => setPage(prev => prev + 1)}
      endMessage={
        <>
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        </>
      }
    >

      {containerMovies.map((carousel, index) => (
        <MovieCarousel key={index} indexCarousel={index} title={carousel.genre} movies={carousel.movies} />
      ))}

    </InfinityScroll>
  )
}

export default ContainerCarousel